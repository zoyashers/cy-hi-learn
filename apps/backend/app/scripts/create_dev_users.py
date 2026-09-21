import asyncio
import os

from sqlalchemy import select

from app.core.db import AsyncSessionLocal
from app.models.user_models import User
from app.auth.hashing import Hasher


USERS = [
    {
        "username": "lecturer",
        "email": "lecturer@cyhi.local",
        "first_name": "CY-HI",
        "last_name": "Lecturer",
        "password_env": "CYHI_LECTURER_PASSWORD",
        "role": "lecturer",
    },
    {
        "username": "admin",
        "email": "admin@cyhi.local",
        "first_name": "CY-HI",
        "last_name": "Admin",
        "password_env": "CYHI_ADMIN_PASSWORD",
        "role": "admin",
    },
]


async def main():
    async with AsyncSessionLocal() as session:

        for data in USERS:
            password = os.getenv(data["password_env"])

            if not password:
                raise RuntimeError(
                    f"Missing required environment variable: "
                    f"{data['password_env']}"
                )

            result = await session.execute(
                select(User).where(
                    (User.email == data["email"])
                    | (User.username == data["username"])
                )
            )

            existing = result.scalars().first()

            if existing:
                print(
                    f"Already exists: "
                    f"{existing.username} "
                    f"({existing.email}) "
                    f"[{existing.role}]"
                )
                continue

            user = User(
                username=data["username"],
                email=data["email"],
                first_name=data["first_name"],
                last_name=data["last_name"],
                hashed_password=Hasher.get_password_hash(password),
                role=data["role"],
                is_active=True,
                xp=0,
            )

            session.add(user)

            print(
                f"Creating {data['role']}: "
                f"{data['username']}"
            )

        await session.commit()

        print("Development users created successfully.")


if __name__ == "__main__":
    asyncio.run(main())