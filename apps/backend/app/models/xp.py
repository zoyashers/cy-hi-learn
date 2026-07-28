from __future__ import annotations

from datetime import datetime
from typing import Optional, TYPE_CHECKING

from sqlmodel import SQLModel, Field, Relationship


if TYPE_CHECKING:
    from .user_models import User
    from .mission import Mission



# =====================================================
# USER XP TOTAL
# =====================================================

class XP(SQLModel, table=True):

    __tablename__ = "xp"


    id: Optional[int] = Field(
        default=None,
        primary_key=True
    )


    user_id: int = Field(
        foreign_key="users.id",
        index=True
    )


    amount: int = Field(
        default=0
    )


    level: int = Field(
        default=1
    )


    updated_at: datetime = Field(
        default_factory=datetime.utcnow
    )


    user: Optional["User"] = Relationship(
        back_populates="xp_records"
    )



# =====================================================
# XP HISTORY
# =====================================================

class XPEvent(SQLModel, table=True):

    __tablename__ = "xp_events"


    id: Optional[int] = Field(
        default=None,
        primary_key=True
    )


    user_id: int = Field(
        foreign_key="users.id",
        index=True
    )


    amount: int


    reason: str


    created_at: datetime = Field(
        default_factory=datetime.utcnow
    )


    user: Optional["User"] = Relationship(
        back_populates="xp_events"
    )



# =====================================================
# MISSION COMPLETION TRACKING
# =====================================================

class MissionCompletion(SQLModel, table=True):

    __tablename__ = "mission_completions"


    id: Optional[int] = Field(
        default=None,
        primary_key=True
    )


    user_id: int = Field(
        foreign_key="users.id",
        index=True
    )


    mission_id: int = Field(
        foreign_key="missions.id",
        index=True
    )


    completed: bool = Field(
        default=False
    )


    xp_awarded: int = Field(
        default=0
    )


    completed_at: Optional[datetime] = None