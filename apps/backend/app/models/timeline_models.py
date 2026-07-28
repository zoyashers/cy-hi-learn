from __future__ import annotations

from datetime import datetime
from typing import Optional, TYPE_CHECKING

from sqlmodel import SQLModel, Field, Relationship


if TYPE_CHECKING:
    from .case_models import Case
    from .evidence import Evidence



class TimelineEvent(SQLModel, table=True):

    __tablename__ = "timeline_events"



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


    evidence_id: Optional[int] = Field(
        default=None,
        foreign_key="evidence.id"
    )



    # =====================================
    # EVENT INFORMATION
    # =====================================

    event: str



    description: Optional[str] = None



    event_type: str = Field(
        default="general"
    )


    """
    Types:

    login
    malware_execution
    file_creation
    network_activity
    privilege_change
    data_access
    system_event
    """



    # =====================================
    # TIMESTAMP OF INCIDENT EVENT
    # =====================================

    timestamp: datetime



    # =====================================
    # CONFIDENCE
    # =====================================

    confidence: Optional[str] = None


    """
    Examples:

    confirmed
    likely
    suspected
    """



    # =====================================
    # CREATED RECORD
    # =====================================

    created_at: datetime = Field(
        default_factory=datetime.utcnow
    )



    # =====================================
    # RELATIONSHIPS
    # =====================================

    case: Optional["Case"] = Relationship(
        back_populates="timeline_events"
    )


    evidence: Optional["Evidence"] = Relationship()