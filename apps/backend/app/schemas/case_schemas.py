from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel, ConfigDict



# -----------------------------
# TASK SUMMARY
# -----------------------------

class TaskSummary(BaseModel):

    id: int

    title: str

    description: Optional[str] = None


    model_config = ConfigDict(
        from_attributes=True
    )



# -----------------------------
# CASE
# -----------------------------

class CaseBase(BaseModel):

    title: str

    description: Optional[str] = None



class CaseCreate(CaseBase):

    difficulty: Optional[str] = "beginner"



class CaseRead(CaseBase):

    id: int

    creator_id: Optional[int] = None

    difficulty: Optional[str] = None

    status: str

    created_at: datetime

    tasks: List[TaskSummary] = []


    model_config = ConfigDict(
        from_attributes=True
    )



# -----------------------------
# NOTES
# -----------------------------

class CaseNoteBase(BaseModel):

    content: str

    note_type: str = "investigation"



class CaseNoteOut(CaseNoteBase):

    id: int

    case_id: int

    user_id: int

    visible_to_student: bool

    created_at: datetime


    model_config = ConfigDict(
        from_attributes=True
    )



# -----------------------------
# ASSIGNMENTS
# -----------------------------

class CaseAssignmentOut(BaseModel):

    id: int

    user_id: int

    case_id: int

    role: str

    status: str

    assigned_at: datetime


    model_config = ConfigDict(
        from_attributes=True
    )



# -----------------------------
# TIMELINE
# -----------------------------

class TimelineEventOut(BaseModel):

    id: int

    case_id: int

    event: str

    description: Optional[str] = None

    event_type: str

    timestamp: datetime

    confidence: Optional[str] = None


    model_config = ConfigDict(
        from_attributes=True
    )



# -----------------------------
# REPORTS
# -----------------------------

class ReportOut(BaseModel):

    id: int

    case_id: int

    title: str

    content: str

    report_type: str

    status: str

    lecturer_feedback: Optional[str] = None

    pdf_path: Optional[str] = None

    created_at: datetime


    model_config = ConfigDict(
        from_attributes=True
    )



# -----------------------------
# PROGRESS
# -----------------------------

class CaseProgressOut(BaseModel):

    id: int

    case_id: int

    user_id: int

    progress_percentage: float

    completed_tasks: int

    total_tasks: int

    completed_evidence: int

    total_evidence: int

    status: str


    model_config = ConfigDict(
        from_attributes=True
    )