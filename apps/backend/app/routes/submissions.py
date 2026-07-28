from fastapi import APIRouter, Depends
from pydantic import BaseModel
from app.services.grading_service import grade_submission
from app.dependencies import get_current_user

router = APIRouter(prefix="/api/submissions", tags=["Submissions"])


class SubmissionRequest(BaseModel):
    task_id: int
    answer: str


@router.post("/")
async def submit_answer(payload: SubmissionRequest, user=Depends(get_current_user)):
    """
    Student submits an answer to a task.
    Auto-grading is performed and correctness is returned.
    """
    result = await grade_submission(
        task_id=payload.task_id,
        student_answer=payload.answer,
        user_id=user.id,
    )
    return {
        "message": "Submission graded",
        "task_id": result["task_id"],
        "expected_answer": result["expected_answer"],
        "student_answer": result["student_answer"],
        "correct": result["correct"],
    }

