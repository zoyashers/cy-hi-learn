from sqlalchemy.orm import Session
from app.models import Evidence
from app.schemas import EvidenceCreate
import shutil
import os


UPLOAD_DIR = "uploaded_evidence"


def create_evidence(db: Session, data: EvidenceCreate, file):
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    evidence = Evidence(
        case_id=data.case_id,
        filename=file.filename,
        description=data.description,
        file_path=file_path,
    )

    db.add(evidence)
    db.commit()
    db.refresh(evidence)
    return evidence


def get_evidence(db: Session, evidence_id: int):
    return db.query(Evidence).filter(Evidence.id == evidence_id).first()


def get_all_evidence(db: Session):
    return db.query(Evidence).all()


def delete_evidence(db: Session, evidence_id: int):
    evidence = db.query(Evidence).filter(Evidence.id == evidence_id).first()
    if not evidence:
        return None

    if evidence.file_path and os.path.exists(evidence.file_path):
        try:
            os.remove(evidence.file_path)
        except Exception:
            pass

    db.delete(evidence)
    db.commit()
    return evidence
