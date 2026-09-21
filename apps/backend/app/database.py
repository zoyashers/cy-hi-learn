import os
from dotenv import load_dotenv

load_dotenv()

from sqlmodel import SQLModel
from sqlmodel.ext.asyncio.session import AsyncSession

from sqlalchemy.ext.asyncio import (
    create_async_engine,
    async_sessionmaker
)


DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+asyncpg://postgres:postgres@db:5432/dfir"
)



engine = create_async_engine(
    DATABASE_URL,
    echo=True,
)



AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)



async def get_session():

    async with AsyncSessionLocal() as session:

        yield session




async def init_db():

    from app import models


    async with engine.begin() as conn:

        await conn.run_sync(
            SQLModel.metadata.create_all
        )