from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import select
from app.models.user_models import User
from app.core.session import async_session

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/")
async def list_users():
    async with async_session() as session:
        result = await session.exec(select(User))
        return result.all()


@router.get("/{user_id}")
async def get_user(user_id: int):
    async with async_session() as session:
        user = await session.get(User, user_id)
        if not user:
            raise HTTPException(404, "User not found")
        return user


@router.post("/")
async def create_user(user: User):
    async with async_session() as session:
        session.add(user)
        await session.commit()
        await session.refresh(user)
        return user


@router.delete("/{user_id}")
async def delete_user(user_id: int):
    async with async_session() as session:
        user = await session.get(User, user_id)
        if not user:
            raise HTTPException(404, "User not found")
        await session.delete(user)
        await session.commit()
        return {"message": "User deleted"}
