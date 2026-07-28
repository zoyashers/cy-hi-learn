from pydantic import BaseModel, ConfigDict


# =====================================
# PROGRESS CREATION
# =====================================

class ProgressCreate(BaseModel):

    case_id: int

    user_id: int

    progress_percentage: float = 0

    completed_tasks: int = 0

    total_tasks: int = 0

    completed_evidence: int = 0

    total_evidence: int = 0

    status: str = "active"



# =====================================
# PROGRESS RESPONSE
# =====================================

class ProgressRead(BaseModel):

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