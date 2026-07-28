from app.models.activity_event import ActivityEvent

def log_event(db, user_id: int, event_type: str, description: str):
    event = ActivityEvent(
        user_id=user_id,
        type=event_type,
        description=description
    )
    db.add(event)
    db.commit()
    return event
