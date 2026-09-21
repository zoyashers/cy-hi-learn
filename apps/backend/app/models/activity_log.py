from __future__ import annotations

from datetime import datetime
from typing import TYPE_CHECKING, Optional

from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from .user_models import User


class ActivityLog(SQLModel, table=True):

    __tablename__ = "activity_logs"

    # =====================================
    # IDENTIFIER
    # =====================================

    id: Optional[int] = Field(
        default=None,
        primary_key=True
    )

    # =====================================
    # USER
    # =====================================

    user_id: int = Field(
        foreign_key="users.id",
        index=True
    )

    user: User = Relationship(
        back_populates="activity_logs"
    )

    # =====================================
    # ACTIVITY DATA
    # =====================================

    action: str

    description: Optional[str] = None

    # =====================================
    # TIMESTAMP
    # =====================================

    created_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
    )