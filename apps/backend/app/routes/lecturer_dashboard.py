from fastapi import APIRouter, Depends
from sqlmodel import select
from app.dependencies import get_current_user
from app.core.db import async_session
from app.models.user_models import User
from app.models.case_models import Case
from app.models.case_assignment import CaseAssignment
from app.models.caseprogress_models import CaseProgress
from app.models.task import Task
from app.models.submission_models import Submission

router = APIRouter(prefix="/api/lecturer", tags=["Lecturer Dashboard"])


# ---------------------------------------------------------
# 1. LECTURER OVERVIEW DASHBOARD
# ---------------------------------------------------------
@router.get("/dashboard")
async def lecturer_dashboard(user=Depends(get_current_user)):
    if user.role != "lecturer":
        return {"error": "Access denied. Lecturer role required."}

    async with async_session() as session:

        # Total students
        students = await session.exec(
            select(User).where(User.role == "student")
        )
        students = students.all()

        # Total cases
        cases = await session.exec(select(Case))
        cases = cases.all()

        # Total submissions
        submissions = await session.exec(select(Submission))
        submissions = submissions.all()

        # Total correct submissions
        correct = len([s for s in submissions if s.correct])

        return {
            "total_students": len(students),
            "total_cases": len(cases),
            "total_submissions": len(submissions),
            "correct_submissions": correct,
            "accuracy_percent": round((correct / len(submissions) * 100), 2)
            if submissions else 0,
        }


# ---------------------------------------------------------
# 2. VIEW ALL STUDENTS + THEIR ASSIGNED CASES
# ---------------------------------------------------------
@router.get("/students")
async def get_students(user=Depends(get_current_user)):
    if user.role != "lecturer":
        return {"error": "Access denied."}

    async with async_session() as session:
        students = await session.exec(
            select(User).where(User.role == "student")
        )
        students = students.all()

        result = []

        for s in students:
            assignments = await session.exec(
                select(CaseAssignment).where(CaseAssignment.user_id == s.id)
            )
            assignments = assignments.all()

            case_ids = [a.case_id for a in assignments]

            result.append({
                "student_id": s.id,
                "username": s.username,
                "assigned_cases": case_ids,
            })

        return result


# ---------------------------------------------------------
# 3. VIEW CASE PERFORMANCE (ALL STUDENTS)
# ---------------------------------------------------------
@router.get("/cases/{case_id}/performance")
async def case_performance(case_id: int, user=Depends(get_current_user)):
    if user.role != "lecturer":
        return {"error": "Access denied."}

    async with async_session() as session:

        # Fetch tasks for this case
        tasks = await session.exec(
            select(Task).where(Task.case_id == case_id)
        )
        tasks = tasks.all()
        task_ids = [t.id for t in tasks]

        # Fetch submissions for these tasks
        submissions = await session.exec(
            select(Submission).where(Submission.task_id.in_(task_ids))
        )
        submissions = submissions.all()

        # Group by student
        student_map = {}

        for sub in submissions:
            if sub.user_id not in student_map:
                student_map[sub.user_id] = {
                    "student_id": sub.user_id,
                    "total_tasks": len(tasks),
                    "submitted": 0,
                    "correct": 0,
                    "answers": []
                }

            student_map[sub.user_id]["submitted"] += 1
            if sub.correct:
                student_map[sub.user_id]["correct"] += 1

            student_map[sub.user_id]["answers"].append({
                "task_id": sub.task_id,
                "answer": sub.student_answer,
                "correct": sub.correct
            })

        # Convert to list
        performance = []
        for student_id, data in student_map.items():
            score = (data["correct"] / data["total_tasks"] * 100) if data["total_tasks"] else 0
            data["score_percent"] = round(score, 2)
            performance.append(data)

        return {
            "case_id": case_id,
            "total_students": len(performance),
            "performance": performance
        }


# ---------------------------------------------------------
# 4. VIEW INDIVIDUAL STUDENT PERFORMANCE
# ---------------------------------------------------------
@router.get("/students/{student_id}/performance")
async def student_performance(student_id: int, user=Depends(get_current_user)):
    if user.role != "lecturer":
        return {"error": "Access denied."}

    async with async_session() as session:

        # Fetch progress entries
        progress_entries = await session.exec(
            select(CaseProgress).where(CaseProgress.user_id == student_id)
        )
        progress_entries = progress_entries.all()

        result = []

        for p in progress_entries:
            # Total tasks for this case
            tasks = await session.exec(
                select(Task).where(Task.case_id == p.case_id)
            )
            tasks = tasks.all()
            total = len(tasks)

            score = (p.completed_tasks / total * 100) if total else 0

            result.append({
                "case_id": p.case_id,
                "completed_tasks": p.completed_tasks,
                "total_tasks": total,
                "score_percent": round(score, 2),
            })

        return {
            "student_id": student_id,
            "cases": result
        }


# ---------------------------------------------------------
# 5. VIEW ALL SUBMISSIONS (GLOBAL)
# ---------------------------------------------------------
@router.get("/submissions")
async def all_submissions(user=Depends(get_current_user)):
    if user.role != "lecturer":
        return {"error": "Access denied."}

    async with async_session() as session:
        submissions = await session.exec(select(Submission))
        submissions = submissions.all()

        return [
            {
                "submission_id": s.id,
                "student_id": s.user_id,
                "task_id": s.task_id,
                "answer": s.student_answer,
                "correct": s.correct,
            }
            for s in submissions
        ]
