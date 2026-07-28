from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.models import Task, Submission
from app.schemas import TaskCreate, SubmissionCreate



async def create_task(
    session: AsyncSession,
    data: TaskCreate
):

    task = Task(
        title=data.title,
        description=data.description,
        case_id=data.case_id,
        mission_id=data.mission_id,
    )


    session.add(task)

    await session.commit()

    await session.refresh(task)

    return task



async def get_task(
    session: AsyncSession,
    task_id: int
):

    result = await session.exec(
        select(Task)
        .where(Task.id == task_id)
    )

    return result.first()



async def get_all_tasks(
    session: AsyncSession
):

    result = await session.exec(
        select(Task)
    )

    return result.all()



async def submit_task(
    session: AsyncSession,
    data: SubmissionCreate
):

    submission = Submission(
        task_id=data.task_id,
        user_id=data.user_id,
        answer=data.answer,
    )


    session.add(submission)

    await session.commit()

    await session.refresh(submission)

    return submission



async def get_task_submissions(
    session: AsyncSession,
    task_id: int
):

    result = await session.exec(
        select(Submission)
        .where(
            Submission.task_id == task_id
        )
    )

    return result.all()