import asyncio
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.db import engine
from app.models.user_models import User
from app.core.auth import hash_password


LECTURERS = [
    {"email": "lecturer1@example.com", "password": "Lecturer123!"},
    {"email": "lecturer2@example.com", "password": "Lecturer123!"},
    {"email": "lecturer3@example.com", "password": "Lecturer123!"},
]


async def seed_lecturers():
    async with AsyncSession(engine) as session:
        for lec in LECTURERS:
            result = await session.exec(select(User).where(User.email == lec["email"]))
            existing = result.first()

            if existing:
                print(f"Lecturer already exists: {lec['email']}")
                continue

            user = User(
                email=lec["email"],
                hashed_password=hash_password(lec["password"]),
                role="lecturer",
            )

            session.add(user)

        await session.commit()
        print("Lecturer seeding complete.")


if __name__ == "__main__":
    asyncio.run(seed_lecturers())
