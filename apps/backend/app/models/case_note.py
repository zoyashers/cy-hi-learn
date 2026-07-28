from __future__ import annotations

from datetime import datetime
from typing import Optional, TYPE_CHECKING

from sqlmodel import SQLModel, Field, Relationship


if TYPE_CHECKING:
    from .case_models import Case
    from .user_models import User



class CaseNote(SQLModel, table=True):

    __tablename__ = "case_notes"



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
    # NOTE CONTENT
    # =====================================

    content: str



    note_type: str = Field(
        default="investigation"
    )


    """
    Types:

    investigation
    observation
    evidence
    hypothesis
    lecturer_feedback
    """



    # =====================================
    # VISIBILITY
    # =====================================

    visible_to_student: bool = Field(
        default=True
    )



    # =====================================
    # TIMESTAMP
    # =====================================

    created_at: datetime = Field(
        default_factory=datetime.utcnow
    )


    updated_at: Optional[datetime] = None



    # =====================================
    # RELATIONSHIPS
    # =====================================

    case: Optional["Case"] = Relationship(
        back_populates="notes"
    )


    user: Optional["User"] = Relationship()