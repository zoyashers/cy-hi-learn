from datetime import datetime
from typing import Optional, TYPE_CHECKING, List

from sqlmodel import SQLModel, Field, Relationship


if TYPE_CHECKING:
    from .case_models import Case
    from .mission import Mission
    from .submission_models import Submission


class Task(SQLModel, table=True):

    __tablename__ = "tasks"

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

    case_id: Optional[int] = Field(
        default=None,
        foreign_key="cases.id",
        index=True
    )

    mission_id: Optional[int] = Field(
        default=None,
        foreign_key="missions.id",
        index=True
    )

    # =====================================
    # TASK INFORMATION
    # =====================================

    title: str

    description: Optional[str] = None

    task_type: str = Field(
        default="investigation"
    )

    difficulty: str = Field(
        default="beginner"
    )

    # =====================================
    # REWARD SYSTEM
    # =====================================

    xp_reward: int = Field(
        default=50
    )

    max_score: int = Field(
        default=100
    )

    # =====================================
    # TASK REQUIREMENTS
    # =====================================

    required: bool = Field(
        default=True
    )

    order_number: int = Field(
        default=1
    )

    # =====================================
    # STATUS
    # =====================================

    active: bool = Field(
        default=True
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

    case: Optional["Case"] = Relationship(
        back_populates="tasks"
    )

    mission: Optional["Mission"] = Relationship(
        back_populates="tasks"
    )

    submissions: List["Submission"] = Relationship(
        back_populates="task"
    )