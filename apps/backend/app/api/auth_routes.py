from fastapi import APIRouter, Depends, HTTPException
from sqlmodel.ext.asyncio.session import AsyncSession

from app.database import get_session

from app.crud.user_crud import (
    get_user_by_email,
    create_user
)

from app.schemas.auth import (
    RegisterRequest,
    LoginRequest,
    LoginResponse
)

from app.auth.hashing import Hasher

from app.auth.jwt_handler import create_access_token



router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)



@router.post("/register")
async def register(
    user: RegisterRequest,
    session: AsyncSession = Depends(get_session)
):

    existing = await get_user_by_email(
        session,
        user.email
    )


    if existing:

        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )


    new_user = await create_user(
        session,
        user
    )


    return new_user





@router.post(
    "/login",
    response_model=LoginResponse
)
async def login(
    user: LoginRequest,
    session: AsyncSession = Depends(get_session)
):

    db_user = await get_user_by_email(
        session,
        user.email
    )


    if not db_user:

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )


    valid_password = Hasher.verify_password(
        user.password,
        db_user.hashed_password
    )


    if not valid_password:

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )


    token = create_access_token(
        {
            "sub": str(db_user.id),
            "role": db_user.role
        }
    )


    return {
        "access_token": token,
        "token_type": "bearer"
    }