from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.models.activity_log import ActivityLog


async def log_activity(
    session: AsyncSession,
    user_id: int,
    action: str,
    description: str = "",
) -> ActivityLog:
    entry = ActivityLog(
        user_id=user_id,
        action=action,
        description=description,
    )

    session.add(entry)
    await session.commit()
    await session.refresh(entry)

    return entry


async def get_user_activity(
    session: AsyncSession,
    user_id: int,
):
    result = await session.exec(
        select(ActivityLog)
        .where(ActivityLog.user_id == user_id)
        .order_by(ActivityLog.created_at.desc())
    )

    return result.all()