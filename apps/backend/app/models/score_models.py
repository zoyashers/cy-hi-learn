from __future__ import annotations

from datetime import datetime
from typing import Optional, TYPE_CHECKING

from sqlmodel import SQLModel, Field, Relationship


if TYPE_CHECKING:
    from .user_models import User
    from .case_models import Case
    from .mission import Mission



class Score(SQLModel, table=True):

    __tablename__ = "scores"



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

    user_id: int = Field(
        foreign_key="users.id",
        index=True
    )


    case_id: Optional[int] = Field(
        default=None,
        foreign_key="cases.id"
    )


    mission_id: Optional[int] = Field(
        default=None,
        foreign_key="missions.id"
    )



    # =====================================
    # SCORE INFORMATION
    # =====================================

    points: int = Field(
        default=0
    )


    max_points: int = Field(
        default=100
    )



    percentage: float = Field(
        default=0
    )



    grade: Optional[str] = None


    """
    Examples:

    A
    B
    C
    D
    F
    """



    feedback: Optional[str] = None



    # =====================================
    # ASSESSMENT STATUS
    # =====================================

    status: str = Field(
        default="pending"
    )


    """
    pending
    reviewed
    approved
    returned
    """



    # =====================================
    # TIMESTAMPS
    # =====================================

    created_at: datetime = Field(
        default_factory=datetime.utcnow
    )


    reviewed_at: Optional[datetime] = None



    # =====================================
    # RELATIONSHIP
    # =====================================

    user: Optional["User"] = Relationship(
        back_populates="scores"
    )