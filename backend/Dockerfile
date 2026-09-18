# ==============================================================================
# Stage 1: Builder - Dependency compilation & wheel installation
# ==============================================================================
FROM python:3.11-slim AS builder

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /install

# Install system build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# Install dependencies into a dedicated target path
RUN pip install --prefix=/install/deps -r requirements.txt


# ==============================================================================
# Stage 2: Production Runtime - Secure, non-root, lightweight image
# ==============================================================================
FROM python:3.11-slim AS runner

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PORT=8000 \
    PYTHONPATH="/app"

WORKDIR /app

# Install curl for container HEALTHCHECK
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy pre-compiled dependencies from builder stage
COPY --from=builder /install/deps /usr/local

# Create non-root dedicated application user
RUN useradd -m -u 1001 -s /bin/bash appuser && \
    mkdir -p /app/artifacts && \
    chown -R appuser:appuser /app

# Copy application source code & trained models
COPY --chown=appuser:appuser logger.py main.py train_model.py requirements.txt ./
# Copy model artifact if pre-compiled
COPY --chown=appuser:appuser model.pk[l] ./

USER appuser

EXPOSE 8000

# Container liveness health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Launch ASGI server with 2 production workers
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2", "--access-log"]
