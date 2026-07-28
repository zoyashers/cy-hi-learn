from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


# =====================================
# REPORT CREATION
# =====================================

class ReportCreate(BaseModel):

    case_id: int

    title: str

    content: str

    report_type: str = "forensic"



# =====================================
# REPORT REVIEW
# =====================================

class ReportReview(BaseModel):

    status: str

    lecturer_feedback: Optional[str] = None



# =====================================
# REPORT RESPONSE
# =====================================

class ReportRead(BaseModel):

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