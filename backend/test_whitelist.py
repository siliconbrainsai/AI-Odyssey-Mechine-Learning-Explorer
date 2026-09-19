"""
Unit Test: Corporate Domain Whitelist & 403 Forbidden Access Control
"""
import sys
import os
import asyncio
from fastapi import HTTPException

# Ensure backend package path is resolved
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.auth import (
    is_authorized_corporate_email,
    login_user,
    register_user,
    UserLoginRequest,
    UserRegisterRequest
)

async def test_whitelist():
    print("Testing Corporate Domain Whitelist Enforcement...")
    
    # 1. Helper function checks
    assert is_authorized_corporate_email("analyst@siliconbrain.ai") is True
    assert is_authorized_corporate_email("operator@siliconbrain.ai") is True
    assert is_authorized_corporate_email("student@siliconbrain.ai") is True
    assert is_authorized_corporate_email("user@gmail.com") is False
    assert is_authorized_corporate_email("hacker@malicious.org") is False
    assert is_authorized_corporate_email("test@outlook.com") is False
    print("[PASS] is_authorized_corporate_email() correctly filters domains.")

    # 2. Login check: Seeded analyst passes
    analyst_res = await login_user(UserLoginRequest(
        email="analyst@siliconbrain.ai",
        password="SiliconBrain@2026",
        learning_track="engineer"
    ))
    assert analyst_res.access_token is not None
    assert analyst_res.user.email == "analyst@siliconbrain.ai"
    print("[PASS] Seeded analyst@siliconbrain.ai login succeeds with 200 OK.")

    # 3. Login check: Unauthorized domain rejected with 403 Forbidden
    try:
        await login_user(UserLoginRequest(
            email="intruder@gmail.com",
            password="AnyPassword123"
        ))
        print("[FAIL] intruder@gmail.com was not rejected!")
        sys.exit(1)
    except HTTPException as e:
        assert e.status_code == 403
        assert "Access Restricted" in e.detail
        print(f"[PASS] Non-corporate domain rejected with 403: {e.detail}")

    # 4. Register check: Public domain registration rejected with 403 Forbidden
    try:
        await register_user(UserRegisterRequest(
            email="public.user@yahoo.com",
            full_name="Public Visitor",
            password="StrongPassword123!",
            learning_track="student"
        ))
        print("[FAIL] public.user@yahoo.com registration was not blocked!")
        sys.exit(1)
    except HTTPException as e:
        assert e.status_code == 403
        assert "Public registration disabled" in e.detail or "Access Restricted" in e.detail
        print(f"[PASS] Public domain registration rejected with 403: {e.detail}")

    # 5. Register check: Corporate @siliconbrain.ai registration allowed
    corp_res = await register_user(UserRegisterRequest(
        email="intern.ml@siliconbrain.ai",
        full_name="Corporate ML Intern",
        password="SecureInternPass@2026",
        learning_track="student"
    ))
    assert corp_res.access_token is not None
    assert corp_res.user.email == "intern.ml@siliconbrain.ai"
    print("[PASS] Corporate operator registration with @siliconbrain.ai succeeds with 201 Created.")

    print("\nALL CORPORATE WHITELIST & ACCESS CONTROL SECURITY TESTS PASSED!")

if __name__ == "__main__":
    asyncio.run(test_whitelist())
