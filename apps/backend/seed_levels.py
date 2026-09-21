import asyncio
from sqlmodel import select
from app.database import AsyncSessionLocal
from app.models.level import Level

async def seed_levels():
    async with AsyncSessionLocal() as session:
        levels = [
            (1, "Digital Recruit", 0),
            (2, "Digital Investigator", 500),
            (3, "Evidence Analyst", 1200),
            (4, "Forensics Specialist", 2500),
            (5, "Incident Responder", 5000),
            (6, "Senior Investigator", 9000),
            (7, "Elite Investigator", 14000),
        ]

        for number, name, xp in levels:
            result = await session.exec(
                select(Level).where(Level.level_number == number)
            )

            if not result.first():
                session.add(
                    Level(
                        level_number=number,
                        name=name,
                        required_xp=xp,
                    )
                )

        await session.commit()
        print("Levels seeded successfully")

asyncio.run(seed_levels())
