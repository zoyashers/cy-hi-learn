from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel.ext.asyncio.session import AsyncSession

from app.database import get_session

from app.crud.user_crud import (
    get_user_by_email,
    get_user_by_username,
    create_user,
)

from app.schemas.auth import (
    RegisterRequest,
    LoginResponse,
)

from app.auth.hashing import Hasher
from app.auth.jwt_handler import create_access_token
from app.api.auth_deps import get_current_user


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


# =====================================
# REGISTER
# =====================================

@router.post("/register")
async def register(
    user: RegisterRequest,
    session: AsyncSession = Depends(get_session),
):
    existing = await get_user_by_email(
        session,
        user.email,
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already registered",
        )

    new_user = await create_user(
        session,
        user,
    )

    return {
        "id": new_user.id,
        "username": new_user.username,
        "email": new_user.email,
        "first_name": new_user.first_name,
        "last_name": new_user.last_name,
        "role": new_user.role,
        "is_active": new_user.is_active,
        "xp": new_user.xp,
        "level_id": new_user.level_id,
        "created_at": new_user.created_at,
    }


# =====================================
# LOGIN
# =====================================

@router.post(
    "/login",
    response_model=LoginResponse,
)
async def login(
    user: OAuth2PasswordRequestForm = Depends(),
    session: AsyncSession = Depends(get_session),
):
    db_user = await get_user_by_username(
        session,
        user.username,
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials",
        )

    valid_password = Hasher.verify_password(
        user.password,
        db_user.hashed_password,
    )

    if not valid_password:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials",
        )

    if not db_user.is_active:
        raise HTTPException(
            status_code=403,
            detail="Account is inactive",
        )

    # Upgrade old password hashes if necessary.
    if Hasher.needs_rehash(
        db_user.hashed_password
    ):
        db_user.hashed_password = (
            Hasher.get_password_hash(
                user.password,
            )
        )

        session.add(db_user)

        await session.commit()
        await session.refresh(db_user)

    token = create_access_token(
        {
            "sub": str(db_user.id),
            "role": db_user.role,
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
    }


# =====================================
# CURRENT USER
# =====================================

@router.get("/me")
async def get_me(
    current_user=Depends(get_current_user),
):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
        "first_name": current_user.first_name,
        "last_name": current_user.last_name,
        "role": current_user.role,
        "is_active": current_user.is_active,
    }