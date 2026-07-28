import asyncio
from app.core.db import async_session
from app.models.user_models import User
from app.auth.hashing import Hasher

async def create_admin():
    async with async_session() as session:
        admin = User(
            username="admin",
            email="admin@example.com",
            hashed_password=Hasher.get_password_hash("Admin123!"),
            role="admin"
        )

        session.add(admin)
        await session.commit()
        await session.refresh(admin)

        print("Admin created with ID:", admin.id)

if __name__ == "__main__":
    asyncio.run(create_admin())
