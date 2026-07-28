import asyncio
from seed_admin import seed_admin
from seed_cases import seed_cases
from seed_events import seed_events

async def main():
    print("Running async seed scripts...")
    await seed_admin()
    await seed_cases()
    await seed_events()
    print("Seeding complete.")

if __name__ == "__main__":
    asyncio.run(main())
