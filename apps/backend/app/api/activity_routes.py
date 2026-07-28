from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.crud import log_activity, get_user_activity
from app.api.deps import get_db
from app.api.role_deps import student_only, instructor_only, admin_only

router = APIRouter(prefix="/activity", tags=["Activity Logs"])


@router.get("/me")
def my_activity(
    db: Session = Depends(get_db),
    user=Depends(student_only),
):
    return get_user_activity(db, user.id)


@router.get("/user/{user_id}")
def activity_for_user(
    user_id: int,
    db: Session = Depends(get_db),
    user=Depends(instructor_only),
):
    return get_user_activity(db, user_id)


@router.get("/all")
def all_activity(
    db: Session = Depends(get_db),
    user=Depends(admin_only),
):
    # Admin sees everything
    return db.query(ActivityLog).order_by(ActivityLog.timestamp.desc()).all()
