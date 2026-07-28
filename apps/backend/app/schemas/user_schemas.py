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

    full_name: Optional[str] = None



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

    full_name: Optional[str] = None

    role: str

    active: bool

    created_at: datetime


    class Config:
        from_attributes = True



# =====================================
# TOKEN RESPONSE
# =====================================

class Token(BaseModel):

    access_token: str

    token_type: str = "bearer"