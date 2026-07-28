from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from pydantic import BaseModel

from app.core.db import get_session
from app.core.security import get_current_user
from app.models.mission import Mission
from app.models.user_models import User
from app.services.xp_service import award_xp_for_mission

router = APIRouter()

class MissionCompleteRequest(BaseModel):
    score: int

class MissionCompleteResponse(BaseModel):
    mission_id: int
    completed: bool
    score: int
    xp_awarded: int
    total_xp: int
    level: int
    rank: str

@router.post("/{mission_id}/complete", response_model=MissionCompleteResponse)
def complete_mission(
    mission_id: int,
    payload: MissionCompleteRequest,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    mission = session.get(Mission, mission_id)
    if not mission:
        raise HTTPException(404, "Mission not found")

    prev_xp = current_user.xp

    completion, xp_awarded = award_xp_for_mission(
        session=session,
        user=current_user,
        mission=mission,
        score=payload.score,
    )

    return MissionCompleteResponse(
        mission_id=mission.id,
        completed=completion.completed,
        score=completion.score,
        xp_awarded=xp_awarded,
        total_xp=current_user.xp,
        level=current_user.level,
        rank=current_user.rank,
    )
