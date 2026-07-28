from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from pydantic import BaseModel

from app.core.db import get_session
from app.core.security import get_current_user
from app.models.mission import Mission
from app.models.evidence import Evidence
from app.models.task import Task
from app.models.user_models import User

router = APIRouter()

@router.get("/{mission_id}/briefing")
def get_briefing(mission_id: int, session: Session = Depends(get_session)):
    mission = session.get(Mission, mission_id)
    if not mission:
        raise HTTPException(404, "Mission not found")
    return mission

@router.get("/{mission_id}/evidence")
def get_evidence(mission_id: int, session: Session = Depends(get_session)):
    return session.exec(select(Evidence).where(Evidence.mission_id == mission_id)).all()

@router.get("/{mission_id}/tasks")
def get_tasks(mission_id: int, session: Session = Depends(get_session)):
    return session.exec(select(Task).where(Task.mission_id == mission_id)).all()

class TaskSubmitRequest(BaseModel):
    answer: str

class TaskSubmitResponse(BaseModel):
    correct: bool
    score: int

@router.post("/{mission_id}/tasks/{task_id}/submit", response_model=TaskSubmitResponse)
def submit_task(
    mission_id: int,
    task_id: int,
    payload: TaskSubmitRequest,
    session: Session = Depends(get_session),
):
    task = session.get(Task, task_id)
    if not task or task.mission_id != mission_id:
        raise HTTPException(404, "Task not found")

    correct = payload.answer.strip().lower() == task.answer.strip().lower()
    score = task.points if correct else 0

    return TaskSubmitResponse(correct=correct, score=score)
