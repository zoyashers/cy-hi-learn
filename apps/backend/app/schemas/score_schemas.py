from datetime import datetime

from pydantic import BaseModel, ConfigDict


# =====================================
# SCORE CREATION
# =====================================

class ScoreCreate(BaseModel):

    user_id: int

    task_id: int | None = None

    value: int

    feedback: str | None = None



# =====================================
# SCORE RESPONSE
# =====================================

class ScoreRead(BaseModel):

    id: int

    user_id: int

    task_id: int | None = None

    value: int

    feedback: str | None = None

    created_at: datetime


    model_config = ConfigDict(
        from_attributes=True
    )