from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


# ============================================================
# MISSION CREATION
# ============================================================

class MissionCreate(BaseModel):

    title: str

    description: Optional[str] = None

    difficulty: str = "easy"

    category: Optional[str] = None

    learning_unit: Optional[str] = None

    skill: Optional[str] = None

    generator_type: str = "fundamental"

    xp_reward: int = 100


# ============================================================
# MISSION UPDATE
# ============================================================

class MissionUpdate(BaseModel):

    title: Optional[str] = None

    description: Optional[str] = None

    difficulty: Optional[str] = None

    category: Optional[str] = None

    learning_unit: Optional[str] = None

    skill: Optional[str] = None

    generator_type: Optional[str] = None

    xp_reward: Optional[int] = None


# ============================================================
# MISSION RESPONSE
# ============================================================

class MissionRead(BaseModel):

    id: int

    title: str

    description: Optional[str] = None

    difficulty: str

    category: Optional[str] = None

    learning_unit: Optional[str] = None

    skill: Optional[str] = None

    generator_type: Optional[str] = None

    xp_reward: int

    created_at: datetime

    class Config:
        from_attributes = True


# ============================================================
# START MISSION
# ============================================================

class MissionStartResponse(BaseModel):

    attempt_id: int

    mission_id: int

    attempt_number: int

    title: str

    description: Optional[str] = None

    learning_unit: Optional[str] = None

    skill: Optional[str] = None

    difficulty: str

    scenario_type: Optional[str] = None

    generated_content: Optional[str] = None

    hints: list[str] = Field(
        default_factory=list,
    )

    xp_reward: int


# ============================================================
# COMPLETE ATTEMPT
# ============================================================

class MissionAttemptCompleteRequest(BaseModel):

    score: int = Field(
        ge=0,
        le=100,
    )

    hints_used: int = Field(
        default=0,
        ge=0,
    )


class MissionAttemptCompleteResponse(BaseModel):

    attempt_id: int

    mission_id: int

    attempt_number: int

    completed: bool

    score: int

    hints_used: int

    xp_awarded: int

    total_xp: int

    level: int

    rank: str