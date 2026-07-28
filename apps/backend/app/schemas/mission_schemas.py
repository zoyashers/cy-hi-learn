from datetime import datetime
from typing import Optional

from pydantic import BaseModel



# =====================================
# MISSION CREATION
# =====================================

class MissionCreate(BaseModel):

    title: str

    description: Optional[str] = None

    difficulty: Optional[str] = "Beginner"

    xp_reward: int = 0



# =====================================
# MISSION UPDATE
# =====================================

class MissionUpdate(BaseModel):

    title: Optional[str] = None

    description: Optional[str] = None

    difficulty: Optional[str] = None

    xp_reward: Optional[int] = None



# =====================================
# MISSION RESPONSE
# =====================================

class MissionRead(BaseModel):

    id: int

    title: str

    description: Optional[str] = None

    difficulty: Optional[str] = None

    xp_reward: int

    created_at: datetime


    class Config:
        from_attributes = True