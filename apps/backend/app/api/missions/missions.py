import random
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.db import get_session
from app.api.auth_deps import get_current_user
from app.models.mission import Mission
from app.models.mission_completion import MissionCompletion
from app.models.user_models import User
from app.services.xp_service import award_xp_for_mission


router = APIRouter()


# ============================================================
# DIFFICULTY CONFIGURATION
# ============================================================

DIFFICULTY_CONFIG = {
    "easy": {
        "label": "EASY",
        "hint_count": 4,
        "multiplier": 0.75,
    },
    "medium": {
        "label": "MEDIUM",
        "hint_count": 3,
        "multiplier": 1.0,
    },
    "hard": {
        "label": "HARD",
        "hint_count": 2,
        "multiplier": 1.5,
    },
}


# ============================================================
# NORMALISE DIFFICULTY
# ============================================================

def normalise_difficulty(value: str | None) -> str:

    value = (value or "easy").lower().strip()

    aliases = {
        "beginner": "easy",
        "easy": "easy",
        "intermediate": "medium",
        "medium": "medium",
        "advanced": "hard",
        "hard": "hard",
    }

    return aliases.get(value, "easy")


# ============================================================
# SCENARIO GENERATOR
# ============================================================

def generate_scenario(
    mission: Mission,
    attempt_number: int,
):

    seed = random.randint(
        100000,
        999999999,
    )

    rng = random.Random(seed)

    difficulty = normalise_difficulty(
        mission.difficulty
    )

    generator = (
        mission.generator_type
        or "fundamental"
    )

    # --------------------------------------------------------
    # BINARY MATHEMATICS
    # --------------------------------------------------------

    if generator == "binary_arithmetic":

        scenarios = [
            "network capacity",
            "storage allocation",
            "memory analysis",
            "packet size",
            "forensic image blocks",
            "file size analysis",
        ]

        scenario_type = rng.choice(
            scenarios
        )

        if difficulty == "easy":

            value = rng.randint(
                8,
                63,
            )

            binary_value = bin(value)[2:]

            content = (
                f"An investigator is analysing "
                f"{scenario_type}. The system reports "
                f"the value as {binary_value} in binary. "
                f"Convert this value to decimal and "
                f"explain what the result means."
            )

            hints = [
                "Identify the number system being used.",
                "Write down the positional values.",
                "Start from the rightmost binary digit.",
                "Add the powers of two represented by the 1s.",
            ]

        elif difficulty == "medium":

            first = rng.randint(20, 120)
            second = rng.randint(5, 19)

            a = bin(first)[2:]
            b = bin(second)[2:]

            content = (
                f"During a {scenario_type} investigation, "
                f"an analyst finds two binary values: "
                f"{a} and {b}. Determine the decimal value "
                f"of each and calculate the difference. "
                f"Explain your reasoning."
            )

            hints = [
                "Convert both values before comparing them.",
                "Keep the positional values aligned.",
                "Check your decimal conversion before subtracting.",
            ]

        else:

            first = rng.randint(
                100,
                255,
            )

            second = rng.randint(
                20,
                99,
            )

            a = bin(first)[2:]
            b = bin(second)[2:]

            content = (
                f"You are reviewing evidence from a "
                f"{scenario_type} investigation. Two analysts "
                f"have interpreted the binary values {a} and "
                f"{b} differently. Determine the correct "
                f"decimal interpretation, calculate the "
                f"relationship between the values and explain "
                f"which interpretation is defensible."
            )

            hints = [
                "Check the positional value of every bit.",
                "Convert both values independently.",
            ]

        return {
            "seed": seed,
            "scenario_type": scenario_type,
            "content": content,
            "hints": hints,
        }

    # --------------------------------------------------------
    # GENERIC FUNDAMENTAL GENERATOR
    # --------------------------------------------------------

    scenario_types = [
        "workstation evidence",
        "network evidence",
        "file-system evidence",
        "system log evidence",
        "digital investigation evidence",
    ]

    scenario_type = rng.choice(
        scenario_types
    )

    content = (
        f"You are investigating {scenario_type}. "
        f"Apply the fundamental skill of "
        f"{mission.skill or mission.learning_unit or mission.title} "
        f"to determine what the evidence tells you. "
        f"Your conclusion must be supported by your reasoning."
    )

    hints = [
        "Identify the fundamental concept being tested.",
        "Separate the useful evidence from the background information.",
        "Apply the concept before drawing your conclusion.",
        "Explain why your conclusion is supported.",
    ]

    return {
        "seed": seed,
        "scenario_type": scenario_type,
        "content": content,
        "hints": hints,
    }


