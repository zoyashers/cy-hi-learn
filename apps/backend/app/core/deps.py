from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from app.core.auth import decode_token
from app.core.session import async_session
from app.models.user_models import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


async def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = decode_token(token)
    if not payload:
        raise HTTPException(401, "Invalid or expired token")

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(401, "Invalid token payload")

    async with async_session() as session:
        user = await session.get(User, user_id)
        if not user:
            raise HTTPException(401, "User not found")

        return user
