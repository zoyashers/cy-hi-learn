from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


# =====================================
# TIMELINE CREATE
# =====================================

class TimelineCreate(BaseModel):

    case_id: int

    event: str

    description: Optional[str] = None

    event_type: str = "incident"



# =====================================
# TIMELINE UPDATE
# =====================================

class TimelineUpdate(BaseModel):

    event: Optional[str] = None

    description: Optional[str] = None

    event_type: Optional[str] = None

    confidence: Optional[str] = None



# =====================================
# TIMELINE RESPONSE
# =====================================

class TimelineRead(BaseModel):

    id: int

    case_id: int

    event: str

    description: Optional[str] = None

    event_type: str

    confidence: Optional[str] = None

    timestamp: datetime


    model_config = ConfigDict(
        from_attributes=True
    )