from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date

from app.core.db import get_db
from app.core.auth import get_current_user
from app.models.user_models import User
from app.models.case_models import Case
from app.models.evidence import Evidence
from app.models.score import Score
from app.models.timeline_models import TimelineEvent
from app.models.case_models import CaseNote
from app.models.report import Report

from app.schemas.ai import AIRequest
from app.schemas.scoring import FindingsSubmission
from app.schemas.case_note import CaseNoteCreate
from app.schemas.evidence import EvidenceTagUpdate

from app.services.ai_service import ask_ai
from app.services.scoring_service import score_findings
from app.services.report_service import generate_case_report
from app.services.xp_service import award_xp
from app.services.badge_service import check_badges
from app.services.badge_stats import build_user_stats
from app.services.activity_service import log_event

router = APIRouter(prefix="/analyst", tags=["Analyst"])


def analyst_required(user: User):
    if user.role not in ["analyst", "admin"]:
        raise HTTPException(403, "Analyst access required")
    return user


# ---------------------------------------------------------
# PROFILE
# ---------------------------------------------------------

@router.get("/profile")
def get_profile(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return {
        "xp": current_user.xp,
        "level": current_user.level_reached,
        "streak_days": current_user.streak_days,
        "longest_streak": current_user.longest_streak,
    }


# ---------------------------------------------------------
# CASE SUBMISSION
# ---------------------------------------------------------

@router.post("/cases/{case_id}/submit")
def submit_findings(
    case_id: int,
    submission: FindingsSubmission,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    analyst_required(current_user)

    case = db.query(Case).filter(Case.id == case_id).first()
    if not case:
        raise HTTPException(404, "Case not found")

    score_value, feedback = score_findings(case.answer_key, submission.findings)

    score = Score(
        case_id=case_id,
        user_id=current_user.id,
        score=score_value,
        feedback=feedback
    )
    db.add(score)

    current_user.cases_completed += 1
    if score_value >= 80:
        current_user.high_scores += 1

    db.commit()
    db.refresh(score)

    xp_result = award_xp(db, current_user.id, 50, "Submitted findings")

    log_event(db, current_user.id, "case_submitted", f"Submitted findings (Score: {score_value})")

    stats = build_user_stats(current_user)
    unlocked = check_badges(db, current_user.id, stats)

    return {
        "score": score_value,
        "feedback": feedback,
        "xp_awarded": 50,
        "level_up": bool(xp_result and xp_result["level_up"]),
        "badges_unlocked": [b.name for b in unlocked] if unlocked else []
    }


# ---------------------------------------------------------
# AI HELPER
# ---------------------------------------------------------

@router.post("/ai")
async def ai_helper(
    request: AIRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    analyst_required(current_user)

    answer = await ask_ai(request.case_id, request.question)

    current_user.ai_uses += 1
    db.commit()

    xp_result = award_xp(db, current_user.id, 2, "Used AI helper")

    log_event(db, current_user.id, "ai_use", f"Asked AI: {request.question[:40]}...")

    stats = build_user_stats(current_user)
    unlocked = check_badges(db, current_user.id, stats)

    return {
        "answer": answer,
        "xp_awarded": 2,
        "level_up": bool(xp_result and xp_result["level_up"]),
        "badges_unlocked": [b.name for b in unlocked] if unlocked else []
    }


# ---------------------------------------------------------
# NOTES
# ---------------------------------------------------------

@router.post("/cases/{case_id}/notes")
def add_case_note(
    case_id: int,
    note: CaseNoteCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    analyst_required(current_user)

    new_note = CaseNote(
        case_id=case_id,
        user_id=current_user.id,
        content=note.content
    )
    db.add(new_note)

    current_user.notes_added += 1
    db.commit()
    db.refresh(new_note)

    xp_result = award_xp(db, current_user.id, 5, "Added case note")

    log_event(db, current_user.id, "note_added", "Added a case note")

    stats = build_user_stats(current_user)
    unlocked = check_badges(db, current_user.id, stats)

    return {
        "message": "Note added",
        "note": new_note,
        "xp_awarded": 5,
        "level_up": bool(xp_result and xp_result["level_up"]),
        "badges_unlocked": [b.name for b in unlocked] if unlocked else []
    }


# ---------------------------------------------------------
# EVIDENCE TAGGING
# ---------------------------------------------------------

@router.post("/cases/{case_id}/evidence/{evidence_id}/tag")
def update_evidence_tag(
    case_id: int,
    evidence_id: int,
    payload: EvidenceTagUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    analyst_required(current_user)

    ev = db.query(Evidence).filter(Evidence.id == evidence_id, Evidence.case_id == case_id).first()
    if not ev:
        raise HTTPException(404, "Evidence not found")

    ev.tag = payload.tag

    current_user.evidence_tags += 1
    db.commit()

    xp_result = award_xp(db, current_user.id, 10, "Tagged evidence")

    log_event(db, current_user.id, "evidence_tag", f"Tagged evidence: {payload.tag}")

    stats = build_user_stats(current_user)
    unlocked = check_badges(db, current_user.id, stats)

    return {
        "message": "Tag updated",
        "tag": ev.tag,
        "xp_awarded": 10,
        "level_up": bool(xp_result and xp_result["level_up"]),
        "badges_unlocked": [b.name for b in unlocked] if unlocked else []
    }


# ---------------------------------------------------------
# REPORT GENERATION
# ---------------------------------------------------------

@router.post("/cases/{case_id}/report")
async def generate_report(
    case_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    analyst_required(current_user)

    case = db.query(Case).filter(Case.id == case_id).first()
    evidence = db.query(Evidence).filter(Evidence.case_id == case_id).all()
    timeline = db.query(TimelineEvent).filter(TimelineEvent.case_id == case_id).all()
    score = db.query(Score).filter(Score.case_id == case_id, Score.user_id == current_user.id).first()

    findings = score.feedback if score else "No findings submitted."

    report_text = await generate_case_report(case, evidence, timeline, findings, score)

    report = Report(
        case_id=case_id,
        user_id=current_user.id,
        content=report_text
    )
    db.add(report)

    current_user.reports_generated += 1
    db.commit()
    db.refresh(report)

    log_event(db, current_user.id, "report_generated", "Generated a case report")

    stats = build_user_stats(current_user)
    unlocked = check_badges(db, current_user.id, stats)

    return {
        "report_id": report.id,
        "content": report_text,
        "badges_unlocked": [b.name for b in unlocked] if unlocked else []
    }
