import json
from sqlalchemy.orm import Session
from app.models.soc_event import SOCEvent


def create_soc_event(
    db: Session,
    case_id: int,
    evidence_id: int | None,
    severity: str,
    title: str,
    description: str,
    mitre_techniques: list[dict] | None = None,
    mitre_tactics: list[dict] | None = None,
) -> SOCEvent:

    event = SOCEvent(
        case_id=case_id,
        evidence_id=evidence_id,
        severity=severity,
        title=title,
        description=description,
        mitre_techniques=json.dumps(mitre_techniques or []),
        mitre_tactics=json.dumps(mitre_tactics or []),
    )

    db.add(event)
    db.commit()
    db.refresh(event)
    return event


def get_case_events(db: Session, case_id: int) -> list[SOCEvent]:
    return (
        db.query(SOCEvent)
        .filter(SOCEvent.case_id == case_id)
        .order_by(SOCEvent.created_at.desc())
        .all()
    )


def get_all_events(db: Session) -> list[SOCEvent]:
    return db.query(SOCEvent).order_by(SOCEvent.created_at.desc()).all()
