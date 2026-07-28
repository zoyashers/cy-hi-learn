from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.core.auth import get_current_user
from app.models.badge import Badge

router = APIRouter(prefix="/analyst/badges", tags=["Badges"])


@router.get("/")
def get_badges(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    badges = db.query(Badge).all()

    return {
        "badges": [
            {"name": b.name, "description": b.description, "icon": b.icon}
            for b in badges
        ]
    }
