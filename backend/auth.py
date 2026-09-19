"""
Authentication and Onboarding Security Router
=============================================
Provides production-ready JWT authentication, bcrypt password hashing, 
operational mock-seeding, and dual-track onboarding for AI Odyssey.
"""

import os
import time
from datetime import datetime, timezone, timedelta
from typing import Dict, Any, Optional, Literal

from fastapi import APIRouter, HTTPException, Depends, status, Header
from pydantic import BaseModel, Field, EmailStr
import bcrypt
import jwt

# Attempt structured logger import
try:
    from logger import logger
except ImportError:
    from backend.logger import logger

auth_router = APIRouter(prefix="/api/v1/auth", tags=["Authentication & Onboarding"])

# Security Configurations
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "SILICONBRAIN_ODYSSEY_JWT_SECURE_KEY_2026_PROD")
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 Hours

# Strict Corporate Whitelist Policy: Only @siliconbrain.ai domain authorized
ALLOWED_CORPORATE_DOMAINS = ("siliconbrain.ai",)
AUTHORIZED_OPERATOR_IDS = {"analyst@siliconbrain.ai"}


def is_authorized_corporate_email(email: str) -> bool:
    """
    Validates if the provided email belongs to an authorized corporate domain
    (e.g., @siliconbrain.ai) or matches explicitly authorized Operator IDs.
    """
    if not email or "@" not in email:
        return False
    clean = email.strip().lower()
    domain = clean.split("@")[-1]
    return domain in ALLOWED_CORPORATE_DOMAINS or clean in AUTHORIZED_OPERATOR_IDS

