from fastapi import APIRouter, Depends

from sqlmodel.ext.asyncio.session import AsyncSession

from app.database import get_session

from app.schemas import (
    TaskCreate,
    TaskOut,
    SubmissionCreate,
    SubmissionOut
)

from app.crud.task_crud import (
    create_task,
    get_task,
    get_all_tasks,
    submit_task,
    get_task_submissions
)



router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)



@router.post("/")
async def create_task_route(
    data:TaskCreate,
    session:AsyncSession = Depends(get_session)
):

    return await create_task(
        session,
        data
    )



@router.get("/{task_id}")
async def get_task_route(
    task_id:int,
    session:AsyncSession = Depends(get_session)
):

    return await get_task(
        session,
        task_id
    )



@router.get("/")
async def get_tasks(
    session:AsyncSession = Depends(get_session)
):

    return await get_all_tasks(
        session
    )



@router.post("/submit")
async def submit_task_route(
    data:SubmissionCreate,
    session:AsyncSession = Depends(get_session)
):

    return await submit_task(
        session,
        data
    )



@router.get("/{task_id}/submissions")
async def submissions(
    task_id:int,
    session:AsyncSession = Depends(get_session)
):

    return await get_task_submissions(
        session,
        task_id
    )