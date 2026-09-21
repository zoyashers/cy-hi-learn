from __future__ import annotations

from datetime import datetime
from typing import TYPE_CHECKING, Optional

from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from .task import Task
    from .user_models import User


class Submission(SQLModel, table=True):

    __tablename__ = "submissions"

    # =====================================
    # IDENTIFIER
    # =====================================

    id: Optional[int] = Field(
        default=None,
        primary_key=True,
    )

    # =====================================
    # CONNECTIONS
    # =====================================

    task_id: int = Field(
        foreign_key="tasks.id",
        index=True,
    )

    user_id: int = Field(
        foreign_key="users.id",
        index=True,
    )

    # =====================================
    # MISSION ATTEMPT
    # =====================================

    mission_id: Optional[int] = Field(
        default=None,
        foreign_key="missions.id",
        index=True,
    )

    mission_attempt_id: Optional[int] = Field(
        default=None,
        foreign_key="mission_completions.id",
        index=True,
    )

    # =====================================
    # SUBMISSION CONTENT
    # =====================================

    answer: str

    file_path: Optional[str] = None

    submission_type: str = Field(
        default="answer",
    )

    # =====================================
    # GRADING
    # =====================================

    status: str = Field(
        default="submitted",
    )

    correct: Optional[bool] = None

    score: Optional[int] = None

    max_score: int = Field(
        default=100,
    )

    # =====================================
    # HINTS
    # =====================================

    hints_used: int = Field(
        default=0,
    )

    # =====================================
    # REVIEW WORKFLOW
    # =====================================

    lecturer_feedback: Optional[str] = None

    reviewed_by: Optional[int] = Field(
        default=None,
        foreign_key="users.id",
        index=True,
    )

    # =====================================
    # TIMESTAMPS
    # =====================================

    submitted_at: datetime = Field(
        default_factory=datetime.utcnow,
    )

    reviewed_at: Optional[datetime] = None

    # =====================================
    # RELATIONSHIPS
    # =====================================

    task: Task = Relationship(
        back_populates="submissions",
    )

    user: User = Relationship(
        back_populates="submissions",
        sa_relationship_kwargs={
            "foreign_keys": "Submission.user_id",
        },
    )

    reviewer: User = Relationship(
        back_populates="reviewed_submissions",
        sa_relationship_kwargs={
            "foreign_keys": "Submission.reviewed_by",
        },
    )