from fastapi import APIRouter, Depends
from sqlmodel import select
from app.dependencies import get_current_user
from app.core.db import async_session
from app.models.case_assignment import CaseAssignment
from app.models.case_models import Case
from app.models.evidence import Evidence
from app.models.task import Task
from app.models.submission_models import Submission
from app.models.caseprogress_models import CaseProgress
from app.services.grading_service import grade_submission

router = APIRouter(prefix="/api/student/case", tags=["Student Case Workflow"])


# ---------------------------------------------------------
# 1. GET ALL ASSIGNED CASES
# ---------------------------------------------------------
@router.get("/assigned")
async def get_assigned_cases(user=Depends(get_current_user)):
    async with async_session() as session:

        assignments = await session.exec(
            select(CaseAssignment).where(CaseAssignment.user_id == user.id)
        )
        assignments = assignments.all()

        case_ids = [a.case_id for a in assignments]

        cases = await session.exec(select(Case).where(Case.id.in_(case_ids)))
        cases = cases.all()

        return {"assigned_cases": cases}


# ---------------------------------------------------------
# 2. START A CASE (initializes progress)
# ---------------------------------------------------------
@router.post("/{case_id}/start")
async def start_case(case_id: int, user=Depends(get_current_user)):
    async with async_session() as session:

        # Check assignment
        assignment = await session.exec(
            select(CaseAssignment).where(
                CaseAssignment.user_id == user.id,
                CaseAssignment.case_id == case_id
            )
        )
        if not assignment.first():
            return {"error": "Case not assigned to this student."}

        # Check if progress exists
        progress = await session.exec(
            select(CaseProgress).where(
                CaseProgress.user_id == user.id,
                CaseProgress.case_id == case_id
            )
        )
        progress = progress.first()

        if not progress:
            progress = CaseProgress(
                user_id=user.id,
                case_id=case_id,
                completed_tasks=0
            )
            session.add(progress)
            await session.commit()

        return {"message": "Case started.", "case_id": case_id}


# ---------------------------------------------------------
# 3. GET CASE CONTENT (evidence + tasks + submissions)
# ---------------------------------------------------------
@router.get("/{case_id}")
async def get_case_content(case_id: int, user=Depends(get_current_user)):
    async with async_session() as session:

        # Case
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

        # Submissions
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
            "case": case,
            "evidence": evidence,
            "tasks": task_list
        }


# ---------------------------------------------------------
# 4. SUBMIT ANSWER (auto‑grading + progress update)
# ---------------------------------------------------------
@router.post("/{case_id}/task/{task_id}/submit")
async def submit_task_answer(case_id: int, task_id: int, answer: str, user=Depends(get_current_user)):
    async with async_session() as session:

        # Grade submission
        result = await grade_submission(
            task_id=task_id,
            student_answer=answer,
            user_id=user.id
        )

        # Update progress
        progress = await session.exec(
            select(CaseProgress).where(
                CaseProgress.user_id == user.id,
                CaseProgress.case_id == case_id
            )
        )
        progress = progress.first()

        if not progress:
            progress = CaseProgress(
                user_id=user.id,
                case_id=case_id,
                completed_tasks=1 if result["correct"] else 0
            )
            session.add(progress)
        else:
            # Count correct submissions
            tasks = await session.exec(
                select(Task).where(Task.case_id == case_id)
            )
            tasks = tasks.all()

            submissions = await session.exec(
                select(Submission).where(
                    Submission.user_id == user.id,
                    Submission.task_id.in_([t.id for t in tasks]),
                    Submission.correct == True
                )
            )
            correct_count = len(submissions.all())
            progress.completed_tasks = correct_count

        await session.commit()

        return {
            "message": "Answer submitted.",
            "grading_result": result
        }


# ---------------------------------------------------------
# 5. FINISH CASE (when all tasks correct)
# ---------------------------------------------------------
@router.post("/{case_id}/finish")
async def finish_case(case_id: int, user=Depends(get_current_user)):
    async with async_session() as session:

        # Get tasks
        tasks = await session.exec(
            select(Task).where(Task.case_id == case_id)
        )
        tasks = tasks.all()
        total = len(tasks)

        # Get correct submissions
        submissions = await session.exec(
            select(Submission).where(
                Submission.user_id == user.id,
                Submission.task_id.in_([t.id for t in tasks]),
                Submission.correct == True
            )
        )
        correct = len(submissions.all())

        if correct < total:
            return {
                "message": "Case not complete.",
                "completed_tasks": correct,
                "total_tasks": total
            }

        return {
            "message": "Case completed successfully!",
            "completed_tasks": correct,
            "total_tasks": total
        }
