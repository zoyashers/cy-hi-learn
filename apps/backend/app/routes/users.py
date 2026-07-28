from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.db import get_session
from app.core.auth import requires_role
from app.schemas.user_schemas import UserRead, UserCreate
from app.auth.services import create_user, get_all_users

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/", response_model=list[UserRead])
async def list_users(
    session: AsyncSession = Depends(get_session),
    current_user = Depends(requires_role("admin"))
):
    users = await get_all_users(session)
    return users


@router.post("/", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def create_new_user(
    user_data: UserCreate,
    session: AsyncSession = Depends(get_session),
    current_user = Depends(requires_role("admin"))
):
    user = await create_user(session, user_data.email, user_data.password)
    return user


@router.get("/me", response_model=UserRead)
async def get_me(
    current_user = Depends(requires_role("student"))
):
    return current_user
