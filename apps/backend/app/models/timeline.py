from __future__ import annotations

from datetime import datetime
from typing import Optional, TYPE_CHECKING

from sqlmodel import SQLModel, Field, Relationship


if TYPE_CHECKING:
    from .case_models import Case



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
    # CASE CONNECTION
    # =====================================

    case_id: int = Field(
        foreign_key="cases.id",
        index=True
    )



    # =====================================
    # EVENT INFORMATION
    # =====================================

    title: str


    description: Optional[str] = None



    event_type: str = Field(
        default="investigation"
    )

    """
    Types:

    investigation
    discovery
    login
    malware
    network
    file_change
    alert
    conclusion
    """



    # =====================================
    # TIMELINE DATA
    # =====================================

    event_time: Optional[datetime] = None



    created_at: datetime = Field(
        default_factory=datetime.utcnow
    )



    # =====================================
    # INVESTIGATION METADATA
    # =====================================

    source: Optional[str] = None

    """
    Examples:

    Windows Event Log
    Memory Analysis
    PCAP
    MobSF
    Analyst Note
    """



    confidence: Optional[str] = None

    """
    Examples:

    low
    medium
    high
    confirmed
    """



    # =====================================
    # RELATIONSHIP
    # =====================================

    case: Optional["Case"] = Relationship(
        back_populates="timeline"
    )