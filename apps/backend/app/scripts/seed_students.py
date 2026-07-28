import asyncio
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.core.db import engine
from app.models.user_models import User
from app.core.auth import hash_password


STUDENTS = [
    {"email": "student1@example.com", "password": "Student123!"},
    {"email": "student2@example.com", "password": "Student123!"},
    {"email": "student3@example.com", "password": "Student123!"},
    {"email": "student4@example.com", "password": "Student123!"},
]


async def seed_students():
    async with AsyncSession(engine) as session:
        for stu in STUDENTS:
            result = await session.exec(select(User).where(User.email == stu["email"]))
            existing = result.first()

            if existing:
                print(f"Student already exists: {stu['email']}")
                continue

            user = User(
                email=stu["email"],
                hashed_password=hash_password(stu["password"]),
                role="student",
            )

            session.add(user)

        await session.commit()
        print("Student seeding complete.")


if __name__ == "__main__":
    asyncio.run(seed_students())
