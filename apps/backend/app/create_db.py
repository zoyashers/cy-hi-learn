import asyncio
from sqlmodel import SQLModel
from app.core.session import engine

# Import ALL models via the package so metadata is populated
import app.models  # <-- THIS is the key

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

if __name__ == "__main__":
    asyncio.run(init_db())

