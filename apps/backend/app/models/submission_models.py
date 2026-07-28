from __future__ import annotations

from datetime import datetime
from typing import Optional, TYPE_CHECKING

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
        primary_key=True
    )



    # =====================================
    # CONNECTIONS
    # =====================================

    task_id: int = Field(
        foreign_key="tasks.id",
        index=True
    )


    user_id: int = Field(
        foreign_key="users.id",
        index=True
    )



    # =====================================
    # SUBMISSION CONTENT
    # =====================================

    answer: str



    file_path: Optional[str] = None



    submission_type: str = Field(
        default="answer"
    )


    """
    Examples:

    answer
    report
    evidence_analysis
    screenshot
    code
    """



    # =====================================
    # REVIEW WORKFLOW
    # =====================================

    status: str = Field(
        default="submitted"
    )


    """
    submitted
    reviewing
    approved
    rejected
    resubmit_required
    """



    lecturer_feedback: Optional[str] = None



    reviewed_by: Optional[int] = Field(
        default=None,
        foreign_key="users.id"
    )



    # =====================================
    # MARKING
    # =====================================

    score: Optional[int] = None


    max_score: int = Field(
        default=100
    )



    # =====================================
    # TIMESTAMPS
    # =====================================

    submitted_at: datetime = Field(
        default_factory=datetime.utcnow
    )


    reviewed_at: Optional[datetime] = None



    # =====================================
    # RELATIONSHIPS
    # =====================================

    task: Optional["Task"] = Relationship(
        back_populates="submissions"
    )


    user: Optional["User"] = Relationship(
        back_populates="submissions"
    )