from fastapi import APIRouter, HTTPException
from sqlmodel import select
from app.models.task import Task
from app.schemas.task_schemas import TaskCreate, TaskRead, TaskUpdate
from app.core.session import async_session

router = APIRouter(prefix="/tasks", tags=["Tasks"])


@router.get("/", response_model=list[TaskRead])
async def list_tasks():
    async with async_session() as session:
        result = await session.exec(select(Task))
        return result.all()


@router.get("/{task_id}", response_model=TaskRead)
async def get_task(task_id: int):
    async with async_session() as session:
        task = await session.get(Task, task_id)
        if not task:
            raise HTTPException(404, "Task not found")
        return task


@router.post("/", response_model=TaskRead)
async def create_task(data: TaskCreate):
    async with async_session() as session:
        task = Task(**data.dict())
        session.add(task)
        await session.commit()
        await session.refresh(task)
        return task


@router.patch("/{task_id}", response_model=TaskRead)
async def update_task(task_id: int, data: TaskUpdate):
    async with async_session() as session:
        task = await session.get(Task, task_id)
        if not task:
            raise HTTPException(404, "Task not found")

        update_data = data.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(task, key, value)

        await session.commit()
        await session.refresh(task)
        return task


@router.delete("/{task_id}")
async def delete_task(task_id: int):
    async with async_session() as session:
        task = await session.get(Task, task_id)
        if not task:
            raise HTTPException(404, "Task not found")
        await session.delete(task)
        await session.commit()
        return {"message": "Task deleted"}
