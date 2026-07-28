#!/bin/bash

echo "🔥 Starting backend cleanup..."

BACKEND_DIR="apps/backend/app"

# 1. Fix incorrect imports in app/api/*.py
echo "🔧 Fixing incorrect imports in app/api/*.py..."

find "$BACKEND_DIR/app/api" -type f -name "*.py" | while read -r file; do
    sed -i \
        -e 's/from app.models.case_models import Evidence/from app.models.evidence_models import Evidence/g' \
        -e 's/from app.models.case_models import Task/from app.models.task_models import Task/g' \
        -e 's/from app.models.case_models import Submission/from app.models.submission_models import Submission/g' \
        "$file"
done

echo "✔ Import fixes applied."

# 2. Remove duplicate schema files (uppercase or misspelled)
echo "🧹 Removing duplicate schema files..."

find "$BACKEND_DIR/app/schemas" -type f \
    \( -name "*_Schemas.py" -o -name "user_scchemas.py" \) \
    -exec rm -v {} \;

echo "✔ Duplicate schemas removed."

# 3. Remove duplicate route files (lowercase duplicates)
echo "🧹 Removing duplicate route files..."

find "$BACKEND_DIR/app/routes" -type f \
    \( -name "assignments.py" -o -name "cases.py" -o -name "evidence.py" -o -name "submissions.py" -o -name "tasks.py" -o -name "users.py" \) \
    -exec rm -v {} \;

echo "✔ Duplicate routes removed."

# 4. Confirm cleanup
echo "🎉 Cleanup complete!"
echo "Now run: docker compose down && docker compose up --build -d"
