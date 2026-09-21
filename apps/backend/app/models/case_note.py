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
    # CASE CONNECTION
    # =====================================

    case_id: int = Field(
        foreign_key="cases.id",
        index=True
    )

    # =====================================
    # AUTHOR
    # =====================================

    created_by: Optional[int] = Field(
        default=None,
        foreign_key="users.id",
        index=True
    )

    # =====================================
    # NOTE
    # =====================================

    note: str

    # =====================================
    # TIMESTAMP
    # =====================================

    created_at: datetime = Field(
        default_factory=datetime.utcnow
    )

    # =====================================
    # RELATIONSHIPS
    # =====================================

    case: Case = Relationship(
        back_populates="notes"
    )

    author: User = Relationship(
        sa_relationship_kwargs={
            "foreign_keys": "[CaseNote.created_by]"
        }
    )