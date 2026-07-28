from sqlalchemy import select
from app.models.user_models import User
from app.auth.hashing import Hasher
from app.core.session import get_session

async def seed_admin():
    async for session in get_session():
        result = await session.execute(
            select(User).where(User.email == "admin@example.com")
        )
        existing = result.scalar_one_or_none()

        if existing:
            print("Admin already exists.")
            return

        admin = User(
            email="admin@example.com",
            hashed_password=Hasher.get_password_hash("Admin123!"),
            role="admin"
        )

        session.add(admin)
        await session.commit()
        print("Admin user created.")

