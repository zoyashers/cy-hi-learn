from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas import (
    CaseCreate,
    CaseOut,
    CaseNoteOut,
    CaseAssignmentOut,
    TimelineEventOut,
    ReportOut,
)
from app.crud import (
    create_case,
    get_case,
    get_all_cases,
    add_case_note,
    assign_case,
    add_timeline_event,
    add_report,
)
from app.api.deps import get_db
from app.api.auth_deps import get_current_user
from app.api.role_deps import instructor_only, student_only

from app.models.case import Case
from app.models.evidence_models import Evidence
from app.models.soc_event import SOCEvent
from app.models.timeline import TimelineEvent


router = APIRouter(prefix="/cases", tags=["Cases"])


# -----------------------------
# CASE CREATION
# -----------------------------
@router.post("/", response_model=CaseOut)
def create_case_route(
    data: CaseCreate,
    db: Session = Depends(get_db),
    user=Depends(instructor_only),
):
    return create_case(db, data)


# -----------------------------
# GET SINGLE CASE
# -----------------------------
@router.get("/{case_id}", response_model=CaseOut)
def get_case_route(
    case_id: int,
    db: Session = Depends(get_db),
    user=Depends(student_only),
):
    return get_case(db, case_id)


# -----------------------------
# GET ALL CASES
# -----------------------------
@router.get("/", response_model=list[CaseOut])
def get_all_cases_route(
    db: Session = Depends(get_db),
    user=Depends(student_only),
):
    return get_all_cases(db)


# -----------------------------
# ADD NOTE
# -----------------------------
@router.post("/{case_id}/notes", response_model=CaseNoteOut)
def add_note_route(
    case_id: int,
    content: str,
    db: Session = Depends(get_db),
    user=Depends(instructor_only),
):
    return add_case_note(db, case_id, content)


# -----------------------------
# ASSIGN CASE
# -----------------------------
@router.post("/{case_id}/assign", response_model=CaseAssignmentOut)
def assign_case_route(
    case_id: int,
    user_id: int,
    db: Session = Depends(get_db),
    user=Depends(instructor_only),
):
    return assign_case(db, case_id, user_id)


# -----------------------------
# ADD TIMELINE EVENT
# -----------------------------
@router.post("/{case_id}/timeline", response_model=TimelineEventOut)
def add_timeline_route(
    case_id: int,
    event: str,
    db: Session = Depends(get_db),
    user=Depends(instructor_only),
):
    return add_timeline_event(db, case_id, event)


# -----------------------------
# ADD REPORT
# -----------------------------
@router.post("/{case_id}/report", response_model=ReportOut)
def add_report_route(
    case_id: int,
    content: str,
    db: Session = Depends(get_db),
    user=Depends(instructor_only),
):
    return add_report(db, case_id, content)


# -----------------------------
# CASE DASHBOARD
# -----------------------------
@router.get("/{case_id}/dashboard")
def get_case_dashboard(
    case_id: int,
    db: Session = Depends(get_db),
    user=Depends(student_only),
):
    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")

    evidence = (
        db.query(Evidence)
        .filter(Evidence.case_id == case_id)
        .order_by(Evidence.uploaded_at.desc())
        .all()
    )

    soc_events = (
        db.query(SOCEvent)
        .filter(SOCEvent.case_id == case_id)
        .order_by(SOCEvent.created_at.desc())
        .all()
    )

    timeline = (
        db.query(TimelineEvent)
        .filter(TimelineEvent.case_id == case_id)
        .order_by(TimelineEvent.created_at.asc())
        .all()
    )

    return {
        "case": {
            "id": case.id,
            "title": case.title,
            "description": case.description,
            "created_by": case.created_by,
            "created_at": case.created_at,
        },
        "evidence": [
            {
                "id": e.id,
                "filename": e.filename,
                "filesize": e.filesize,
                "sha256": e.sha256,
                "uploaded_at": e.uploaded_at,
            }
            for e in evidence
        ],
        "soc_events": [
            {
                "id": s.id,
                "severity": s.severity,
                "title": s.title,
                "description": s.description,
                "created_at": s.created_at,
            }
            for s in soc_events
        ],
        "timeline": [
            {
                "id": t.id,
                "event": t.event,
                "created_at": t.created_at,
            }
            for t in timeline
        ],
    }
