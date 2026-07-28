from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from app.core.db import get_db
from app.core.auth import get_current_user
from app.models.activity_event import ActivityEvent

router = APIRouter(prefix="/analyst/activity", tags=["Activity"])


@router.get("/heatmap")
def get_heatmap(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    events = (
        db.query(ActivityEvent)
        .filter(ActivityEvent.user_id == current_user.id)
        .all()
    )

    heatmap = {}

    for e in events:
        day = e.created_at.date().isoformat()
        heatmap[day] = heatmap.get(day, 0) + 1

    return {"heatmap": heatmap}
