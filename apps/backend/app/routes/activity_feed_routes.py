from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.core.auth import get_current_user
from app.models.activity_event import ActivityEvent
from app.models.user_models import User

router = APIRouter(prefix="/analyst/activity", tags=["Activity"])


@router.get("/feed")
def get_activity_feed(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    events = (
        db.query(ActivityEvent)
        .filter(ActivityEvent.user_id == current_user.id)
        .order_by(ActivityEvent.created_at.desc())
        .limit(20)
        .all()
    )

    return {
        "events": [
            {
                "type": e.type,
                "description": e.description,
                "timestamp": e.created_at.isoformat()
            }
            for e in events
        ]
    }
