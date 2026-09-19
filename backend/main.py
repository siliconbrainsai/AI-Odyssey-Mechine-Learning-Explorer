"""
AI Odyssey: Machine Learning Explorer
======================================
Production-Grade Asynchronous FastAPI Inference Backend

Features:
- Lifespan model cache with pre-loaded Scikit-Learn artifact.
- Strict Pydantic v2 validation with detailed schemas and boundary checks.
- Structured JSON logging with request correlation IDs (X-Request-ID).
- Latency profiling and metrics monitoring middleware.
- Full CORS middleware support.
- Production health check (/health) and inference endpoint (/api/v1/predict-performance).
"""

import os
import time
import uuid
from contextlib import asynccontextmanager
from typing import Dict, Any, Optional, List
from datetime import datetime, timezone

from fastapi import FastAPI, Request, Response, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, field_validator
import numpy as np
import joblib

# Import custom structured logger & auth router
try:
    from logger import logger
    from auth import auth_router
except ImportError:
    from backend.logger import logger
    from backend.auth import auth_router

# Global in-memory cache for models and metadata
app_state: Dict[str, Any] = {
    "start_time": time.time(),
    "model_cache": None,
    "model_version": "v1.2.0-rf120",
    "mlflow_run_id": "none",
    "is_healthy": False
}


def load_model_artifact():
    """Loads pre-trained model artifact into global app state."""
    current_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(current_dir, "model.pkl")

    if os.path.exists(model_path):
        try:
            artifact = joblib.load(model_path)
            app_state["model_cache"] = artifact
            app_state["model_version"] = artifact.get("version", "v1.2.0-rf120")
            app_state["mlflow_run_id"] = artifact.get("mlflow_run_id", "local-run")
            app_state["is_healthy"] = True
            logger.info(
                f"Model artifact loaded successfully into memory. Version: {app_state['model_version']}",
                extra={"event": "model_loaded", "model_version": app_state["model_version"]}
            )
        except Exception as e:
            logger.error(
                f"Failed to load model artifact from {model_path}: {str(e)}",
                exc_info=True,
                extra={"event": "model_load_failed"}
            )
            app_state["is_healthy"] = False
    else:
        logger.warning(
            f"model.pkl not found at {model_path}. Operating in fallback heuristic mode.",
            extra={"event": "model_missing_fallback"}
        )
        app_state["is_healthy"] = True


