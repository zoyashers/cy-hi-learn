from datetime import datetime

from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.models.user_models import User
from app.models.mission import Mission
from app.models.level import Level
from app.models.xp import XPEvent
from app.models.mission_completion import MissionCompletion


# ============================================================
# LEVEL THRESHOLDS
# ============================================================

LEVEL_THRESHOLDS = [
    (1, 0),
    (2, 500),
    (3, 1200),
    (4, 2500),
    (5, 5000),
    (6, 9000),
    (7, 14000),
]


# ============================================================
# RANK THRESHOLDS
# ============================================================

RANKS = [
    (0, "Digital Recruit"),
    (1000, "Digital Investigator"),
    (3000, "Evidence Analyst"),
    (7000, "Forensics Specialist"),
    (12000, "Incident Responder"),
    (20000, "Senior Investigator"),
]


# ============================================================
# LEVEL CALCULATION
# ============================================================

def calculate_level(xp: int) -> int:

    level = 1

    for lvl, threshold in LEVEL_THRESHOLDS:

        if xp >= threshold:
            level = lvl
        else:
            break

    return level


# ============================================================
# RANK CALCULATION
# ============================================================

def calculate_rank(xp: int) -> str:

    rank = "Digital Recruit"

    for threshold, name in RANKS:

        if xp >= threshold:
            rank = name
        else:
            break

    return rank


# ============================================================
# GET ATTEMPT COUNT
# ============================================================

async def get_attempt_count(
    session: AsyncSession,
    user_id: int,
    mission_id: int,
) -> int:

    result = await session.exec(
        select(MissionCompletion)
        .where(
            MissionCompletion.user_id == user_id
        )
        .where(
            MissionCompletion.mission_id == mission_id
        )
    )

    completions = result.all()

    return len(completions)


# ============================================================
# GET LATEST COMPLETION
# ============================================================

async def get_latest_completion(
    session: AsyncSession,
    user_id: int,
    mission_id: int,
):

    result = await session.exec(
        select(MissionCompletion)
        .where(
            MissionCompletion.user_id == user_id
        )
        .where(
            MissionCompletion.mission_id == mission_id
        )
        .order_by(
            MissionCompletion.attempt_number.desc()
        )
    )

    return result.first()


# ============================================================
# GET LEVEL
# ============================================================

async def get_level(
    session: AsyncSession,
    level_number: int,
):

    result = await session.exec(
        select(Level)
        .where(
            Level.level_number == level_number
        )
    )

    return result.first()


# ============================================================
# CREATE MISSION ATTEMPT
# ============================================================

async def create_mission_attempt(
    session: AsyncSession,
    user: User,
    mission: Mission,
    variant_key: str | None = None,
):

    attempt_number = (
        await get_attempt_count(
            session,
            user.id,
            mission.id,
        )
        + 1
    )

    completion = MissionCompletion(
        user_id=user.id,
        mission_id=mission.id,
        attempt_number=attempt_number,
        variant_key=variant_key,
        score=0,
        completed=False,
        hints_used=0,
        max_hints=3,
        xp_awarded=0,
        started_at=datetime.utcnow(),
    )

    session.add(completion)

    await session.commit()
    await session.refresh(completion)

    return completion


# ============================================================
# AWARD XP FOR SPECIFIC MISSION ATTEMPT
# ============================================================

async def award_xp_for_mission(
    session: AsyncSession,
    user: User,
    mission: Mission,
    attempt: MissionCompletion,
    score: int,
    hints_used: int = 0,
):
    """
    Complete a specific mission attempt and award XP once.

    XP is based on the mission reward.

    Hints reduce XP:
        1 hint  = -10 XP
        2 hints = -20 XP
        3 hints = -30 XP
        ...
        Maximum penalty = 50 XP

    The same attempt can never award XP twice.
    """

    # --------------------------------------------------------
    # SAFETY CHECK
    # --------------------------------------------------------

    if attempt.user_id != user.id:

        raise ValueError(
            "Mission attempt does not belong to this user."
        )

    if attempt.mission_id != mission.id:

        raise ValueError(
            "Mission attempt does not belong to this mission."
        )

    # --------------------------------------------------------
    # PREVENT DOUBLE XP
    # --------------------------------------------------------

    if attempt.completed:

        return attempt, 0

    # --------------------------------------------------------
    # NORMALISE SCORE
    # --------------------------------------------------------

    score = max(
        0,
        min(100, score),
    )

    hints_used = max(
        0,
        hints_used,
    )

    # --------------------------------------------------------
    # COMPLETE ATTEMPT
    # --------------------------------------------------------

    attempt.score = score

    attempt.hints_used = hints_used

    attempt.completed = True

    attempt.completed_at = datetime.utcnow()

    # --------------------------------------------------------
    # CALCULATE XP
    # --------------------------------------------------------

    xp_amount = mission.xp_reward

    if hints_used > 0:

        penalty = min(
            hints_used * 10,
            50,
        )

        xp_amount = max(
            0,
            xp_amount - penalty,
        )

    attempt.xp_awarded = xp_amount

    # --------------------------------------------------------
    # CREATE XP EVENT
    # --------------------------------------------------------

    xp_event = XPEvent(
        user_id=user.id,
        amount=xp_amount,
        event_type="mission_completed",
        description=(
            f"Mission attempt completed: "
            f"{mission.title} "
            f"(Attempt {attempt.attempt_number})"
        ),
    )

    session.add(xp_event)

    # --------------------------------------------------------
    # UPDATE USER XP
    # --------------------------------------------------------

    user.xp += xp_amount

    # --------------------------------------------------------
    # CALCULATE LEVEL
    # --------------------------------------------------------

    level_number = calculate_level(
        user.xp
    )

    level = await get_level(
        session,
        level_number,
    )

    if level is None:

        raise ValueError(
            f"Level {level_number} does not exist "
            "in the levels table."
        )

    user.level = level

    user.level_id = level.id

    # --------------------------------------------------------
    # SAVE EVERYTHING
    # --------------------------------------------------------

    session.add(attempt)
    session.add(user)
    session.add(xp_event)

    await session.commit()

    await session.refresh(user)
    await session.refresh(attempt)

    return attempt, xp_amount