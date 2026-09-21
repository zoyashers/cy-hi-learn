from datetime import datetime
from typing import Optional, TYPE_CHECKING, List

from sqlmodel import SQLModel, Field, Relationship


if TYPE_CHECKING:
    from .task import Task
    from .evidence import Evidence
    from .user_models import User
    from .case_assignment import CaseAssignment
    from .caseprogress_models import CaseProgress
    from .report_models import Report
    from .timeline_models import TimelineEvent
    from .case_note import CaseNote
    from .soc_event import SOCEvent


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

    tasks: List["Task"] = Relationship(
        back_populates="case"
    )

    evidence: List["Evidence"] = Relationship(
        back_populates="case"
    )

    assignments: List["CaseAssignment"] = Relationship(
        back_populates="case"
    )

    progress: List["CaseProgress"] = Relationship(
        back_populates="case"
    )

    reports: List["Report"] = Relationship(
        back_populates="case"
    )

    timeline_events: List["TimelineEvent"] = Relationship(
        back_populates="case"
    )

    notes: List["CaseNote"] = Relationship(
        back_populates="case"
    )

    soc_events: List["SOCEvent"] = Relationship(
        back_populates="case"
    )