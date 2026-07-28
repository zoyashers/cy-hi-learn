from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.crud import get_user_score, set_user_score, add_score
from app.api.deps import get_db
from app.api.role_deps import instructor_only, student_only

router = APIRouter(prefix="/scores", tags=["Scores"])


@router.get("/{user_id}")
def get_score_route(
    user_id: int,
    db: Session = Depends(get_db),
    user=Depends(student_only),
):
    return get_user_score(db, user_id)


@router.post("/{user_id}/set")
def set_score_route(
    user_id: int,
    value: int,
    db: Session = Depends(get_db),
    user=Depends(instructor_only),
):
    return set_user_score(db, user_id, value)


@router.post("/{user_id}/add")
def add_score_route(
    user_id: int,
    amount: int,
    db: Session = Depends(get_db),
    user=Depends(instructor_only),
):
    return add_score(db, user_id, amount)
