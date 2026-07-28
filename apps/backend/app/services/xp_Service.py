from datetime import datetime
from sqlmodel import Session, select

from app.models.user_models import User
from app.models.mission import Mission
from app.models.xp import XPEvent, MissionCompletion

LEVEL_THRESHOLDS = [
    (1, 0),
    (2, 500),
    (3, 1200),
    (4, 2500),
    (5, 5000),
    (6, 9000),
    (7, 14000),
]

RANKS = [
    (0, "Digital Recruit"),
    (1000, "Digital Investigator"),
    (3000, "Evidence Analyst"),
    (7000, "Forensics Specialist"),
    (12000, "Incident Responder"),
    (20000, "Senior Investigator"),
]

def calculate_level(xp: int) -> int:
    level = 1
    for lvl, threshold in LEVEL_THRESHOLDS:
        if xp >= threshold:
            level = lvl
        else:
            break
    return level

def calculate_rank(xp: int) -> str:
    rank = "Digital Recruit"
    for threshold, name in RANKS:
        if xp >= threshold:
            rank = name
        else:
            break
    return rank

def get_completion(session: Session, user_id: int, mission_id: int):
    return session.exec(
        select(MissionCompletion)
        .where(MissionCompletion.user_id == user_id)
        .where(MissionCompletion.mission_id == mission_id)
    ).first()

def award_xp_for_mission(session: Session, user: User, mission: Mission, score: int):
    existing = get_completion(session, user.id, mission.id)

    if existing and existing.completed:
        return existing, 0

    if not existing:
        completion = MissionCompletion(
            user_id=user.id,
            mission_id=mission.id,
            score=score,
            completed=True,
            completed_at=datetime.utcnow(),
        )
        session.add(completion)
    else:
        existing.score = score
        existing.completed = True
        existing.completed_at = datetime.utcnow()
        completion = existing

    xp_amount = mission.xp_reward

    xp_event = XPEvent(
        user_id=user.id,
        amount=xp_amount,
        reason=f"Mission completed: {mission.title}",
    )
    session.add(xp_event)

    user.xp += xp_amount
    user.level = calculate_level(user.xp)
    user.rank = calculate_rank(user.xp)

    session.commit()
    session.refresh(user)
    session.refresh(completion)

    return completion, xp_amount
