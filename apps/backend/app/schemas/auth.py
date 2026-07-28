from pydantic import BaseModel, EmailStr, ConfigDict
from datetime import datetime



# -----------------------------
# REGISTER
# -----------------------------

class RegisterRequest(BaseModel):

    username: str

    full_name: str

    email: EmailStr

    password: str

    role: str = "student"

# -----------------------------
# LOGIN
# -----------------------------

class LoginRequest(BaseModel):

    email: EmailStr

    password: str



# -----------------------------
# LOGIN RESPONSE
# -----------------------------

class LoginResponse(BaseModel):

    access_token: str

    token_type: str = "bearer"



# -----------------------------
# USER RESPONSE
# -----------------------------

class UserRead(BaseModel):

    id: int

    username: str

    email: EmailStr

    full_name: str | None = None

    role: str

    active: bool

    total_xp: int = 0

    level: int = 1

    created_at: datetime | None = None



    model_config = ConfigDict(
        from_attributes=True
    )