# ============================================================
# GET ACTIVE MISSION TEMPLATES
# ============================================================

@router.get("/")
async def get_missions(
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user),
):

    result = await session.exec(
        select(Mission)
        .where(Mission.is_active == True)
        .order_by(Mission.learning_unit, Mission.difficulty, Mission.id)
    )

    missions = result.all()

    response = []

    for mission in missions:

        attempts_result = await session.exec(
            select(MissionCompletion)
            .where(
                MissionCompletion.user_id
                == current_user.id
            )
            .where(
                MissionCompletion.mission_id
                == mission.id
            )
        )

        attempts = attempts_result.all()

        completed_attempts = [
            attempt
            for attempt in attempts
            if attempt.completed
        ]

        in_progress = next(
            (
                attempt
                for attempt in attempts
                if not attempt.completed
            ),
            None,
        )

        if in_progress:

            status = "IN PROGRESS"
            progress = 50

        elif completed_attempts:

            status = "COMPLETED"
            progress = 100

        else:

            status = "AVAILABLE"
            progress = 0

        best_score = max(
            (
                attempt.score
                for attempt in completed_attempts
            ),
            default=0,
        )

        response.append(
            {
                "id": mission.id,
                "title": mission.title,
                "category": mission.category,
                "description": mission.description,
                "difficulty": normalise_difficulty(
                    mission.difficulty
                ),
                "xp_reward": mission.xp_reward,
                "badge_reward": mission.badge_reward,
                "learning_unit": mission.learning_unit,
                "skill": mission.skill,
                "is_active": mission.is_active,
                "created_at": mission.created_at,
                "status": status,
                "progress": progress,
                "score": best_score,
                "attempts": len(attempts),
            }
        )

    return response


# ============================================================
# GET SINGLE MISSION
# ============================================================

@router.get("/{mission_id}")
async def get_mission(
    mission_id: int,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user),
):

    mission = await session.get(
        Mission,
        mission_id,
    )

    if not mission or not mission.is_active:

        raise HTTPException(
            status_code=404,
            detail="Mission not found",
        )

    attempts_result = await session.exec(
        select(MissionCompletion)
        .where(
            MissionCompletion.user_id
            == current_user.id
        )
        .where(
            MissionCompletion.mission_id
            == mission.id
        )
        .order_by(
            MissionCompletion.attempt_number.desc()
        )
    )

    attempts = attempts_result.all()

    completed_attempts = [
        attempt
        for attempt in attempts
        if attempt.completed
    ]

    return {
        "id": mission.id,
        "title": mission.title,
        "category": mission.category,
        "description": mission.description,
        "difficulty": normalise_difficulty(
            mission.difficulty
        ),
        "xp_reward": mission.xp_reward,
        "badge_reward": mission.badge_reward,
        "learning_unit": mission.learning_unit,
        "skill": mission.skill,
        "is_active": mission.is_active,
        "status": (
            "COMPLETED"
            if completed_attempts
            else "AVAILABLE"
        ),
        "progress": (
            100
            if completed_attempts
            else 0
        ),
        "score": max(
            (
                attempt.score
                for attempt in completed_attempts
            ),
            default=0,
        ),
        "attempts": len(attempts),
    }


# ============================================================
# START A NEW GENERATED ATTEMPT
# ============================================================

