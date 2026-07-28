from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import select
from app.models.case_models import Case
from app.schemas.case_schemas import CaseCreate, CaseRead, CaseUpdate
from app.core.session import async_session
from app.core.roles import requires_role
router = APIRouter(prefix="/cases", tags=["Cases"])


@router.get("/", response_model=list[CaseRead])
async def list_cases():
    async with async_session() as session:
        result = await session.exec(select(Case))
        return result.all()


@router.get("/{case_id}", response_model=CaseRead)
async def get_case(case_id: int):
    async with async_session() as session:
        case = await session.get(Case, case_id)
        if not case:
            raise HTTPException(404, "Case not found")
        return case


@router.post("/", response_model=CaseRead)
async def create_case(data: CaseCreate):
    async with async_session() as session:
        case = Case(**data.dict())
        session.add(case)
        await session.commit()
        await session.refresh(case)
        return case


@router.patch("/{case_id}", response_model=CaseRead)
async def update_case(case_id: int, data: CaseUpdate):
    async with async_session() as session:
        case = await session.get(Case, case_id)
        if not case:
            raise HTTPException(404, "Case not found")

        update_data = data.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(case, key, value)

        await session.commit()
        await session.refresh(case)
        return case


@router.delete("/{case_id}")
async def delete_case(case_id: int):
    async with async_session() as session:
        case = await session.get(Case, case_id)
        if not case:
            raise HTTPException(404, "Case not found")
        await session.delete(case)
        await session.commit()
        return {"message": "Case deleted"}


@router.post("/", response_model=CaseRead)
async def create_case(
    data: CaseCreate,
    current_user = Depends(requires_role("lecturer"))
):
    ...
