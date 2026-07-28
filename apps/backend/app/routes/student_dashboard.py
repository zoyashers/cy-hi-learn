from fastapi import APIRouter, Depends
from sqlmodel import select
from app.dependencies import get_current_user
from app.core.db import async_session
from app.models.case_models import Case
from app.models.evidence import Evidence
from app.models.task import Task
from app.models.submission_models import Submission
from app.models.caseprogress_models import CaseProgress
from app.models.case_assignment import CaseAssignment

router = APIRouter(prefix="/api/student", tags=["Student Dashboard"])


# ---------------------------------------------------------
# 1. STUDENT DASHBOARD OVERVIEW
# ---------------------------------------------------------
@router.get("/dashboard")
async def get_student_dashboard(user=Depends(get_current_user)):
    async with async_session() as session:

        # Get assigned cases
        assignments = await session.exec(
            select(CaseAssignment).where(CaseAssignment.user_id == user.id)
        )
        assignments = assignments.all()

        case_ids = [a.case_id for a in assignments]

        # Fetch case details
        cases = await session.exec(select(Case).where(Case.id.in_(case_ids)))
        cases = cases.all()

        dashboard = []

        for case in cases:
            # Total tasks
            tasks = await session.exec(
                select(Task).where(Task.case_id == case.id)
            )
            tasks = tasks.all()
            total_tasks = len(tasks)

            # Completed tasks
            progress = await session.exec(
                select(CaseProgress).where(
                    CaseProgress.user_id == user.id,
                    CaseProgress.case_id == case.id
                )
            )
            progress = progress.first()

            completed = progress.completed_tasks if progress else 0

            # Score
            score = (completed / total_tasks * 100) if total_tasks > 0 else 0

            # Status
            if completed == 0:
                status = "Not Started"
            elif completed < total_tasks:
                status = "In Progress"
            else:
                status = "Completed"

            dashboard.append({
                "case_id": case.id,
                "title": case.title,
                "description": case.description,
                "total_tasks": total_tasks,
                "completed_tasks": completed,
                "score_percent": round(score, 2),
                "status": status,
            })

        return {"student_id": user.id, "dashboard": dashboard}


# ---------------------------------------------------------
# 2. CASE DETAILS FOR STUDENT
# ---------------------------------------------------------
@router.get("/cases/{case_id}")
async def get_case_details(case_id: int, user=Depends(get_current_user)):
    async with async_session() as session:

        # Case info
        case = await session.exec(select(Case).where(Case.id == case_id))
        case = case.first()

        # Evidence
        evidence = await session.exec(
            select(Evidence).where(Evidence.case_id == case_id)
        )
        evidence = evidence.all()

        # Tasks
        tasks = await session.exec(
            select(Task).where(Task.case_id == case_id)
        )
        tasks = tasks.all()

        # Student submissions
        submissions = await session.exec(
            select(Submission).where(
                Submission.user_id == user.id,
                Submission.task_id.in_([t.id for t in tasks])
            )
        )
        submissions = submissions.all()

        submission_map = {s.task_id: s for s in submissions}

        task_list = []
        for t in tasks:
            sub = submission_map.get(t.id)
            task_list.append({
                "task_id": t.id,
                "title": t.title,
                "description": t.description,
                "submitted_answer": sub.student_answer if sub else None,
                "correct": sub.correct if sub else None,
            })

        return {
            "case_id": case.id,
            "title": case.title,
            "description": case.description,
            "evidence": evidence,
            "tasks": task_list,
        }


# ---------------------------------------------------------
# 3. STUDENT PROGRESS SUMMARY
# ---------------------------------------------------------
@router.get("/progress")
async def get_progress(user=Depends(get_current_user)):
    async with async_session() as session:

        progress_entries = await session.exec(
            select(CaseProgress).where(CaseProgress.user_id == user.id)
        )
        progress_entries = progress_entries.all()

        summary = []

        for p in progress_entries:
            # Total tasks for this case
            tasks = await session.exec(
                select(Task).where(Task.case_id == p.case_id)
            )
            tasks = tasks.all()
            total = len(tasks)

            score = (p.completed_tasks / total * 100) if total > 0 else 0

            summary.append({
                "case_id": p.case_id,
                "completed_tasks": p.completed_tasks,
                "total_tasks": total,
                "score_percent": round(score, 2),
            })

        return {"student_id": user.id, "progress": summary}
