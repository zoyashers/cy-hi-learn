from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

from app.core.config import settings

# Create the SQLAlchemy engine
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
)

# Create a session factory
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

def get_session() -> Session:
    """
    Dependency that provides a database session.
    Closes automatically after request.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
