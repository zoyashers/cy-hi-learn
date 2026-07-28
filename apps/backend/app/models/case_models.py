from __future__ import annotations

from datetime import datetime
from typing import Optional, TYPE_CHECKING

from sqlmodel import SQLModel, Field, Relationship


if TYPE_CHECKING:
    from .task import Task
    from .evidence import Evidence
    from .user_models import User
    from .case_assignment import CaseAssignment
    from .caseprogress_models import CaseProgress
    from .report_models import Report
    from .timeline import TimelineEvent



class Case(SQLModel, table=True):

    __tablename__ = "cases"


    # =====================================
    # IDENTIFIER
    # =====================================

    id: Optional[int] = Field(
        default=None,
        primary_key=True
    )


    # =====================================
    # BASIC INFORMATION
    # =====================================

    title: str


    description: Optional[str] = None


    status: str = Field(
        default="active"
    )


    difficulty: str = Field(
        default="beginner"
    )


    # =====================================
    # CREATOR
    # =====================================

    created_by: Optional[int] = Field(
        default=None,
        foreign_key="users.id"
    )


    # =====================================
    # TIMESTAMP
    # =====================================

    created_at: datetime = Field(
        default_factory=datetime.utcnow
    )


    # =====================================
    # RELATIONSHIPS
    # =====================================

    creator: Optional["User"] = Relationship(
        back_populates="created_cases",
        sa_relationship_kwargs={
            "foreign_keys": "[Case.created_by]"
        }
    )


    tasks: list["Task"] = Relationship(
        back_populates="case"
    )


    evidence: list["Evidence"] = Relationship(
        back_populates="case"
    )


    assignments: list["CaseAssignment"] = Relationship(
        back_populates="case"
    )


    progress: list["CaseProgress"] = Relationship(
        back_populates="case"
    )


    reports: list["Report"] = Relationship(
        back_populates="case"
    )


    timeline_events: list["TimelineEvent"] = Relationship(
        back_populates="case"
    )