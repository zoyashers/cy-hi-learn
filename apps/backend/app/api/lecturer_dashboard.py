from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_session
from app.models.user_models import User
from app.models.membership_models import Membership
from app.models.university_models import University
from app.models.mission_completion import MissionCompletion
from app.api.auth_deps import (
    get_current_user,
    require_roles,
)



router = APIRouter(
    prefix="/lecturer",
    tags=["lecturer"],
)


# =========================================================
# CURRENT LECTURER'S UNIVERSITY
# =========================================================

async def get_lecturer_membership(
    current_user: User = Depends(
        require_roles("lecturer")
    ),
    session: AsyncSession = Depends(get_session),
):

    if current_user.role != "lecturer":
        raise HTTPException(
            status_code=403,
            detail="Lecturer access required",
        )

    result = await session.execute(
        select(Membership)
        .where(
            Membership.user_id == current_user.id,
            Membership.role == "lecturer",
            Membership.verified == True,
        )
    )

    membership = result.scalar_one_or_none()

    if not membership:
        raise HTTPException(
            status_code=403,
            detail="Lecturer membership not found or not verified",
        )

    return membership

# =========================================================
# OVERVIEW
# =========================================================

@router.get("/overview")
async def lecturer_overview(
    membership: Membership = Depends(get_lecturer_membership),
    session: AsyncSession = Depends(get_session),
):

    student_ids_result = await session.execute(
        select(Membership.user_id)
        .where(
            Membership.university_id == membership.university_id,
            Membership.role == "student",
            Membership.verified == True,
        )
    )

    student_ids = student_ids_result.scalars().all()

    if not student_ids:
        return {
            "students": 0,
            "average_xp": 0,
            "total_completions": 0,
        }

    total_students_result = await session.execute(
        select(func.count(User.id))
        .where(User.id.in_(student_ids))
    )

    total_students = total_students_result.scalar() or 0

    avg_xp_result = await session.execute(
        select(func.coalesce(func.avg(User.xp), 0))
        .where(User.id.in_(student_ids))
    )

    avg_xp = avg_xp_result.scalar() or 0

    total_completions_result = await session.execute(
        select(func.count(MissionCompletion.id))
        .where(
            MissionCompletion.user_id.in_(student_ids),
            MissionCompletion.completed == True,
        )
    )

    total_completions = total_completions_result.scalar() or 0

    return {
        "students": total_students,
        "average_xp": int(avg_xp),
        "total_completions": total_completions,
    }


# =========================================================
# STUDENTS
# =========================================================

@router.get("/students")
async def lecturer_students(
    membership: Membership = Depends(get_lecturer_membership),
    session: AsyncSession = Depends(get_session),
):

    student_ids_result = await session.execute(
        select(Membership.user_id)
        .where(
            Membership.university_id == membership.university_id,
            Membership.role == "student",
            Membership.verified == True,
        )
    )

    student_ids = student_ids_result.scalars().all()

    if not student_ids:
        return []

    result = await session.execute(
        select(User)
        .where(User.id.in_(student_ids))
    )

    students = result.scalars().all()

    results = []

    for student in students:

        completed_result = await session.execute(
            select(func.count(MissionCompletion.id))
            .where(
                MissionCompletion.user_id == student.id,
                MissionCompletion.completed == True,
            )
        )

        completed = completed_result.scalar() or 0

        results.append(
            {
                "id": student.id,
                "username": student.username,
                "email": student.email,
                "first_name": student.first_name,
                "last_name": student.last_name,
                "xp": student.xp or 0,
                "level": student.level_id,
                "completed_missions": completed,
            }
        )

    return results


# =========================================================
# STUDENT DETAIL
# =========================================================

@router.get("/students/{student_id}")
async def get_student_detail(
    student_id: int,
    membership: Membership = Depends(get_lecturer_membership),
    session: AsyncSession = Depends(get_session),
):

    membership_result = await session.execute(
        select(Membership)
        .where(
            Membership.user_id == student_id,
            Membership.university_id == membership.university_id,
            Membership.role == "student",
            Membership.verified == True,
        )
    )

    student_membership = membership_result.scalar_one_or_none()

    if not student_membership:
        raise HTTPException(
            status_code=404,
            detail="Student not found in your university",
        )

    result = await session.execute(
        select(User)
        .where(User.id == student_id)
    )

    student = result.scalar_one_or_none()

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found",
        )

    completed_result = await session.execute(
        select(func.count(MissionCompletion.id))
        .where(
            MissionCompletion.user_id == student.id,
            MissionCompletion.completed == True,
        )
    )

    completed = completed_result.scalar() or 0

    return {
        "id": student.id,
        "username": student.username,
        "email": student.email,
        "first_name": student.first_name,
        "last_name": student.last_name,
        "xp": student.xp or 0,
        "level": student.level_id,
        "completed_missions": completed,
        "created_at": student.created_at,
    }