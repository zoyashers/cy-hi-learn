from fastapi import Depends, HTTPException, status
from app.auth.dependencies import get_current_user


def require_role(required: str):
    def wrapper(user=Depends(get_current_user)):
        if user["role"] != required:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Requires {required} role"
            )
        return user
    return wrapper


def require_admin(user=Depends(get_current_user)):
    if user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Admin only")
    return user


def require_instructor(user=Depends(get_current_user)):
    if user["role"] not in ["instructor", "admin"]:
        raise HTTPException(status_code=403, detail="Instructor only")
    return user
