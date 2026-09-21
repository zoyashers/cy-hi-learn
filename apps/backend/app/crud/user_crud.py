from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.models.user_models import User
from app.schemas.auth import RegisterRequest
from app.auth.hashing import Hasher


# =====================================
# GET USER BY EMAIL
# =====================================

async def get_user_by_email(
    session: AsyncSession,
    email: str
):
    result = await session.exec(
        select(User).where(
            User.email == email
        )
    )

    return result.first()


# =====================================
# GET USER BY USERNAME
# =====================================

async def get_user_by_username(
    session: AsyncSession,
    username: str
):
    result = await session.exec(
        select(User).where(
            User.username == username
        )
    )

    return result.first()


# =====================================
# GET USER BY ID
# =====================================

async def get_user(
    session: AsyncSession,
    user_id: int
):
    result = await session.exec(
        select(User).where(
            User.id == user_id
        )
    )

    return result.first()


# =====================================
# GET ALL USERS
# =====================================

async def get_all_users(
    session: AsyncSession
):
    result = await session.exec(
        select(User)
    )

    return result.all()


# =====================================
# CREATE USER
# =====================================

async def create_user(
    session: AsyncSession,
    user: RegisterRequest
):

    hashed_password = Hasher.get_password_hash(
        user.password
    )

    db_user = User(
        username=user.username,
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        hashed_password=hashed_password,

        # Public registration ALWAYS creates
        # a student account.
        role="student",

        is_active=True,
    )

    session.add(db_user)

    await session.commit()

    await session.refresh(db_user)

    return db_user


# =====================================
# DELETE USER
# =====================================

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