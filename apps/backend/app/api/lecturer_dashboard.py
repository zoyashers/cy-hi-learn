
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select, func

from app.core.db import get_session
from app.models.user_models import User
from app.models.mission import Mission
from app.models.task import Task
from app.models.xp import MissionCompletion

router = APIRouter(prefix="/lecturer", tags=["lecturer"])


# ---------------------------------------------------------
# OVERVIEW
# ---------------------------------------------------------
@router.get("/overview")
def lecturer_overview(session: Session = Depends(get_session)):
    total_students = session.exec(
        select(func.count()).select_from(User).where(User.is_superuser == False)
    ).one()

    avg_xp = session.exec(
        select(func.coalesce(func.avg(User.xp), 0))
        .where(User.is_superuser == False)
    ).one()

    total_completions = session.exec(
        select(func.count())
        .select_from(MissionCompletion)
        .where(MissionCompletion.completed == True)
    ).one()

    return {
        "students": total_students,
        "average_xp": int(avg_xp),
        "total_completions": total_completions,
    }


# ---------------------------------------------------------
# STUDENT LIST
# ---------------------------------------------------------
@router.get("/students")
def lecturer_students(session: Session = Depends(get_session)):
    students = session.exec(
        select(User).where(User.is_superuser == False)
    ).all()

    result = []
    for s in students:
        completed_count = session.exec(
            select(func.count())
            .select_from(MissionCompletion)
            .where(MissionCompletion.user_id == s.id)
            .where(MissionCompletion.completed == True)
        ).one()

        result.append(
            {
                "id": s.id,
                "email": s.email,
                "xp": s.xp,
                "level": s.level,
                "rank": s.rank,
                "completed_missions": completed_count,
            }
        )

    return result


# ---------------------------------------------------------
# STUDENT DETAIL
# ---------------------------------------------------------
@router.get("/students/{student_id}")
def get_student_detail(student_id: int, session: Session = Depends(get_session)):
    student = session.get(User, student_id)

    if not student or student.is_superuser:
        raise HTTPException(404, "Student not found")

    return {
        "id": student.id,
        "email": student.email,
        "xp": student.xp,
        "level": student.level,
        "rank": student.rank,
        "created_at": student.created_at,
    }


# ---------------------------------------------------------
# STUDENT MISSION PERFORMANCE
# ---------------------------------------------------------
@router.get("/students/{student_id}/missions")
def get_student_missions(student_id: int, session: Session = Depends(get_session)):
    student = session.get(User, student_id)

    if not student or student.is_superuser:
        raise HTTPException(404, "Student not found")

    completions = session.exec(
        select(MissionCompletion)
        .where(MissionCompletion.user_id == student_id)
    ).all()

    results = []
    for c in completions:
        mission = session.get(Mission, c.mission_id)
        if mission:
            results.append(
                {
                    "mission_id": mission.id,
                    "mission_title": mission.title,
                    "score": c.score,
                    "completed": c.completed,
                    "completed_at": c.completed_at,
                }
            )

    return results


# ---------------------------------------------------------
# MISSION ANALYTICS
# ---------------------------------------------------------
@router.get("/missions")
def lecturer_missions(session: Session = Depends(get_session)):
    missions = session.exec(select(Mission)).all()
    data = []

    for m in missions:
        total = session.exec(
            select(func.count())
            .select_from(MissionCompletion)
            .where(MissionCompletion.mission_id == m.id)
        ).one()

        completed = session.exec(
            select(func.count())
            .select_from(MissionCompletion)
            .where(MissionCompletion.mission_id == m.id)
            .where(MissionCompletion.completed == True)
        ).one()

        avg_score = session.exec(
            select(func.coalesce(func.avg(MissionCompletion.score), 0))
            .where(MissionCompletion.mission_id == m.id)
        ).one()

        data.append(
            {
                "id": m.id,
                "title": m.title,
                "completion_rate": float(completed) / total * 100 if total else 0,
                "average_score": float(avg_score),
            }
        )

    return data


# ---------------------------------------------------------
# WEAKEST CONCEPTS
# ---------------------------------------------------------
@router.get("/analytics/weakest-concepts")
def weakest_concepts(session: Session = Depends(get_session)):
    tasks = session.exec(select(Task)).all()
    results = []

    for t in tasks:
        attempts = session.exec(
            select(func.count())
            .select_from(MissionCompletion)
            .where(MissionCompletion.mission_id == t.mission_id)
        ).one()

        fails = session.exec(
            select(func.count())
            .select_from(MissionCompletion)
            .where(MissionCompletion.mission_id == t.mission_id)
            .where(MissionCompletion.score < t.points)
        ).one()

        fail_rate = (fails / attempts * 100) if attempts else 0
        mission = session.get(Mission, t.mission_id)

        results.append(
            {
                "task_id": t.id,
                "question": t.question,
                "mission_title": mission.title if mission else "Unknown",
                "attempts": attempts,
                "fails": fails,
                "fail_rate": fail_rate,
            }
        )

    results.sort(key=lambda x: x["fail_rate"], reverse=True)
    return results


# ---------------------------------------------------------
# AT-RISK STUDENTS
# ---------------------------------------------------------
@router.get("/analytics/at-risk")
def at_risk_students(session: Session = Depends(get_session)):
    seven_days_ago = datetime.utcnow() - timedelta(days=7)

    students = session.exec(
        select(User).where(User.is_superuser == False)
    ).all()

    results = []

    for s in students:
        completed = session.exec(
            select(func.count())
            .select_from(MissionCompletion)
            .where(MissionCompletion.user_id == s.id)
            .where(MissionCompletion.completed == True)
        ).one()

        last_activity = session.exec(
            select(MissionCompletion.completed_at)
            .where(MissionCompletion.user_id == s.id)
            .order_by(MissionCompletion.completed_at.desc())
        ).first()

        inactive = (not last_activity) or (last_activity < seven_days_ago)

        risk_score = 0
        if s.xp < 500:
            risk_score += 1
        if completed < 3:
            risk_score += 1
        if inactive:
            risk_score += 1

        if risk_score >= 2:
            results.append(
                {
                    "id": s.id,
                    "email": s.email,
                    "xp": s.xp,
                    "completed_missions": completed,
                    "inactive": inactive,
                    "risk_score": risk_score,
                }
            )

    return results


# ---------------------------------------------------------
# TERM REPORT DATA
# ---------------------------------------------------------
@router.get("/reports/term")
def term_report_data(session: Session = Depends(get_session)):
    students = session.exec(
        select(User).where(User.is_superuser == False)
    ).all()

    student_data = []
    for s in students:
        completed = session.exec(
            select(func.count())
            .select_from(MissionCompletion)
            .where(MissionCompletion.user_id == s.id)
            .where(MissionCompletion.completed == True)
        ).one()

        student_data.append(
            {
                "id": s.id,
                "email": s.email,
                "xp": s.xp,
                "level": s.level,
                "rank": s.rank,
                "completed_missions": completed,
            }
        )

    weakest = weakest_concepts(session)
    at_risk = at_risk_students(session)

    return {
        "students": student_data,
        "weakest_concepts": weakest,
        "at_risk_students": at_risk,
    }
