from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.core.auth import get_current_user
from app.models.score import Score

router = APIRouter(prefix="/analyst/performance", tags=["Performance"])


@router.get("/scores")
def get_score_history(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    scores = (
        db.query(Score)
        .filter(Score.user_id == current_user.id)
        .order_by(Score.id.asc())
        .all()
    )

    return {
        "scores": [
            {"case_id": s.case_id, "score": s.score}
            for s in scores
        ]
    }
