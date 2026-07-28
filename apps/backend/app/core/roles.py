from fastapi import Depends, HTTPException
from app.core.deps import get_current_user
from app.models.user_models import User


def requires_role(required_role: str):
    async def role_checker(current_user: User = Depends(get_current_user)):
        if current_user.role != required_role:
            raise HTTPException(403, "You do not have permission to access this resource")
        return current_user
    return role_checker


def requires_roles(allowed_roles: list[str]):
    async def role_checker(current_user: User = Depends(get_current_user)):
        if current_user.role not in allowed_roles:
            raise HTTPException(403, "You do not have permission to access this resource")
        return current_user
    return role_checker
