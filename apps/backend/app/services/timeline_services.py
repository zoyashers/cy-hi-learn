from app.models.timeline import TimelineEvent
from sqlalchemy.orm import Session

def add_timeline_event(
    db: Session,
    case_id: int,
    event_type: str,
    description: str,
    user_id: int | None = None
):
    event = TimelineEvent(
        case_id=case_id,
        user_id=user_id,
        event_type=event_type,
        description=description
    )
    db.add(event)
    db.commit()
    db.refresh(event)
    return event
