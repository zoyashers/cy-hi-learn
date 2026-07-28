from app.core.db import Base, engine

from app.models.case_models import Case, Evidence, Task, Submission

print("Dropping all tables...")
Base.metadata.drop_all(bind=engine)

print("Creating all tables...")
Base.metadata.create_all(bind=engine)

print("Done.")
