from __future__ import annotations

from datetime import datetime
from typing import Optional, TYPE_CHECKING

from sqlmodel import SQLModel, Field, Relationship


if TYPE_CHECKING:
    from .user_models import User



class ActivityLog(SQLModel, table=True):

    __tablename__ = "activity_logs"



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
    # ACTION INFORMATION
    # =====================================

    action: str



    category: str = Field(
        default="system"
    )


    """
    Categories:

    authentication
    user_management
    evidence
    investigation
    assessment
    admin
    """



    description: Optional[str] = None



    # =====================================
    # REQUEST INFORMATION
    # =====================================

    ip_address: Optional[str] = None



    user_agent: Optional[str] = None



    # =====================================
    # OPTIONAL TARGET
    # =====================================

    entity_type: Optional[str] = None



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