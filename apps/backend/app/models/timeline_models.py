from datetime import datetime
from typing import Optional

from sqlmodel import SQLModel, Field, Relationship

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
        foreign_key="evidence.id",
        index=True
    )

    # =====================================
    # EVENT INFORMATION
    # =====================================

    event: str

    description: Optional[str] = None

    event_type: str = Field(
        default="general"
    )

    # =====================================
    # TIMESTAMP
    # =====================================

    timestamp: datetime

    # =====================================
    # CONFIDENCE
    # =====================================

    confidence: Optional[str] = None

    # =====================================
    # CREATED RECORD
    # =====================================

    created_at: datetime = Field(
        default_factory=datetime.utcnow
    )

    # =====================================
    # RELATIONSHIPS
    # =====================================

    case: Case = Relationship(
        back_populates="timeline_events",
        sa_relationship_kwargs={
            "foreign_keys": "[TimelineEvent.case_id]"
        }
    )

    evidence: Optional[Evidence] = Relationship(
        sa_relationship_kwargs={
            "foreign_keys": "[TimelineEvent.evidence_id]"
        }
    )
