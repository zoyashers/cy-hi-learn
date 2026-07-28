from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.core.db import get_db
from app.core.auth import get_current_user
from app.models.user_models import User
from app.models.case_models import Case
from app.models.log import SystemLog
from app.models.anomaly import Anomaly
from app.services.timeline_service import add_timeline_event

router = APIRouter(prefix="/admin", tags=["Admin"])


def admin_required(current_user: User):
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )
    return current_user


# ---------------------------------------------------------
# GET ALL USERS
# ---------------------------------------------------------
@router.get("/users")
def get_all_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    admin_required(current_user)
    users = db.query(User).all()
    return {"count": len(users), "users": users}


# ---------------------------------------------------------
# GET ALL CASES
# ---------------------------------------------------------
@router.get("/cases")
def get_all_cases(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    admin_required(current_user)
    cases = db.query(Case).all()
    return {"count": len(cases), "cases": cases}


# ---------------------------------------------------------
# CREATE CASE
# ---------------------------------------------------------
class CaseCreate(BaseModel):
    title: str
    description: str
    answer_key: str | None = None


@router.post("/cases")
def create_case(
    payload: CaseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    admin_required(current_user)

    case = Case(
        title=payload.title,
        description=payload.description,
        status="open",
        answer_key=payload.answer_key,
    )
    db.add(case)
    db.commit()
    db.refresh(case)

    add_timeline_event(
        db,
        case_id=case.id,
        event_type="case_created",
        description=f"Case created: {case.title}",
        user_id=current_user.id,
    )

    return case


# ---------------------------------------------------------
# ASSIGN ANALYST
# ---------------------------------------------------------
@router.post("/cases/{case_id}/assign")
def assign_case(
    case_id: int,
    payload: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    admin_required(current_user)

    user_id = payload.get("user_id")
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        raise HTTPException(404, "Case not found")

    case.assigned_to = user_id
    db.commit()

    add_timeline_event(
        db,
        case_id=case_id,
        event_type="assignment",
        description=f"Case assigned to user {user_id}",
        user_id=current_user.id,
    )

    return {"message": "Case assigned"}


# ---------------------------------------------------------
# CHANGE STATUS
# ---------------------------------------------------------
@router.post("/cases/{case_id}/status")
def change_status(
    case_id: int,
    payload: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    admin_required(current_user)

    status_value = payload.get("status")
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        raise HTTPException(404, "Case not found")

    case.status = status_value
    db.commit()

    add_timeline_event(
        db,
        case_id=case_id,
        event_type="status_change",
        description=f"Status changed to {status_value}",
        user_id=current_user.id,
    )

    return {"message": "Status updated"}


# ---------------------------------------------------------
# DELETE CASE
# ---------------------------------------------------------
@router.post("/cases/{case_id}/delete")
def delete_case(
    case_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    admin_required(current_user)

    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        raise HTTPException(404, "Case not found")

    db.delete(case)
    db.commit()

    add_timeline_event(
        db,
        case_id=case_id,
        event_type="case_deleted",
        description="Case deleted by admin",
        user_id=current_user.id,
    )

    return {"message": "Case deleted"}


# ---------------------------------------------------------
# SYSTEM LOGS
# ---------------------------------------------------------
@router.get("/logs")
def get_system_logs(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    admin_required(current_user)
    logs = db.query(SystemLog).order_by(SystemLog.timestamp.desc()).all()
    return {"count": len(logs), "logs": logs}


# ---------------------------------------------------------
# ANOMALIES
# ---------------------------------------------------------
@router.get("/anomalies")
def get_anomalies(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    admin_required(current_user)
    anomalies = (
        db.query(Anomaly).order_by(Anomaly.created_at.desc()).all()
    )
    return {"count": len(anomalies), "anomalies": anomalies}
