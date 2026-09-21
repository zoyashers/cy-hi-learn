
from datetime import datetime
from typing import Optional, TYPE_CHECKING

from sqlmodel import SQLModel, Field, Relationship


if TYPE_CHECKING:
    from .user_models import User


class ActivityEvent(SQLModel, table=True):

    __tablename__ = "activity_events"

    id: Optional[int] = Field(
        default=None,
        primary_key=True
    )

    user_id: Optional[int] = Field(
        default=None,
        foreign_key="users.id"
    )

    activity_type: str

    description: Optional[str] = None

    created_at: datetime = Field(
        default_factory=datetime.utcnow
    )


    user: Optional["User"] = Relationship(
        back_populates="activities",
        sa_relationship_kwargs={
            "lazy": "selectin"
        }
    )