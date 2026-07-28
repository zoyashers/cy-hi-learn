from fastapi import APIRouter, HTTPException
from sqlmodel import select
from app.models.case_assignment import CaseAssignment
from app.schemas.assignment_schemas import AssignmentCreate, AssignmentRead
from app.core.session import async_session

router = APIRouter(prefix="/assignments", tags=["Assignments"])


@router.get("/", response_model=list[AssignmentRead])
async def list_assignments():
    async with async_session() as session:
        result = await session.exec(select(CaseAssignment))
        return result.all()


@router.get("/{assignment_id}", response_model=AssignmentRead)
async def get_assignment(assignment_id: int):
    async with async_session() as session:
        assignment = await session.get(CaseAssignment, assignment_id)
        if not assignment:
            raise HTTPException(404, "Assignment not found")
        return assignment


@router.post("/", response_model=AssignmentRead)
async def create_assignment(data: AssignmentCreate):
    async with async_session() as session:
        assignment = CaseAssignment(**data.dict())
        session.add(assignment)
        await session.commit()
        await session.refresh(assignment)
        return assignment


@router.delete("/{assignment_id}")
async def delete_assignment(assignment_id: int):
    async with async_session() as session:
        assignment = await session.get(CaseAssignment, assignment_id)
        if not assignment:
            raise HTTPException(404, "Assignment not found")
        await session.delete(assignment)
        await session.commit()
        return {"message": "Assignment deleted"}
