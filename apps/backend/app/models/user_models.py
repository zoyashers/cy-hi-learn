from __future__ import annotations

from typing import Optional, TYPE_CHECKING, List
from datetime import datetime

from sqlmodel import SQLModel, Field, Relationship


if TYPE_CHECKING:
    from .membership_models import Membership
    from .xp import XP
    from .level import Level
    from .activity_models import Activity
    from .case_models import Case
    from .submission_models import Submission


class User(SQLModel, table=True):

    __tablename__ = "users"

    id: Optional[int] = Field(
        default=None,
        primary_key=True
    )

    email: str = Field(
        unique=True,
        index=True
    )

    username: str = Field(
        unique=True,
        index=True
    )

    hashed_password: str

    full_name: Optional[str] = None

    role: str = Field(
        default="student"
    )

    university_id: Optional[int] = Field(
        default=None,
        foreign_key="universities.id"
    )

    is_active: bool = Field(
        default=True
    )

    created_at: datetime = Field(
        default_factory=datetime.utcnow
    )


    # Relationships

    membership: Optional["Membership"] = Relationship(
        back_populates="user"
    )


    xp: Optional["XP"] = Relationship(
        back_populates="user"
    )


    level: Optional["Level"] = Relationship(
        back_populates="user"
    )


    activities: List["Activity"] = Relationship(
        back_populates="user"
    )


    cases: List["Case"] = Relationship(
        back_populates="assigned_user"
    )


    submissions: List["Submission"] = Relationship(
        back_populates="user"
    )