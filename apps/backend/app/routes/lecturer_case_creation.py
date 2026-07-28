from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlmodel import select
from app.dependencies import get_current_user
from app.core.db import async_session
from app.models.case_models import Case
from app.models.evidence import Evidence
from app.models.task import Task

router = APIRouter(prefix="/api/lecturer/cases", tags=["Lecturer Case Creation"])


# ---------------------------------------------------------
# REQUEST MODELS
# ---------------------------------------------------------
class CaseCreateRequest(BaseModel):
    title: str
    description: str


class EvidenceCreateRequest(BaseModel):
    case_id: int
    filename: str
    description: str


class TaskCreateRequest(BaseModel):
    case_id: int
    title: str
    question: str
    answer: str


class CaseUpdateRequest(BaseModel):
    title: str | None = None
    description: str | None = None


class EvidenceUpdateRequest(BaseModel):
    filename: str | None = None
    description: str | None = None


class TaskUpdateRequest(BaseModel):
    title: str | None = None
    question: str | None = None
    answer: str | None = None


# ---------------------------------------------------------
# 1. CREATE A NEW CASE
# ---------------------------------------------------------
@router.post("/create")
async def create_case(payload: CaseCreateRequest, user=Depends(get_current_user)):
    if user.role != "lecturer":
        return {"error": "Access denied."}

    async with async_session() as session:
        case = Case(
            title=payload.title,
            description=payload.description
        )
        session.add(case)
        await session.commit()
        await session.refresh(case)

        return {
            "message": "Case created successfully.",
            "case_id": case.id,
            "title": case.title
        }


# ---------------------------------------------------------
# 2. ADD EVIDENCE TO A CASE
# ---------------------------------------------------------
@router.post("/evidence/add")
async def add_evidence(payload: EvidenceCreateRequest, user=Depends(get_current_user)):
    if user.role != "lecturer":
        return {"error": "Access denied."}

    async with async_session() as session:
        evidence = Evidence(
            case_id=payload.case_id,
            filename=payload.filename,
            description=payload.description
        )
        session.add(evidence)
        await session.commit()
        await session.refresh(evidence)

        return {
            "message": "Evidence added.",
            "evidence_id": evidence.id
        }


# ---------------------------------------------------------
# 3. ADD TASK TO A CASE
# ---------------------------------------------------------
@router.post("/tasks/add")
async def add_task(payload: TaskCreateRequest, user=Depends(get_current_user)):
    if user.role != "lecturer":
        return {"error": "Access denied."}

    async with async_session() as session:
        task = Task(
            case_id=payload.case_id,
            title=payload.title,
            description=f"Question: {payload.question}\nExpected answer: {payload.answer}"
        )
        session.add(task)
        await session.commit()
        await session.refresh(task)

        return {
            "message": "Task added.",
            "task_id": task.id
        }


# ---------------------------------------------------------
# 4. UPDATE CASE
# ---------------------------------------------------------
@router.put("/{case_id}/update")
async def update_case(case_id: int, payload: CaseUpdateRequest, user=Depends(get_current_user)):
    if user.role != "lecturer":
        return {"error": "Access denied."}

    async with async_session() as session:
        case = await session.exec(select(Case).where(Case.id == case_id))
        case = case.first()

        if not case:
            return {"error": "Case not found."}

        if payload.title:
            case.title = payload.title
        if payload.description:
            case.description = payload.description

        session.add(case)
        await session.commit()

        return {"message": "Case updated."}


# ---------------------------------------------------------
# 5. UPDATE EVIDENCE
# ---------------------------------------------------------
@router.put("/evidence/{evidence_id}/update")
async def update_evidence(evidence_id: int, payload: EvidenceUpdateRequest, user=Depends(get_current_user)):
    if user.role != "lecturer":
        return {"error": "Access denied."}

    async with async_session() as session:
        evidence = await session.exec(select(Evidence).where(Evidence.id == evidence_id))
        evidence = evidence.first()

        if not evidence:
            return {"error": "Evidence not found."}

        if payload.filename:
            evidence.filename = payload.filename
        if payload.description:
            evidence.description = payload.description

        session.add(evidence)
        await session.commit()

        return {"message": "Evidence updated."}


# ---------------------------------------------------------
# 6. UPDATE TASK
# ---------------------------------------------------------
@router.put("/tasks/{task_id}/update")
async def update_task(task_id: int, payload: TaskUpdateRequest, user=Depends(get_current_user)):
    if user.role != "lecturer":
        return {"error": "Access denied."}

    async with async_session() as session:
        task = await session.exec(select(Task).where(Task.id == task_id))
        task = task.first()

        if not task:
            return {"error": "Task not found."}

        # Extract existing question/answer
        import re
        match = re.search(r"Expected answer:\s*(.*)", task.description)
        existing_answer = match.group(1).strip() if match else ""

        match = re.search(r"Question:\s*(.*)\n", task.description)
        existing_question = match.group(1).strip() if match else ""

        new_question = payload.question or existing_question
        new_answer = payload.answer or existing_answer

        if payload.title:
            task.title = payload.title

        task.description = f"Question: {new_question}\nExpected answer: {new_answer}"

        session.add(task)
        await session.commit()

        return {"message": "Task updated."}


# ---------------------------------------------------------
# 7. DELETE CASE
# ---------------------------------------------------------
@router.delete("/{case_id}/delete")
async def delete_case(case_id: int, user=Depends(get_current_user)):
    if user.role != "lecturer":
        return {"error": "Access denied."}

    async with async_session() as session:
        case = await session.exec(select(Case).where(Case.id == case_id))
        case = case.first()

        if not case:
            return {"error": "Case not found."}

        await session.delete(case)
        await session.commit()

        return {"message": "Case deleted."}


# ---------------------------------------------------------
# 8. GET FULL CASE STRUCTURE (for editing UI)
# ---------------------------------------------------------
@router.get("/{case_id}")
async def get_case_full(case_id: int, user=Depends(get_current_user)):
    if user.role != "lecturer":
        return {"error": "Access denied."}

    async with async_session() as session:

        case = await session.exec(select(Case).where(Case.id == case_id))
        case = case.first()

        evidence = await session.exec(select(Evidence).where(Evidence.case_id == case_id))
        evidence = evidence.all()

        tasks = await session.exec(select(Task).where(Task.case_id == case_id))
        tasks = tasks.all()

        return {
            "case": case,
            "evidence": evidence,
            "tasks": tasks
        }
