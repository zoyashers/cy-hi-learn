from __future__ import annotations

from datetime import datetime
from typing import Optional, TYPE_CHECKING

from sqlmodel import SQLModel, Field, Relationship


if TYPE_CHECKING:
    from .case_models import Case
    from .user_models import User


class CaseAssignment(SQLModel, table=True):

    __tablename__ = "case_assignments"

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

    assigned_by: Optional[int] = Field(
        default=None,
        foreign_key="users.id",
        index=True
    )

    # =====================================
    # ASSIGNMENT INFORMATION
    # =====================================

    role: str = Field(
        default="student"
    )

    # =====================================
    # STATUS
    # =====================================

    status: str = Field(
        default="assigned"
    )

    # =====================================
    # TIMESTAMPS
    # =====================================

    assigned_at: datetime = Field(
        default_factory=datetime.utcnow
    )

    completed_at: Optional[datetime] = None

    # =====================================
    # RELATIONSHIPS
    # =====================================

    case: Case = Relationship(
        back_populates="assignments"
    )

    user: User = Relationship(
        back_populates="case_assignments",
        sa_relationship_kwargs={
            "foreign_keys": "[CaseAssignment.user_id]"
        }
    )

    assigned_by_user: User = Relationship(
        back_populates="assigned_case_assignments",
        sa_relationship_kwargs={
            "foreign_keys": "[CaseAssignment.assigned_by]"
        }
    )