@router.post(
    "/{mission_id}/start",
)
async def start_mission(
    mission_id: int,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user),
):

    mission = await session.get(
        Mission,
        mission_id,
    )

    if not mission or not mission.is_active:

        raise HTTPException(
            status_code=404,
            detail="Mission not found",
        )

    attempts_result = await session.exec(
        select(MissionCompletion)
        .where(
            MissionCompletion.user_id
            == current_user.id
        )
        .where(
            MissionCompletion.mission_id
            == mission.id
        )
        .order_by(
            MissionCompletion.attempt_number.desc()
        )
    )

    previous_attempts = attempts_result.all()

    # --------------------------------------------------------
    # DO NOT CREATE MULTIPLE OPEN ATTEMPTS
    # --------------------------------------------------------

    active_attempt = next(
        (
            attempt
            for attempt in previous_attempts
            if not attempt.completed
        ),
        None,
    )

    if active_attempt:

        return {
            "attempt_id": active_attempt.id,
            "mission_id": mission.id,
            "attempt_number": active_attempt.attempt_number,
            "title": active_attempt.generated_title
            or mission.title,
            "description": mission.description,
            "learning_unit": mission.learning_unit,
            "skill": mission.skill,
            "difficulty": normalise_difficulty(
                mission.difficulty
            ),
            "scenario_type": active_attempt.scenario_type,
            "generated_content": active_attempt.generated_content,
            "hints": [],
            "xp_reward": mission.xp_reward,
        }

    attempt_number = (
        len(previous_attempts) + 1
    )

    generated = generate_scenario(
        mission,
        attempt_number,
    )

    attempt = MissionCompletion(
        user_id=current_user.id,
        mission_id=mission.id,
        attempt_number=attempt_number,
        scenario_seed=generated["seed"],
        scenario_type=generated["scenario_type"],
        generated_title=mission.title,
        generated_content=generated["content"],
        score=0,
        hints_used=0,
        completed=False,
    )

    session.add(attempt)

    await session.commit()
    await session.refresh(attempt)

    return {
        "attempt_id": attempt.id,
        "mission_id": mission.id,
        "attempt_number": attempt.attempt_number,
        "title": mission.title,
        "description": mission.description,
        "learning_unit": mission.learning_unit,
        "skill": mission.skill,
        "difficulty": normalise_difficulty(
            mission.difficulty
        ),
        "scenario_type": generated["scenario_type"],
        "generated_content": generated["content"],
        "hints": generated["hints"],
        "xp_reward": mission.xp_reward,
    }


# ============================================================
# COMPLETE ATTEMPT
# ============================================================

class MissionCompleteRequest(BaseModel):

    score: int

    hints_used: int = 0


@router.post(
    "/attempts/{attempt_id}/complete",
)
async def complete_attempt(
    attempt_id: int,
    payload: MissionCompleteRequest,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user),
):

    attempt = await session.get(
        MissionCompletion,
        attempt_id,
    )

    if not attempt:

        raise HTTPException(
            status_code=404,
            detail="Mission attempt not found",
        )

    if attempt.user_id != current_user.id:

        raise HTTPException(
            status_code=403,
            detail="This attempt does not belong to you",
        )

    if attempt.completed:

        raise HTTPException(
            status_code=400,
            detail="This attempt has already been completed",
        )

    mission = await session.get(
        Mission,
        attempt.mission_id,
    )

    if not mission:

        raise HTTPException(
            status_code=404,
            detail="Mission not found",
        )

    attempt.score = max(
        0,
        min(100, payload.score),
    )

    attempt.hints_used = max(
        0,
        payload.hints_used,
    )

    attempt.completed = True
    attempt.completed_at = datetime.utcnow()

    session.add(attempt)

    await session.commit()
    await session.refresh(attempt)

    # --------------------------------------------------------
    # XP
    # --------------------------------------------------------

    completion, xp_awarded = await award_xp_for_mission(
        session=session,
        user=current_user,
        mission=mission,
        score=attempt.score,
    )

    return {
        "attempt_id": attempt.id,
        "mission_id": mission.id,
        "attempt_number": attempt.attempt_number,
        "completed": True,
        "score": attempt.score,
        "hints_used": attempt.hints_used,
        "xp_awarded": xp_awarded,
        "total_xp": current_user.xp,
        "level": current_user.level_id or 1,
        "rank": (
            current_user.level.name
            if current_user.level
            else "Digital Recruit"
        ),
    }