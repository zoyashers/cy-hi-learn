from datetime import datetime

from pydantic import BaseModel, ConfigDict



# -----------------------------
# CREATE EVIDENCE
# -----------------------------

class EvidenceCreate(BaseModel):

    case_id: int

    filename: str

    filepath: str | None = None

    filetype: str | None = None

    filesize: int | None = None

    sha256: str | None = None

    description: str | None = None

    evidence_type: str = "file"



# -----------------------------
# OUTPUT
# -----------------------------

class EvidenceOut(BaseModel):

    id: int

    case_id: int

    filename: str

    filepath: str | None

    filetype: str | None

    filesize: int | None

    sha256: str | None

    description: str | None

    evidence_type: str

    status: str

    collected_by: int | None

    created_at: datetime


    model_config = ConfigDict(
        from_attributes=True
    )



# -----------------------------
# ANALYSIS CREATE
# -----------------------------

class EvidenceAnalysisCreate(BaseModel):

    evidence_id: int

    summary: str | None = None

    details_json: str | None = None

    tool_used: str | None = None



# -----------------------------
# ANALYSIS OUTPUT
# -----------------------------

class EvidenceAnalysisOut(BaseModel):

    id: int

    evidence_id: int

    summary: str | None

    details_json: str | None

    tool_used: str | None

    created_at: datetime


    model_config = ConfigDict(
        from_attributes=True
    )