from datetime import datetime
from typing import Optional, TYPE_CHECKING, List

from sqlmodel import SQLModel, Field, Relationship

if TYPE_CHECKING:
    from .case_models import Case
    from .soc_event import SOCEvent


class Evidence(SQLModel, table=True):

    __tablename__ = "evidence"

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
    # FILE INFORMATION
    # =====================================

    filename: str

    filepath: str

    filetype: Optional[str] = None

    filesize: Optional[int] = None

    # =====================================
    # INTEGRITY
    # =====================================

    sha256: Optional[str] = Field(
        default=None,
        index=True
    )

    md5: Optional[str] = None

    # =====================================
    # EVIDENCE DETAILS
    # =====================================

    description: Optional[str] = None

    evidence_type: str = Field(
        default="digital_file"
    )

    source: Optional[str] = None

    # =====================================
    # CHAIN OF CUSTODY FOUNDATION
    # =====================================

    collected_by: Optional[int] = Field(
        default=None,
        foreign_key="users.id"
    )

    collection_notes: Optional[str] = None

    # =====================================
    # TIMESTAMP
    # =====================================

    created_at: datetime = Field(
        default_factory=datetime.utcnow
    )

    # =====================================
    # RELATIONSHIPS
    # =====================================

    case: "Case" = Relationship(
        back_populates="evidence"
    )

    soc_events: List["SOCEvent"] = Relationship(
        back_populates="evidence"
    )


# =====================================================
# EVIDENCE ANALYSIS RESULTS
# =====================================================

class EvidenceAnalysis(SQLModel, table=True):

    __tablename__ = "evidence_analysis"

    id: Optional[int] = Field(
        default=None,
        primary_key=True
    )

    evidence_id: int = Field(
        foreign_key="evidence.id",
        index=True
    )

    # =====================================
    # ANALYSIS RESULTS
    # =====================================

    analyst_summary: Optional[str] = None

    findings: Optional[str] = None

    tool_used: Optional[str] = None

    # =====================================
    # TIMESTAMP
    # =====================================

    created_at: datetime = Field(
        default_factory=datetime.utcnow
    )