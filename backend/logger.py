"""
Production-Grade Structured Logging Module
Provides JSON-formatted, machine-readable logs with correlation IDs, 
request latencies, and contextual metadata for high-observability ML services.
"""

import sys
import json
import logging
import time
from datetime import datetime, timezone
from typing import Any, Dict, Optional


class JSONFormatter(logging.Formatter):
    """
    Custom logging formatter that outputs log records as single-line JSON objects.
    Ensures compatibility with log aggregators (Datadog, AWS CloudWatch, ElasticSearch/Grafana).
    """

    def format(self, record: logging.LogRecord) -> str:
        log_record: Dict[str, Any] = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
            "file": record.filename,
            "line": record.lineno,
        }

        # Extract extra contextual fields passed via `extra={...}`
        if hasattr(record, "request_id"):
            log_record["request_id"] = getattr(record, "request_id")
        if hasattr(record, "latency_ms"):
            log_record["latency_ms"] = getattr(record, "latency_ms")
        if hasattr(record, "path"):
            log_record["path"] = getattr(record, "path")
        if hasattr(record, "method"):
            log_record["method"] = getattr(record, "method")
        if hasattr(record, "status_code"):
            log_record["status_code"] = getattr(record, "status_code")
        if hasattr(record, "payload"):
            log_record["payload"] = getattr(record, "payload")
        if hasattr(record, "prediction"):
            log_record["prediction"] = getattr(record, "prediction")
        if hasattr(record, "event"):
            log_record["event"] = getattr(record, "event")

        # Format exception info if present
        if record.exc_info:
            log_record["exception"] = self.formatException(record.exc_info)

        return json.dumps(log_record)


def get_logger(name: str = "ai_odyssey_api", level: int = logging.INFO) -> logging.Logger:
    """
    Configures and returns a thread-safe structured logger with JSON output to stdout.
    """
    logger = logging.getLogger(name)
    logger.setLevel(level)

    # Avoid duplicate handlers on reload
    if not logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        handler.setLevel(level)
        handler.setFormatter(JSONFormatter())
        logger.addHandler(handler)
        logger.propagate = False

    return logger


# Pre-instantiated shared logger
logger = get_logger("ai_odyssey_inference")