# --------------------------------------------------------------------------
# Password Hashing Utilities using Salted bcrypt
# --------------------------------------------------------------------------
def hash_password(password: str) -> str:
    """Generates a secure salted bcrypt hash of the plain-text password."""
    salt = bcrypt.gensalt(rounds=12)
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Safely verifies plain password against stored bcrypt hash."""
    try:
        return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))
    except Exception:
        return False


def create_access_token(data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    """Encodes JWT access token with claim payloads and expiration."""
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire, "iat": datetime.now(timezone.utc)})
    return jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)


def decode_access_token(token: str) -> Dict[str, Any]:
    """Validates and decodes JWT access token."""
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session token has expired. Please sign in again."
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token signature."
        )


# --------------------------------------------------------------------------
# Operational Mock Database Seeding
# Pre-configures the operational default analyst account
# --------------------------------------------------------------------------
USERS_DB: Dict[str, Dict[str, Any]] = {
    "analyst@siliconbrain.ai": {
        "email": "analyst@siliconbrain.ai",
        "full_name": "SiliconBrain Lead Analyst",
        "hashed_password": hash_password("SiliconBrain@2026"),
        "role": "Senior ML Analyst",
        "learning_track": "engineer",
        "created_at": "2026-09-19T00:00:00Z"
    }
}


# --------------------------------------------------------------------------
# Pydantic Schemas
# --------------------------------------------------------------------------
class UserProfile(BaseModel):
    email: str
    full_name: str
    role: str
    learning_track: Literal["student", "engineer"]
    created_at: str


class UserRegisterRequest(BaseModel):
    email: str = Field(..., description="Valid corporate or academic email address")
    full_name: str = Field(..., min_length=2, max_length=60, description="User full display name")
    password: str = Field(..., min_length=8, description="Password (minimum 8 characters)")
    learning_track: Literal["student", "engineer"] = Field(
        "student",
        description="Initial persona track for onboarding"
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "email": "student@university.edu",
                "full_name": "Ananya Sharma",
                "password": "StudyPortal@2026",
                "learning_track": "student"
            }
        }
    }


class UserLoginRequest(BaseModel):
    email: str = Field(..., description="Registered email address")
    password: str = Field(..., description="User password")
    learning_track: Optional[Literal["student", "engineer"]] = Field(
        None,
        description="Optional runtime track preference override"
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "email": "analyst@siliconbrain.ai",
                "password": "SiliconBrain@2026",
                "learning_track": "engineer"
            }
        }
    }


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "Bearer"
    user: UserProfile


# --------------------------------------------------------------------------
# Dependency: Bearer Token Extraction & User Lookup
# --------------------------------------------------------------------------
async def get_current_user(authorization: Optional[str] = Header(None)) -> UserProfile:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or malformed Authorization header."
        )

    token = authorization.split(" ")[1]
    claims = decode_access_token(token)
    email = claims.get("sub")

    if not email or not is_authorized_corporate_email(email):
        logger.warning(
            f"Unauthorized corporate token access rejected for: {email}",
            extra={"event": "auth_token_domain_rejected", "email": email}
        )
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access Restricted: Token does not carry verified corporate operator credentials (@siliconbrain.ai)."
        )

    if email not in USERS_DB:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authenticated user record does not exist."
        )

    user_data = USERS_DB[email]
    return UserProfile(
        email=user_data["email"],
        full_name=user_data["full_name"],
        role=user_data["role"],
        learning_track=claims.get("track", user_data["learning_track"]),
        created_at=user_data["created_at"]
    )


# --------------------------------------------------------------------------
# Endpoints
# --------------------------------------------------------------------------
@auth_router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register_user(payload: UserRegisterRequest) -> TokenResponse:
    """
    Onboards a corporate student or engineer with verified @siliconbrain.ai domain.
    Rejects public/unauthorized domains with 403 Forbidden.
    """
    clean_email = payload.email.strip().lower()

    # Strict Corporate Domain Policy Check
    if not is_authorized_corporate_email(clean_email):
        logger.warning(
            f"Public registration attempt blocked: {clean_email}",
            extra={"event": "auth_register_domain_blocked", "email": clean_email}
        )
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access Restricted: Public registration disabled. Only verified corporate operators (@siliconbrain.ai) are authorized."
        )

    if clean_email in USERS_DB:
        logger.warning(
            f"Registration rejected: Account {clean_email} already exists.",
            extra={"event": "auth_register_duplicate", "email": clean_email}
        )
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email address already exists."
        )

    # Hash password with bcrypt
    hashed_pwd = hash_password(payload.password)
    now_iso = datetime.now(timezone.utc).isoformat()

    role = "Student Explorer" if payload.learning_track == "student" else "ML Systems Engineer"

    # Persist in mock database
    USERS_DB[clean_email] = {
        "email": clean_email,
        "full_name": payload.full_name.strip(),
        "hashed_password": hashed_pwd,
        "role": role,
        "learning_track": payload.learning_track,
        "created_at": now_iso
    }

    # Generate JWT claims
    claims = {
        "sub": clean_email,
        "name": payload.full_name.strip(),
        "role": role,
        "track": payload.learning_track
    }
    token = create_access_token(claims)

    logger.info(
        f"Corporate operator registered: {clean_email} [Track: {payload.learning_track}]",
        extra={"event": "auth_register_success", "email": clean_email, "track": payload.learning_track}
    )

    profile = UserProfile(
        email=clean_email,
        full_name=payload.full_name.strip(),
        role=role,
        learning_track=payload.learning_track,
        created_at=now_iso
    )

    return TokenResponse(access_token=token, token_type="Bearer", user=profile)


@auth_router.post("/login", response_model=TokenResponse, status_code=status.HTTP_200_OK)
async def login_user(payload: UserLoginRequest) -> TokenResponse:
    """
    Authenticates user against stored bcrypt hashes.
    Restricts access strictly to authorized corporate operator IDs (@siliconbrain.ai).
    """
    clean_email = payload.email.strip().lower()

    # Strict Corporate Whitelist Enforcement
    if not is_authorized_corporate_email(clean_email):
        logger.warning(
            f"Access attempt rejected for non-corporate domain: {clean_email}",
            extra={"event": "auth_login_domain_blocked", "email": clean_email}
        )
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access Restricted to Authorized Corporate Operators (@siliconbrain.ai)."
        )

    user = USERS_DB.get(clean_email)

    if not user or not verify_password(payload.password, user["hashed_password"]):
        logger.warning(
            f"Failed authentication attempt for {clean_email}",
            extra={"event": "auth_login_failed", "email": clean_email}
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email credentials or password."
        )

    # Allow user to update/select track preference upon login
    selected_track = payload.learning_track or user["learning_track"]

    claims = {
        "sub": clean_email,
        "name": user["full_name"],
        "role": user["role"],
        "track": selected_track
    }
    token = create_access_token(claims)

    logger.info(
        f"Successful authentication: {clean_email} [Track: {selected_track}]",
        extra={"event": "auth_login_success", "email": clean_email, "track": selected_track}
    )

    profile = UserProfile(
        email=user["email"],
        full_name=user["full_name"],
        role=user["role"],
        learning_track=selected_track,
        created_at=user["created_at"]
    )

    return TokenResponse(access_token=token, token_type="Bearer", user=profile)


@auth_router.get("/me", response_model=UserProfile, status_code=status.HTTP_200_OK)
async def get_authenticated_profile(current_user: UserProfile = Depends(get_current_user)) -> UserProfile:
    """Returns active session profile validated from Bearer token."""
    return current_user
