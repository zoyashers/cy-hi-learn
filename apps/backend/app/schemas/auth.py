from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


# =====================================
# REGISTER
# =====================================

class RegisterRequest(BaseModel):
    username: str = Field(min_length=3, max_length=50)
    first_name: str = Field(min_length=1, max_length=50)
    last_name: str = Field(min_length=1, max_length=50)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


# =====================================
# LOGIN
# =====================================

class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# =====================================
# LOGIN RESPONSE
# =====================================

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


# =====================================
# USER RESPONSE
# =====================================

class UserRead(BaseModel):
    id: int
    username: str
    email: EmailStr

    first_name: str | None = None
    last_name: str | None = None

    role: str
    is_active: bool

    xp: int = 0
    level_id: int | None = None

    created_at: datetime | None = None

    model_config = ConfigDict(
        from_attributes=True
    )