from datetime import datetime
from typing import Optional, TYPE_CHECKING

from sqlmodel import SQLModel, Field, Relationship


if TYPE_CHECKING:
    from .user_models import User


class XP(SQLModel, table=True):

    __tablename__ = "xp"

    # =====================================
    # IDENTIFIER
    # =====================================

    id: Optional[int] = Field(
        default=None,
        primary_key=True
    )

    # =====================================
    # USER
    # =====================================

    user_id: Optional[int] = Field(
        default=None,
        foreign_key="users.id",
        index=True
    )

    # =====================================
    # XP
    # =====================================

    points: int = Field(
        default=0
    )

    # =====================================
    # TIMESTAMP
    # =====================================

    created_at: datetime = Field(
        default_factory=datetime.utcnow
    )

    # =====================================
    # RELATIONSHIP
    # =====================================

    user: Optional["User"] = Relationship(
        back_populates="xp_records"
    )


class XPEvent(SQLModel, table=True):

    __tablename__ = "xp_events"

    # =====================================
    # IDENTIFIER
    # =====================================

    id: Optional[int] = Field(
        default=None,
        primary_key=True
    )

    # =====================================
    # USER
    # =====================================

    user_id: Optional[int] = Field(
        default=None,
        foreign_key="users.id",
        index=True
    )

    # =====================================
    # EVENT
    # =====================================

    event_type: str

    amount: int = Field(
        default=0
    )

    description: Optional[str] = None

    # =====================================
    # TIMESTAMP
    # =====================================

    created_at: datetime = Field(
        default_factory=datetime.utcnow
    )

    # =====================================
    # RELATIONSHIP
    # =====================================

    user: Optional["User"] = Relationship(
        back_populates="xp_events",
        sa_relationship_kwargs={
            "lazy": "selectin"
        }
    )
