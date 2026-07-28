from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session

from app.schemas import EvidenceCreate, EvidenceOut
from app.crud import (
    create_evidence,
    get_evidence,
    get_all_evidence,
    delete_evidence,
    log_activity,
)
from app.api.deps import get_db
from app.api.role_deps import student_only, instructor_only

router = APIRouter(prefix="/evidence", tags=["Evidence"])


@router.post("/", response_model=EvidenceOut)
def upload_evidence(
    data: EvidenceCreate,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    user=Depends(student_only),
):
    saved = create_evidence(db, data, file)
    log_activity(db, user.id, "uploaded evidence")
    return saved


@router.get("/{evidence_id}", response_model=EvidenceOut)
def get_evidence_route(
    evidence_id: int,
    db: Session = Depends(get_db),
    user=Depends(student_only),
):
    evidence = get_evidence(db, evidence_id)
    if not evidence:
        raise HTTPException(status_code=404, detail="Evidence not found")
    return evidence


@router.get("/", response_model=list[EvidenceOut])
def list_evidence(
    db: Session = Depends(get_db),
    user=Depends(student_only),
):
    return get_all_evidence(db)


@router.delete("/{evidence_id}")
def delete_evidence_route(
    evidence_id: int,
    db: Session = Depends(get_db),
    user=Depends(instructor_only),
):
    deleted = delete_evidence(db, evidence_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Evidence not found")

    log_activity(db, user.id, "deleted evidence")
    return {"status": "deleted", "id": evidence_id}