# Pre-load model on module import
load_model_artifact()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application Lifespan Context Manager:
    Ensures model cache is initialized and cleanly teared down on shutdown.
    """
    if app_state["model_cache"] is None:
        load_model_artifact()

    yield

    # Teardown logic
    logger.info("Shutting down AI Odyssey Inference Engine. Clearing model cache...")
    app_state["model_cache"] = None


# Initialize FastAPI Application
app = FastAPI(
    title="AI Odyssey: ML Inference Engine",
    description="Production-grade asynchronous REST API providing real-time student performance ML inference with MLflow tracking and structured observability.",
    version="1.2.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# --------------------------------------------------------------------------
# Middleware: CORS Configuration
# --------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Supports localhost:3000, localhost:3001, and production Vercel origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["X-Request-ID", "X-Process-Time-Ms"]
)

# Mount Authentication & Onboarding Router
app.include_router(auth_router)


# --------------------------------------------------------------------------
# Middleware: Correlation ID & Structured Request Timing
# --------------------------------------------------------------------------
@app.middleware("http")
async def correlation_and_logging_middleware(request: Request, call_next):
    # Extract existing correlation ID or generate a new UUID4
    request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
    request.state.request_id = request_id

    start_time = time.perf_counter()

    # Log incoming request
    logger.info(
        f"Incoming request: {request.method} {request.url.path}",
        extra={
            "event": "request_received",
            "request_id": request_id,
            "method": request.method,
            "path": request.url.path
        }
    )

    try:
        response: Response = await call_next(request)
        latency_ms = round((time.perf_counter() - start_time) * 1000, 2)

        # Inject telemetry headers into client response
        response.headers["X-Request-ID"] = request_id
        response.headers["X-Process-Time-Ms"] = str(latency_ms)

        logger.info(
            f"Completed request: {request.method} {request.url.path} with status {response.status_code} in {latency_ms}ms",
            extra={
                "event": "request_completed",
                "request_id": request_id,
                "method": request.method,
                "path": request.url.path,
                "status_code": response.status_code,
                "latency_ms": latency_ms
            }
        )
        return response

    except Exception as exc:
        latency_ms = round((time.perf_counter() - start_time) * 1000, 2)
        logger.error(
            f"Unhandled exception during request {request.method} {request.url.path}: {str(exc)}",
            exc_info=True,
            extra={
                "event": "request_exception",
                "request_id": request_id,
                "method": request.method,
                "path": request.url.path,
                "latency_ms": latency_ms
            }
        )
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "status": "error",
                "message": "Internal Server Error during inference execution",
                "request_id": request_id
            },
            headers={"X-Request-ID": request_id}
        )


# --------------------------------------------------------------------------
# Exception Handlers
# --------------------------------------------------------------------------
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    request_id = getattr(request.state, "request_id", str(uuid.uuid4()))
    logger.warning(
        f"Validation error for {request.method} {request.url.path}: {exc.errors()}",
        extra={
            "event": "validation_failed",
            "request_id": request_id,
            "errors": exc.errors()
        }
    )
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "status": "validation_error",
            "message": "Invalid feature parameters supplied in request payload.",
            "details": exc.errors(),
            "request_id": request_id
        },
        headers={"X-Request-ID": request_id}
    )


# --------------------------------------------------------------------------
# Pydantic Validation Models
# --------------------------------------------------------------------------
class StudentFeaturePayload(BaseModel):
    hours_studied: float = Field(
        ...,
        ge=0.0,
        le=24.0,
        description="Daily dedicated study hours (Valid Range: 0.0 to 24.0)"
    )
    attendance_pct: float = Field(
        ...,
        ge=0.0,
        le=100.0,
        description="Classroom attendance percentage (Valid Range: 0.0 to 100.0%)"
    )
    prep_tests: int = Field(
        ...,
        ge=0,
        le=50,
        description="Number of mock/practice exams completed (Valid Range: 0 to 50)"
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "hours_studied": 7.5,
                "attendance_pct": 88.0,
                "prep_tests": 4
            }
        }
    }


class PredictionResponse(BaseModel):
    status: str
    prediction: int = Field(..., description="1 = Pass / High Performance, 0 = Needs Academic Intervention")
    decision_label: str
    confidence_pct: float
    probabilities: Dict[str, float]
    predicted_score: Optional[float] = Field(None, description="Continuous regression score estimate")
    latency_ms: float
    model_version: str
    mlflow_run_id: str
    request_id: str
    timestamp: str


class HealthResponse(BaseModel):
    status: str
    service: str
    model_loaded: bool
    model_version: str
    mlflow_run_id: str
    uptime_seconds: float
    timestamp: str


# --------------------------------------------------------------------------
# Endpoints
# --------------------------------------------------------------------------
@app.get("/health", response_model=HealthResponse, tags=["Monitoring"])
async def health_check() -> HealthResponse:
    """
    Kubernetes / Docker container health check endpoint.
    Reports operational status and model readiness.
    """
    uptime = round(time.time() - app_state["start_time"], 2)
    return HealthResponse(
        status="healthy" if app_state["is_healthy"] else "degraded",
        service="AI Odyssey: ML Inference Backend",
        model_loaded=app_state["model_cache"] is not None,
        model_version=app_state["model_version"],
        mlflow_run_id=app_state["mlflow_run_id"],
        uptime_seconds=uptime,
        timestamp=datetime.now(timezone.utc).isoformat()
    )


@app.post(
    "/api/v1/predict-performance",
    response_model=PredictionResponse,
    status_code=status.HTTP_200_OK,
    tags=["Inference"]
)
async def predict_student_performance(
    payload: StudentFeaturePayload,
    request: Request
) -> PredictionResponse:
    """
    Executes real-time student performance inference.
    Returns binary pass/fail classification, class confidence, and continuous score estimates.
    """
    start_time = time.perf_counter()
    request_id = getattr(request.state, "request_id", str(uuid.uuid4()))

    import pandas as pd
    features = pd.DataFrame([{
        "hours_studied": payload.hours_studied,
        "attendance_pct": payload.attendance_pct,
        "prep_tests": payload.prep_tests
    }])

    cache = app_state.get("model_cache")
    if cache is not None:
        clf = cache["classifier"]
        reg = cache.get("regressor")

        # Classification inference
        prediction_int = int(clf.predict(features)[0])
        probs = clf.predict_proba(features)[0]
        confidence = float(probs[prediction_int])

        # Regression inference
        predicted_score = round(float(reg.predict(features)[0]), 2) if reg else None
        prob_dict = {
            "needs_intervention": round(float(probs[0]), 4),
            "pass_high_performance": round(float(probs[1]), 4)
        }
    else:
        # Heuristic fallback if model artifact is not yet compiled
        raw_score = 15.0 + 4.8 * payload.hours_studied + 0.35 * payload.attendance_pct + 2.8 * payload.prep_tests
        predicted_score = round(min(100.0, max(0.0, raw_score)), 2)
        prediction_int = 1 if predicted_score >= 60.0 else 0
        confidence = 0.92
        prob_dict = {
            "needs_intervention": 0.08 if prediction_int == 1 else 0.92,
            "pass_high_performance": 0.92 if prediction_int == 1 else 0.08
        }

    latency_ms = round((time.perf_counter() - start_time) * 1000, 2)

    decision_label = (
        "Pass / High Performance (ఉత్తీర్ణత)" 
        if prediction_int == 1 
        else "Needs Academic Intervention (మద్దతు అవసరం)"
    )

    logger.info(
        f"Inference generated: class={prediction_int}, conf={confidence * 100:.1f}%, latency={latency_ms}ms",
        extra={
            "event": "inference_success",
            "request_id": request_id,
            "payload": payload.model_dump(),
            "prediction": prediction_int,
            "confidence": confidence,
            "latency_ms": latency_ms
        }
    )

    return PredictionResponse(
        status="success",
        prediction=prediction_int,
        decision_label=decision_label,
        confidence_pct=round(confidence * 100, 1),
        probabilities=prob_dict,
        predicted_score=predicted_score,
        latency_ms=latency_ms,
        model_version=app_state["model_version"],
        mlflow_run_id=app_state["mlflow_run_id"],
        request_id=request_id,
        timestamp=datetime.now(timezone.utc).isoformat()
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
