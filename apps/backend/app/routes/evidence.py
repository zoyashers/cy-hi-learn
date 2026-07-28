from fastapi import APIRouter, HTTPException
from sqlmodel import select
from app.models.evidence import Evidence
from app.schemas.evidence_schemas import EvidenceCreate, EvidenceRead, EvidenceUpdate
from app.core.session import async_session

router = APIRouter(prefix="/evidence", tags=["Evidence"])


@router.get("/", response_model=list[EvidenceRead])
async def list_evidence():
    async with async_session() as session:
        result = await session.exec(select(Evidence))
        return result.all()


@router.get("/{evidence_id}", response_model=EvidenceRead)
async def get_evidence(evidence_id: int):
    async with async_session() as session:
        evidence = await session.get(Evidence, evidence_id)
        if not evidence:
            raise HTTPException(404, "Evidence not found")
        return evidence


@router.post("/", response_model=EvidenceRead)
async def create_evidence(data: EvidenceCreate):
    async with async_session() as session:
        evidence = Evidence(**data.dict())
        session.add(evidence)
        await session.commit()
        await session.refresh(evidence)
        return evidence


@router.patch("/{evidence_id}", response_model=EvidenceRead)
async def update_evidence(evidence_id: int, data: EvidenceUpdate):
    async with async_session() as session:
        evidence = await session.get(Evidence, evidence_id)
        if not evidence:
            raise HTTPException(404, "Evidence not found")

        update_data = data.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(evidence, key, value)

        await session.commit()
        await session.refresh(evidence)
        return evidence


@router.delete("/{evidence_id}")
async def delete_evidence(evidence_id: int):
    async with async_session() as session:
        evidence = await session.get(Evidence, evidence_id)
        if not evidence:
            raise HTTPException(404, "Evidence not found")
        await session.delete(evidence)
        await session.commit()
        return {"message": "Evidence deleted"}
