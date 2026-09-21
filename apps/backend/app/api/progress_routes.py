from fastapi import APIRouter, Depends, HTTPException
from sqlmodel.ext.asyncio.session import AsyncSession

from app.database import get_session
from app.crud.progress_crud import (
    get_user_xp,
    add_xp,
    get_user_level,
)
from app.api.auth_deps import get_current_user
from app.api.role_deps import instructor_only


router = APIRouter(
    prefix="/progress",
    tags=["Progress"],
)


@router.get("/xp/me")
async def get_my_xp(
    session: AsyncSession = Depends(get_session),
    current_user=Depends(get_current_user),
):
    user = await get_user_xp(
        session,
        current_user.id,
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return {
        "user_id": user.id,
        "xp": user.xp,
    }


@router.get("/level/me")
async def get_my_level(
    session: AsyncSession = Depends(get_session),
    current_user=Depends(get_current_user),
):
    user = await get_user_xp(
        session,
        current_user.id,
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return {
        "user_id": user.id,
        "xp": user.xp,
        "level": get_user_level(user.xp),
    }


@router.get("/xp/{user_id}")
async def get_student_xp(
    user_id: int,
    session: AsyncSession = Depends(get_session),
    current_user=Depends(instructor_only),
):
    user = await get_user_xp(
        session,
        user_id,
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return {
        "user_id": user.id,
        "xp": user.xp,
    }


@router.get("/level/{user_id}")
async def get_student_level(
    user_id: int,
    session: AsyncSession = Depends(get_session),
    current_user=Depends(instructor_only),
):
    user = await get_user_xp(
        session,
        user_id,
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return {
        "user_id": user.id,
        "xp": user.xp,
        "level": get_user_level(user.xp),
    }


@router.post("/add-xp")
async def add_xp_route(
    user_id: int,
    amount: int,
    session: AsyncSession = Depends(get_session),
    current_user=Depends(instructor_only),
):
    if amount <= 0:
        raise HTTPException(
            status_code=400,
            detail="XP amount must be greater than 0",
        )

    user = await add_xp(
        session,
        user_id,
        amount,
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return {
        "user_id": user.id,
        "xp": user.xp,
        "level": get_user_level(user.xp),
    }