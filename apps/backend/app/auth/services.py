from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.models.user_models import User
from app.auth.hashing import Hasher



async def create_user(
    session: AsyncSession,
    username: str,
    full_name: str,
    email: str,
    password: str,
    role: str = "student"
):

    hashed_pw = Hasher.get_password_hash(
        password
    )


    user = User(

        username=username,

        full_name=full_name,

        email=email,

        hashed_password=hashed_pw,

        role=role
    )


    session.add(user)

    await session.commit()

    await session.refresh(user)

    return user



async def authenticate_user(
    session: AsyncSession,
    email: str,
    password: str
):

    query = select(User).where(
        User.email == email
    )

    result = await session.exec(
        query
    )

    user = result.first()


    if not user:
        return None


    if not Hasher.verify_password(
        password,
        user.hashed_password
    ):
        return None


    return user