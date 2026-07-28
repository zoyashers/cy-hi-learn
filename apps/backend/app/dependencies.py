from fastapi import Depends, HTTPException, status
from sqlmodel.ext.asyncio.session import AsyncSession
from app.core.db import get_session

# Placeholder user dependency until auth is implemented
async def get_current_user(
    session: AsyncSession = Depends(get_session)
):
    # You can replace this with real authentication later
    return {"id": 1, "username": "test-user"}
