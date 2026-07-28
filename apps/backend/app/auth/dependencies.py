from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from app.core.config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        sub = payload.get("sub")
        role = payload.get("role")

        if sub is None or role is None:
            raise HTTPException(status_code=401, detail="Invalid token")

        return {"email": sub, "role": role, "id": payload.get("id")}
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
