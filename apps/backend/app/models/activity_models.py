from __future__ import annotations

from datetime import datetime
from typing import Optional, TYPE_CHECKING

from sqlmodel import SQLModel, Field, Relationship


if TYPE_CHECKING:
    from .user_models import User



class ActivityEvent(SQLModel, table=True):

    __tablename__ = "activity_events"



    # =====================================
    # IDENTIFIER
    # =====================================

    id: Optional[int] = Field(
        default=None,
        primary_key=True
    )



    # =====================================
    # USER CONNECTION
    # =====================================

    user_id: int = Field(
        foreign_key="users.id",
        index=True
    )



    # =====================================
    # ACTIVITY DETAILS
    # =====================================

    action: str



    category: str = Field(
        default="general"
    )


    """
    Categories:

    authentication
    evidence
    investigation
    submission
    learning
    assessment
    system
    """



    description: Optional[str] = None



    # =====================================
    # OPTIONAL CONTEXT
    # =====================================

    entity_type: Optional[str] = None


    """
    Examples:

    case
    task
    mission
    evidence
    report
    """



    entity_id: Optional[int] = None



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
        back_populates="activity_logs"
    )