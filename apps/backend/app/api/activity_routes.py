from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession

from app.database import get_session
from app.crud.activity_crud import get_user_activity
from app.api.role_deps import student_only, instructor_only

router = APIRouter(
    prefix="/activity",
    tags=["Activity Logs"],
)


@router.get("/me")
async def my_activity(
    session: AsyncSession = Depends(get_session),
    user=Depends(student_only),
):
    return await get_user_activity(session, user.id)


@router.get("/user/{user_id}")
async def activity_for_user(
    user_id: int,
    session: AsyncSession = Depends(get_session),
    user=Depends(instructor_only),
):
    return await get_user_activity(session, user_id)