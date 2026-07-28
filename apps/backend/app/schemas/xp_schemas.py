from datetime import datetime

from pydantic import BaseModel, ConfigDict


# =====================================
# XP CREATION
# =====================================

class XPCreate(BaseModel):

    user_id: int

    amount: int

    reason: str | None = None



# =====================================
# XP RESPONSE
# =====================================

class XPRead(BaseModel):

    id: int

    user_id: int

    amount: int

    reason: str | None = None

    created_at: datetime


    model_config = ConfigDict(
        from_attributes=True
    )



# =====================================
# LEVEL RESPONSE
# =====================================

class LevelRead(BaseModel):

    level: int

    title: str

    required_xp: int


    model_config = ConfigDict(
        from_attributes=True
    )