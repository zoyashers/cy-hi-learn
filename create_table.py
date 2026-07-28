from app.core.db import Base, engine

# IMPORTANT: import all models so SQLAlchemy registers them
from app.models.case import Case
from app.models.task import Task
from app.models.evidence import Evidence
from app.models.submission import Submission
# Add any other models here

print("Dropping all tables...")
Base.metadata.drop_all(bind=engine)

print("Creating all tables...")
Base.metadata.create_all(bind=engine)

print("Done.")
