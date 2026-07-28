from __future__ import annotations

from datetime import datetime
from typing import Optional, TYPE_CHECKING

from sqlmodel import SQLModel, Field, Relationship


if TYPE_CHECKING:
    from .case_models import Case
    from .evidence import Evidence



class SOCEvent(SQLModel, table=True):

    __tablename__ = "soc_events"



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



    # Optional evidence connection

    evidence_id: Optional[int] = Field(
        default=None,
        foreign_key="evidence.id"
    )



    # =====================================
    # ALERT INFORMATION
    # =====================================

    title: str



    description: Optional[str] = None



    event_type: str = Field(
        default="security_alert"
    )


    """
    Examples:

    malware_detection
    brute_force
    suspicious_login
    phishing
    privilege_escalation
    data_exfiltration
    network_anomaly
    """



    # =====================================
    # SOC PRIORITY
    # =====================================

    severity: str = Field(
        default="medium"
    )


    """
    low
    medium
    high
    critical
    """



    status: str = Field(
        default="open"
    )


    """
    open
    investigating
    contained
    resolved
    closed
    """



    # =====================================
    # INVESTIGATION DETAILS
    # =====================================

    analyst_notes: Optional[str] = None



    recommended_action: Optional[str] = None



    assigned_to: Optional[int] = Field(
        default=None,
        foreign_key="users.id"
    )



    # =====================================
    # TIMESTAMPS
    # =====================================

    detected_at: datetime = Field(
        default_factory=datetime.utcnow
    )


    resolved_at: Optional[datetime] = None



    # =====================================
    # RELATIONSHIPS
    # =====================================

    case: Optional["Case"] = Relationship(
        back_populates="soc_events"
    )


    evidence: Optional["Evidence"] = Relationship(
        back_populates="soc_events"
    )