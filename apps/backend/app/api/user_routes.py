from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.role_deps import instructor_only
from app.database import get_session
from app.models.user_models import User
from app.schemas import (
    UserCreate,
    UserLogin,
    UserOut,
)

from app.core.security import (
    hash_password,
    verify_password,
)


router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


# =====================================
# REGISTER
# =====================================

@router.post(
    "/register",
    response_model=UserOut,
)
async def register_user(
    user_data: UserCreate,
    session: AsyncSession = Depends(get_session),
):

    result = await session.exec(
        select(User).where(
            User.email == user_data.email
        )
    )

    existing_user = result.first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered",
        )

    user = User(
        username=user_data.username,
        email=user_data.email,
        hashed_password=hash_password(
            user_data.password
        ),
        role=user_data.role,
    )

    session.add(user)

    await session.commit()
    await session.refresh(user)

    return user


# =====================================
# LOGIN
# =====================================

@router.post(
    "/login",
    response_model=UserOut,
)
async def login_user(
    login_data: UserLogin,
    session: AsyncSession = Depends(get_session),
):

    result = await session.exec(
        select(User).where(
            User.email == login_data.email
        )
    )

    user = result.first()

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials",
        )

    if not verify_password(
        login_data.password,
        user.hashed_password,
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials",
        )

    return user


# =====================================
# GET USER
# =====================================


@router.get(
    "/{user_id}",
    response_model=UserOut,
)
async def get_user(
    user_id: int,
    session: AsyncSession = Depends(get_session),
    user=Depends(instructor_only),
):

    user = await session.get(
        User,
        user_id,
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return user