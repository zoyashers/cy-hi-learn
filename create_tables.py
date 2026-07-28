from app.core.db import Base, engine

# Import ALL models so SQLAlchemy registers them
from app.models.case_models import Case, Evidence, Task, Submission
from app.models.user_models import User
from app.models.assignment_models import CaseAssignment

print("Dropping all tables...")
Base.metadata.drop_all(bind=engine)

print("Creating all tables...")
Base.metadata.create_all(bind=engine)

print("Done.")
