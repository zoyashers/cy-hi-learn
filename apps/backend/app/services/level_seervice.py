from sqlalchemy.orm import Session
from app.models.user_models import User
from app.models.level_up import LevelUpEvent

LEVEL_THRESHOLDS = [
    (1, 0),
    (2, 200),
    (3, 500),
    (4, 1000),
    (5, 2000),
    (6, 3500),
    (7, 5000),
    (8, 7000),
    (9, 9000),
    (10, 12000),
]

def get_level_from_xp(xp: int) -> int:
    level = 1
    for lvl, threshold in LEVEL_THRESHOLDS:
        if xp >= threshold:
            level = lvl
        else:
            break
    return level

def get_next_level_xp(level: int):
    for lvl, threshold in LEVEL_THRESHOLDS:
        if lvl == level + 1:
            return threshold
    return None

def log_level_up_event(db: Session, user: User, new_level: int):
    event = LevelUpEvent(
        user_id=user.id,
        new_level=new_level,
    )
    db.add(event)
    db.commit()
    db.refresh(event)
    return event

def check_level_up(db: Session, user: User):
    xp = user.xp or 0
    new_level = get_level_from_xp(xp)

    last_event = (
        db.query(LevelUpEvent)
        .filter(LevelUpEvent.user_id == user.id)
        .order_by(LevelUpEvent.created_at.desc())
        .first()
    )

    last_level = last_event.new_level if last_event else 1

    if new_level > last_level:
        return log_level_up_event(db, user, new_level)

    return None
