from __future__ import annotations

from datetime import datetime
from typing import Optional, TYPE_CHECKING

from sqlmodel import SQLModel, Field, Relationship


if TYPE_CHECKING:
    from .user_models import User
    from .university_models import University



class Membership(SQLModel, table=True):

    __tablename__ = "memberships"


    id: Optional[int] = Field(
        default=None,
        primary_key=True
    )


    user_id: int = Field(
        foreign_key="users.id"
    )


    university_id: int = Field(
        foreign_key="universities.id"
    )


    role: str = Field(
        default="student"
    )


    course: Optional[str] = None


    verified: bool = Field(
        default=False
    )


    created_at: datetime = Field(
        default_factory=datetime.utcnow
    )


    user: Optional["User"] = Relationship(
        back_populates="memberships"
    )


    university: Optional["University"] = Relationship(
        back_populates="memberships"
    )