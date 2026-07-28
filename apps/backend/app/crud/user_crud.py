from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.models.user_models import User
from app.schemas.auth import RegisterRequest
from app.auth.hashing import Hasher



async def get_user_by_email(
    session: AsyncSession,
    email: str
):

    result = await session.exec(
        select(User)
        .where(User.email == email)
    )

    return result.first()



async def get_user(
    session: AsyncSession,
    user_id: int
):

    result = await session.exec(
        select(User)
        .where(User.id == user_id)
    )

    return result.first()



async def get_all_users(
    session: AsyncSession
):

    result = await session.exec(
        select(User)
    )

    return result.all()



async def create_user(
    session: AsyncSession,
    user: RegisterRequest
):

    hashed_password = Hasher.get_password_hash(
        user.password
    )


    db_user = User(

        username=user.username,

        full_name=user.full_name,

        email=user.email,

        hashed_password=hashed_password,

        role=user.role
    )


    session.add(db_user)

    await session.commit()

    await session.refresh(db_user)

    return db_user



async def delete_user(
    session: AsyncSession,
    user_id: int
):

    user = await get_user(
        session,
        user_id
    )


    if user:

        await session.delete(user)

        await session.commit()


    return user