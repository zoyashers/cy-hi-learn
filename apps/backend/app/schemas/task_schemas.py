from datetime import datetime

from pydantic import BaseModel, ConfigDict



# -----------------------------
# TASK
# -----------------------------

class TaskBase(BaseModel):

    title: str

    description: str | None = None



class TaskCreate(TaskBase):

    case_id: int | None = None

    mission_id: int | None = None

    difficulty: str = "beginner"

    task_type: str = "analysis"



class TaskRead(TaskBase):

    id: int

    case_id: int | None

    mission_id: int | None

    difficulty: str

    task_type: str

    xp_reward: int = 0

    created_at: datetime


    model_config = ConfigDict(
        from_attributes=True
    )



# -----------------------------
# SUBMISSIONS
# -----------------------------

class SubmissionBase(BaseModel):

    answer: str



class SubmissionCreate(SubmissionBase):

    task_id: int



class SubmissionOut(SubmissionBase):

    id: int

    task_id: int

    user_id: int

    submitted_at: datetime


    model_config = ConfigDict(
        from_attributes=True
    )



# -----------------------------
# SUBMISSION REVIEW
# -----------------------------

class SubmissionReview(BaseModel):

    score: int

    feedback: str | None = None

    approved: bool = False



# Backwards compatibility alias
TaskOut = TaskRead