from app.db import Base, engine

import app.models.user
import app.models.case
import app.models.evidence_models
import app.models.task_models
import app.models.progress_models
import app.models.score_models
import app.models.soc_event
import app.models.activity_models
import app.models.submission_models
import app.models.timeline

print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("Done.")
