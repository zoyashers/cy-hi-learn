from sqlalchemy.orm import Session
from app.models.evidence import EvidenceAnalysis


def save_evidence_analysis(db: Session, evidence_id: int, summary: str, details_json: str):
    """
    Create or update the EvidenceAnalysis entry for a given evidence_id.
    """
    analysis = (
        db.query(EvidenceAnalysis)
        .filter(EvidenceAnalysis.evidence_id == evidence_id)
        .first()
    )

    if analysis:
        analysis.summary = summary
        analysis.details_json = details_json
    else:
        analysis = EvidenceAnalysis(
            evidence_id=evidence_id,
            summary=summary,
            details_json=details_json,
        )
        db.add(analysis)

    db.commit()
    db.refresh(analysis)
    return analysis


def get_evidence_analysis(db: Session, evidence_id: int):
    """
    Retrieve the analysis for a given evidence_id.
    """
    return (
        db.query(EvidenceAnalysis)
        .filter(EvidenceAnalysis.evidence_id == evidence_id)
        .first()
    )


def delete_evidence_analysis(db: Session, evidence_id: int):
    """
    Delete the analysis for a given evidence_id.
    """
    analysis = (
        db.query(EvidenceAnalysis)
        .filter(EvidenceAnalysis.evidence_id == evidence_id)
        .first()
    )

    if analysis:
        db.delete(analysis)
        db.commit()
        return True

    return False

