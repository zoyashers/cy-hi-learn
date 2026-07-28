from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Case, Evidence
from app.auth import lecturer_only

router = APIRouter(prefix="/lecturer", tags=["Lecturer"])


# ---------------------------------------------------------
# 1. GET ALL STUDENTS
# ---------------------------------------------------------
@router.get("/students")
def get_students(db: Session = Depends(get_db), user=Depends(lecturer_only)):
    students = db.query(User).filter(User.role == "student").all()

    return [
        {
            "id": s.id,
            "name": s.name,
            "email": s.email,
            "created_at": s.created_at,
        }
        for s in students
    ]


# ---------------------------------------------------------
# 2. GET ALL CASES FOR A STUDENT
# ---------------------------------------------------------
@router.get("/students/{student_id}/cases")
def get_student_cases(
    student_id: int,
    db: Session = Depends(get_db),
    user=Depends(lecturer_only)
):
    cases = db.query(Case).filter(Case.student_id == student_id).all()

    return [
        {
            "id": c.id,
            "title": c.title,
            "description": c.description,
            "created_at": c.created_at,
        }
        for c in cases
    ]


# ---------------------------------------------------------
# 3. GET CASE INFO (LECTURER VIEW)
# ---------------------------------------------------------
@router.get("/cases/{case_id}")
def get_case_info(
    case_id: int,
    db: Session = Depends(get_db),
    user=Depends(lecturer_only)
):
    case = db.query(Case).filter(Case.id == case_id).first()

    if not case:
        raise HTTPException(status_code=404, detail="Case not found")

    return {
        "id": case.id,
        "title": case.title,
        "description": case.description,
        "student_id": case.student_id,
        "created_at": case.created_at,
    }


# ---------------------------------------------------------
# 4. GET ALL EVIDENCE FOR A CASE
# ---------------------------------------------------------
@router.get("/cases/{case_id}/evidence")
def get_case_evidence(
    case_id: int,
    db: Session = Depends(get_db),
    user=Depends(lecturer_only)
):
    evidence = db.query(Evidence).filter(Evidence.case_id == case_id).all()

    return [
        {
            "id": e.id,
            "filename": e.filename,
            "filetype": e.filetype,
            "sha256": e.sha256,
            "size_bytes": e.size_bytes,
            "parent_evidence_id": e.parent_evidence_id,
            "created_at": e.created_at,
        }
        for e in evidence
    ]


# ---------------------------------------------------------
# 5. OPTIONAL: LECTURER ANALYTICS (STUDENTS + CASES + EVIDENCE COUNT)
# ---------------------------------------------------------
@router.get("/analytics")
def lecturer_analytics(
    db: Session = Depends(get_db),
    user=Depends(lecturer_only)
):
    total_students = db.query(User).filter(User.role == "student").count()
    total_cases = db.query(Case).count()
    total_evidence = db.query(Evidence).count()

    return {
        "total_students": total_students,
        "total_cases": total_cases,
        "total_evidence": total_evidence,
    }
