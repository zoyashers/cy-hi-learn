from datetime import datetime
from typing import TYPE_CHECKING, Optional

from sqlmodel import SQLModel, Field, Relationship

from .level import Level
from .activity_log import ActivityLog


if TYPE_CHECKING:
    from .xp import XP, XPEvent
    from .activity_models import ActivityEvent
    from .case_models import Case
    from .case_assignment import CaseAssignment
    from .caseprogress_models import CaseProgress
    from .case_note import CaseNote
    from .submission_models import Submission
    from .membership_models import Membership
    from .mission_completion import MissionCompletion
    from .report_models import Report
    from .score_models import Score


class User(SQLModel, table=True):

    __tablename__ = "users"

    # =====================================
    # IDENTIFIER
    # =====================================

    id: Optional[int] = Field(
        default=None,
        primary_key=True
    )

    # =====================================
    # ACCOUNT INFORMATION
    # =====================================

    email: str = Field(
        unique=True,
        index=True
    )

    username: str = Field(
        unique=True,
        index=True
    )

    hashed_password: str

    # =====================================
    # USER INFORMATION
    # =====================================

    first_name: Optional[str] = None

    last_name: Optional[str] = None

    role: str = Field(
        default="student",
        index=True
    )

    is_active: bool = Field(
        default=True
    )

    # =====================================
    # GAMIFICATION
    # =====================================

    xp: int = Field(
        default=0
    )

    level_id: Optional[int] = Field(
        default=None,
        foreign_key="levels.id",
        index=True
    )

    # =====================================
    # TIMESTAMP
    # =====================================

    created_at: datetime = Field(
        default_factory=datetime.utcnow
    )

    updated_at: datetime = Field(
        default_factory=datetime.utcnow
    )

    # =====================================
    # LEVEL
    # =====================================

    level: Optional[Level] = Relationship(
        back_populates="users",
        sa_relationship_kwargs={
            "lazy": "selectin"
        }
    )

    # =====================================
    # XP RECORDS
    # =====================================

    xp_records: list["XP"] = Relationship(
        back_populates="user"
    )

    # =====================================
    # XP EVENTS
    # =====================================

    xp_events: list["XPEvent"] = Relationship(
        back_populates="user"
    )

    # =====================================
    # ACTIVITY EVENTS
    # =====================================

    activities: list["ActivityEvent"] = Relationship(
        back_populates="user"
    )

    # =====================================
    # ACTIVITY LOGS
    # =====================================

    activity_logs: list[ActivityLog] = Relationship(
        back_populates="user"
    )

    # =====================================
    # CASES CREATED
    # =====================================

    created_cases: list["Case"] = Relationship(
        back_populates="creator",
        sa_relationship_kwargs={
            "foreign_keys": "Case.created_by"
        }
    )

    # =====================================
    # CASE ASSIGNMENTS
    # =====================================

    case_assignments: list["CaseAssignment"] = Relationship(
        back_populates="user",
        sa_relationship_kwargs={
            "foreign_keys": "CaseAssignment.user_id"
        }
    )

    # =====================================
    # CASES ASSIGNED BY THIS USER
    # =====================================

    assigned_case_assignments: list["CaseAssignment"] = Relationship(
        back_populates="assigned_by_user",
        sa_relationship_kwargs={
            "foreign_keys": "CaseAssignment.assigned_by"
        }
    )

    # =====================================
    # CASE PROGRESS
    # =====================================

    case_progress: list["CaseProgress"] = Relationship(
        back_populates="user"
    )

    # =====================================
    # CASE NOTES
    # =====================================

    case_notes: list["CaseNote"] = Relationship(
        back_populates="author"
    )

    # =====================================
    # MISSION COMPLETIONS
    # =====================================

    mission_completions: list["MissionCompletion"] = Relationship(
        back_populates="user"
    )

    # =====================================
    # UNIVERSITY MEMBERSHIPS
    # =====================================

    memberships: list["Membership"] = Relationship(
        back_populates="user"
    )

    # =====================================
    # SUBMISSIONS
    # =====================================

    submissions: list["Submission"] = Relationship(
        back_populates="user",
        sa_relationship_kwargs={
            "foreign_keys": "Submission.user_id"
        }
    )

    # =====================================
    # SUBMISSIONS REVIEWED
    # =====================================

    reviewed_submissions: list["Submission"] = Relationship(
        back_populates="reviewer",
        sa_relationship_kwargs={
            "foreign_keys": "Submission.reviewed_by"
        }
    )

    # =====================================
    # REPORTS CREATED
    # =====================================

    reports: list["Report"] = Relationship(
        back_populates="user",
        sa_relationship_kwargs={
            "foreign_keys": "Report.user_id"
        }
    )

    # =====================================
    # REPORTS REVIEWED
    # =====================================

    reviewed_reports: list["Report"] = Relationship(
        back_populates="reviewer",
        sa_relationship_kwargs={
            "foreign_keys": "Report.reviewed_by"
        }
    )

    # =====================================
    # SCORES
    # =====================================

    scores: list["Score"] = Relationship(
        back_populates="user",
        sa_relationship_kwargs={
            "foreign_keys": "Score.user_id"
        }
    )