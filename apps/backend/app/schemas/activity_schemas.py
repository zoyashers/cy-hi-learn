from datetime import datetime

from pydantic import BaseModel, ConfigDict


# =====================================
# ACTIVITY CREATION
# =====================================

class ActivityCreate(BaseModel):

    user_id: int

    action: str

    description: str | None = None

    category: str = "learning"



# =====================================
# ACTIVITY RESPONSE
# =====================================

class ActivityRead(BaseModel):

    id: int

    user_id: int

    action: str

    description: str | None = None

    category: str = "learning"

    created_at: datetime


    model_config = ConfigDict(
        from_attributes=True
    )