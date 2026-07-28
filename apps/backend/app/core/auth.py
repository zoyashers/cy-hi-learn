from fastapi import Depends, HTTPException, Response, Request
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from datetime import timedelta, datetime
from app.core.db import get_db
from app.core.config import SECRET_KEY, SESSION_COOKIE_NAME
from app.models.user_models import User
import itsdangerous

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

serializer = itsdangerous.URLSafeTimedSerializer(SECRET_KEY)


# -----------------------------
# Password helpers
# -----------------------------

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def hash_password(password):
    return pwd_context.hash(password)


# -----------------------------
# Session cookie helpers
# -----------------------------

def create_session_cookie(response: Response, user_id: int):
    token = serializer.dumps({"user_id": user_id})
    response.set_cookie(
        key=SESSION_COOKIE_NAME,
        value=token,
        httponly=True,
        secure=False,  # set True in production (HTTPS)
        samesite="lax",
        max_age=60 * 60 * 24 * 7,  # 7 days
        path="/"
    )


def destroy_session_cookie(response: Response):
    response.delete_cookie(SESSION_COOKIE_NAME)


# -----------------------------
# Current user dependency
# -----------------------------

def get_current_user(request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get(SESSION_COOKIE_NAME)
    if not token:
        raise HTTPException(401, "Not authenticated")

    try:
        data = serializer.loads(token, max_age=60 * 60 * 24 * 7)
        user_id = data.get("user_id")
    except Exception:
        raise HTTPException(401, "Invalid or expired session")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(401, "User not found")

    return user
