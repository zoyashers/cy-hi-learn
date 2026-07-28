from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.crud import add_xp, get_user_xp, get_user_level
from app.api.deps import get_db
from app.api.role_deps import student_only, instructor_only

router = APIRouter(prefix="/progress", tags=["Progress"])


@router.post("/add-xp")
def add_xp_route(
    user_id: int,
    amount: int,
    db: Session = Depends(get_db),
    user=Depends(instructor_only),
):
    return add_xp(db, user_id, amount)


@router.get("/xp/{user_id}")
def get_user_xp_route(
    user_id: int,
    db: Session = Depends(get_db),
    user=Depends(student_only),
):
    return get_user_xp(db, user_id)


@router.get("/level/{user_id}")
def get_user_level_route(
    user_id: int,
    db: Session = Depends(get_db),
    user=Depends(student_only),
):
    return get_user_level(db, user_id)

