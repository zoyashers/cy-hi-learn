from sqlmodel.ext.asyncio.session import AsyncSession

from app.models.user_models import User


LEVEL_THRESHOLDS = [
    (1, 0),
    (2, 500),
    (3, 1200),
    (4, 2500),
    (5, 5000),
    (6, 9000),
    (7, 14000),
]


async def get_user_xp(
    session: AsyncSession,
    user_id: int,
):
    return await session.get(User, user_id)


async def add_xp(
    session: AsyncSession,
    user_id: int,
    amount: int,
):
    if amount <= 0:
        raise ValueError("XP amount must be greater than 0")

    user = await session.get(User, user_id)

    if not user:
        return None

    user.xp += amount

    session.add(user)

    await session.commit()
    await session.refresh(user)

    return user


def get_user_level(total_xp: int) -> int:
    level = 1

    for lvl, threshold in LEVEL_THRESHOLDS:
        if total_xp >= threshold:
            level = lvl
        else:
            break

    return level