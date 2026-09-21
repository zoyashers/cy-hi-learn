from __future__ import annotations

from datetime import datetime
from typing import Optional, TYPE_CHECKING

from sqlmodel import SQLModel, Field, Relationship


if TYPE_CHECKING:
    from .case_models import Case
    from .user_models import User


class CaseProgress(SQLModel, table=True):

    __tablename__ = "case_progress"

    # =====================================
    # IDENTIFIER
    # =====================================

    id: Optional[int] = Field(
        default=None,
        primary_key=True
    )

    # =====================================
    # CONNECTIONS
    # =====================================

    case_id: int = Field(
        foreign_key="cases.id",
        index=True
    )

    user_id: int = Field(
        foreign_key="users.id",
        index=True
    )

    # =====================================
    # PROGRESS TRACKING
    # =====================================

    progress_percentage: float = Field(
        default=0
    )

    completed_tasks: int = Field(
        default=0
    )

    total_tasks: int = Field(
        default=0
    )

    completed_evidence: int = Field(
        default=0
    )

    total_evidence: int = Field(
        default=0
    )

    # =====================================
    # STATUS
    # =====================================

    status: str = Field(
        default="not_started"
    )

    # =====================================
    # TIME TRACKING
    # =====================================

    started_at: Optional[datetime] = None

    completed_at: Optional[datetime] = None

    updated_at: datetime = Field(
        default_factory=datetime.utcnow
    )

    # =====================================
    # RELATIONSHIPS
    # =====================================

    case: Case = Relationship(
        back_populates="progress"
    )

    user: User = Relationship(
        back_populates="case_progress"
    )
