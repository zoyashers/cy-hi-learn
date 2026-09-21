from __future__ import annotations

from datetime import datetime
from typing import Optional, TYPE_CHECKING

from sqlmodel import SQLModel, Field, Relationship


if TYPE_CHECKING:
    from .case_models import Case
    from .user_models import User


class Report(SQLModel, table=True):

    __tablename__ = "reports"

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
    # REPORT DETAILS
    # =====================================

    title: str

    content: str

    report_type: str = Field(
        default="forensic_report"
    )

    # =====================================
    # REPORT STATUS
    # =====================================

    status: str = Field(
        default="draft"
    )

    # =====================================
    # REVIEW
    # =====================================

    lecturer_feedback: Optional[str] = None

    reviewed_by: Optional[int] = Field(
        default=None,
        foreign_key="users.id"
    )

    # =====================================
    # EXPORT SUPPORT
    # =====================================

    pdf_path: Optional[str] = None

    generated_by_ai: bool = Field(
        default=False
    )

    # =====================================
    # TIMESTAMPS
    # =====================================

    created_at: datetime = Field(
        default_factory=datetime.utcnow
    )

    updated_at: Optional[datetime] = None

    reviewed_at: Optional[datetime] = None

    # =====================================
    # RELATIONSHIPS
    # =====================================

    # Case this report belongs to
    case: Case = Relationship(
        back_populates="reports"
    )

    # User who created/submitted the report
    user: User = Relationship(
        back_populates="reports",
        sa_relationship_kwargs={
            "foreign_keys": "Report.user_id"
        }
    )

    # User who reviewed the report
    reviewer: User = Relationship(
        back_populates="reviewed_reports",
        sa_relationship_kwargs={
            "foreign_keys": "Report.reviewed_by"
        }
    )
