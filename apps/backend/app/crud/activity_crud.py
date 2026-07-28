from sqlalchemy.orm import Session
from app.models.activity_log import ActivityLog


def log_activity(db: Session, user_id: int, action: str, details: str = "") -> ActivityLog:
    entry = ActivityLog(
        user_id=user_id,
        action=action,
        details=details,
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry


def get_user_activity(db: Session, user_id: int):
    return (
        db.query(ActivityLog)
        .filter(ActivityLog.user_id == user_id)
        .order_by(ActivityLog.timestamp.desc())
        .all()
    )
