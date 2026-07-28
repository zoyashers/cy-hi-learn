import os
from sqlalchemy.orm import Session

from app.models.evidence import Evidence
from app.core.file_utils import compute_sha256


def create_evidence_record(db: Session, file_path: str, file, case_id: int) -> Evidence:
    filesize = os.path.getsize(file_path)
    sha256 = compute_sha256(file_path)

    evidence = Evidence(
        filename=file.filename,
        filepath=file_path,
        filetype=file.content_type,
        filesize=filesize,
        sha256=sha256,
        case_id=case_id,
    )

    db.add(evidence)
    db.commit()
    db.refresh(evidence)
    return evidence
