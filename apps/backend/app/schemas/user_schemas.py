from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr


# =====================================
# USER CREATION
# =====================================

class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str

    first_name: Optional[str] = None
    last_name: Optional[str] = None

    role: str = "student"


# =====================================
# LOGIN
# =====================================

class UserLogin(BaseModel):
    email: EmailStr
    password: str


# =====================================
# USER RESPONSE
# =====================================

class UserRead(BaseModel):
    id: int
    email: str
    username: str

    first_name: Optional[str] = None
    last_name: Optional[str] = None

    role: str
    is_active: bool
    xp: int = 0
    level_id: Optional[int] = None

    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# =====================================
# TOKEN RESPONSE
# =====================================

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


# =====================================
# BACKWARDS COMPATIBILITY
# =====================================

UserOut = UserRead
