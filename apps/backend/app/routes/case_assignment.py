from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlmodel import select
from app.dependencies import get_current_user
from app.core.db import async_session
from app.models.case_assignment import CaseAssignment
from app.models.user_models import User
from app.models.case_models import Case

router = APIRouter(prefix="/api/assignments", tags=["Case Assignment"])


# -----------------------------
# Request Model
# -----------------------------
class AssignmentRequest(BaseModel):
    student_id: int
    case_id: int


# -----------------------------
# 1. Assign Case to Student
# -----------------------------
@router.post("/assign")
async def assign_case(payload: AssignmentRequest, user=Depends(get_current_user)):
    if user.role != "lecturer":
        return {"error": "Access denied. Lecturer role required."}

    async with async_session() as session:

        # Validate student
        student = await session.exec(
            select(User).where(User.id == payload.student_id, User.role == "student")
        )
        student = student.first()
        if not student:
            return {"error": "Student not found."}

        # Validate case
        case = await session.exec(
            select(Case).where(Case.id == payload.case_id)
        )
        case = case.first()
        if not case:
            return {"error": "Case not found."}

        # Check if already assigned
        existing = await session.exec(
            select(CaseAssignment).where(
                CaseAssignment.user_id == payload.student_id,
                CaseAssignment.case_id == payload.case_id
            )
        )
        if existing.first():
            return {"message": "Case already assigned to this student."}

        # Create assignment
        assignment = CaseAssignment(
            user_id=payload.student_id,
            case_id=payload.case_id
        )
        session.add(assignment)
        await session.commit()
        await session.refresh(assignment)

        return {
            "message": "Case assigned successfully.",
            "assignment_id": assignment.id,
            "student_id": payload.student_id,
            "case_id": payload.case_id
        }


# -----------------------------
# 2. Unassign Case
# -----------------------------
@router.delete("/unassign")
async def unassign_case(payload: AssignmentRequest, user=Depends(get_current_user)):
    if user.role != "lecturer":
        return {"error": "Access denied."}

    async with async_session() as session:

        assignment = await session.exec(
            select(CaseAssignment).where(
                CaseAssignment.user_id == payload.student_id,
                CaseAssignment.case_id == payload.case_id
            )
        )
        assignment = assignment.first()

        if not assignment:
            return {"error": "Assignment not found."}

        await session.delete(assignment)
        await session.commit()

        return {"message": "Case unassigned successfully."}


# -----------------------------
# 3. View All Assignments
# -----------------------------
@router.get("/")
async def get_all_assignments(user=Depends(get_current_user)):
    if user.role != "lecturer":
        return {"error": "Access denied."}

    async with async_session() as session:
        assignments = await session.exec(select(CaseAssignment))
        assignments = assignments.all()

        return [
            {
                "assignment_id": a.id,
                "student_id": a.user_id,
                "case_id": a.case_id
            }
            for a in assignments
        ]


# -----------------------------
# 4. View Assignments for a Student
# -----------------------------
@router.get("/student/{student_id}")
async def get_student_assignments(student_id: int, user=Depends(get_current_user)):
    if user.role != "lecturer":
        return {"error": "Access denied."}

    async with async_session() as session:
        assignments = await session.exec(
            select(CaseAssignment).where(CaseAssignment.user_id == student_id)
        )
        assignments = assignments.all()

        return {
            "student_id": student_id,
            "assigned_cases": [a.case_id for a in assignments]
        }


# -----------------------------
# 5. View Students Assigned to a Case
# -----------------------------
@router.get("/case/{case_id}")
async def get_case_assignments(case_id: int, user=Depends(get_current_user)):
    if user.role != "lecturer":
        return {"error": "Access denied."}

    async with async_session() as session:
        assignments = await session.exec(
            select(CaseAssignment).where(CaseAssignment.case_id == case_id)
        )
        assignments = assignments.all()

        return {
            "case_id": case_id,
            "assigned_students": [a.user_id for a in assignments]
        }
