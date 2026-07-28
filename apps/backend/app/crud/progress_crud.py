from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.models.xp import XP



async def get_user_xp(
    session:AsyncSession,
    user_id:int
):

    result = await session.exec(
        select(XP)
        .where(
            XP.user_id == user_id
        )
    )


    return result.first()



async def add_xp(
    session:AsyncSession,
    user_id:int,
    amount:int
):

    xp = await get_user_xp(
        session,
        user_id
    )


    if xp:

        xp.amount += amount


    else:

        xp = XP(
            user_id=user_id,
            amount=amount
        )

        session.add(xp)


    await session.commit()

    await session.refresh(xp)

    return xp



def get_user_level(
    total_xp:int
):

    if total_xp < 100:
        return 1

    if total_xp < 250:
        return 2

    if total_xp < 500:
        return 3

    if total_xp < 1000:
        return 4

    if total_xp < 2000:
        return 5

    return 6