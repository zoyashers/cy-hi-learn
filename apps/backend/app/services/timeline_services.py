from datetime import datetime

from app.models.timeline_models import TimelineEvent
from sqlalchemy.orm import Session


def add_timeline_event(
    db: Session,
    case_id: int,
    event: str,
    event_type: str = "general",
    description: str | None = None,
):
    timeline_event = TimelineEvent(
        case_id=case_id,
        event=event,
        event_type=event_type,
        description=description,
        timestamp=datetime.utcnow(),
    )

    db.add(timeline_event)
    db.commit()
    db.refresh(timeline_event)

    return timeline_event