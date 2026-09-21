from fastapi import APIRouter, Depends, HTTPException
from sqlmodel.ext.asyncio.session import AsyncSession

from app.database import get_session

from app.schemas import (
    TaskCreate,
    TaskOut,
    SubmissionCreate,
    SubmissionOut,
)

from app.crud.task_crud import (
    create_task,
    get_task,
    get_all_tasks,
    submit_task,
    get_task_submissions,
)

from app.api.auth_deps import get_current_user
from app.api.role_deps import student_only, instructor_only


router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"],
)


# =========================================================
# CREATE TASK
# =========================================================
# Lecturer/instructor/admin only.
#
# The client cannot create tasks anonymously or as a student.
# =========================================================

@router.post(
    "/",
    response_model=TaskOut,
)
async def create_task_route(
    data: TaskCreate,
    session: AsyncSession = Depends(get_session),
    user=Depends(instructor_only),
):
    return await create_task(
        session,
        data,
    )


# =========================================================
# GET SINGLE TASK
# =========================================================
# Any authenticated student/instructor/admin can view a task.
# =========================================================

@router.get(
    "/{task_id}",
    response_model=TaskOut,
)
async def get_task_route(
    task_id: int,
    session: AsyncSession = Depends(get_session),
    user=Depends(student_only),
):
    task = await get_task(
        session,
        task_id,
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found",
        )

    return task


# =========================================================
# GET ALL TASKS
# =========================================================
# Any authenticated student/instructor/admin can view tasks.
# =========================================================

@router.get(
    "/",
    response_model=list[TaskOut],
)
async def get_tasks(
    session: AsyncSession = Depends(get_session),
    user=Depends(student_only),
):
    return await get_all_tasks(
        session,
    )


# =========================================================
# SUBMIT TASK
# =========================================================
# IMPORTANT SECURITY CHANGE:
#
# user_id is NOT accepted from the client.
#
# Instead, it comes from the authenticated JWT:
#
#     user.id
#
# This prevents a student from submitting work on behalf
# of another user simply by changing user_id in the request.
# =========================================================

@router.post(
    "/submit",
    response_model=SubmissionOut,
)
async def submit_task_route(
    data: SubmissionCreate,
    session: AsyncSession = Depends(get_session),
    user=Depends(student_only),
):
    return await submit_task(
        session,
        data,
        user.id,
    )


# =========================================================
# GET TASK SUBMISSIONS
# =========================================================
# Students must NOT be able to request everyone else's
# submissions.
#
# Only instructors/admins can access this endpoint.
# =========================================================

@router.get(
    "/{task_id}/submissions",
    response_model=list[SubmissionOut],
)
async def submissions(
    task_id: int,
    session: AsyncSession = Depends(get_session),
    user=Depends(instructor_only),
):
    return await get_task_submissions(
        session,
        task_id,
    )
