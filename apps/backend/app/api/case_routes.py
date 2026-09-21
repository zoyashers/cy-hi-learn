from fastapi import APIRouter, Depends, HTTPException
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select

from app.database import get_session

from app.schemas import (
    CaseCreate,
    CaseOut,
    CaseNoteOut,
    CaseAssignmentOut,
    TimelineEventOut,
    ReportOut,
)

from app.crud.case_crud import (
    create_case,
    get_case,
    get_all_cases,
    add_case_note,
    assign_case,
    add_timeline_event,
    add_report,
)

from app.api.auth_deps import get_current_user
from app.api.role_deps import instructor_only, student_only

from app.models.case_models import Case
from app.models.evidence import Evidence
from app.models.soc_event import SOCEvent
from app.models.timeline_models import TimelineEvent


router = APIRouter(
    prefix="/cases",
    tags=["Cases"],
)


# =========================================================
# CREATE CASE
# =========================================================

@router.post(
    "/",
    response_model=CaseOut,
)
async def create_case_route(
    data: CaseCreate,
    session: AsyncSession = Depends(get_session),
    user=Depends(instructor_only),
):
    return await create_case(
        session,
        data,
    )


# =========================================================
# GET SINGLE CASE
# =========================================================

@router.get(
    "/{case_id}",
    response_model=CaseOut,
)
async def get_case_route(
    case_id: int,
    session: AsyncSession = Depends(get_session),
    user=Depends(student_only),
):
    case = await get_case(
        session,
        case_id,
    )

    if not case:
        raise HTTPException(
            status_code=404,
            detail="Case not found",
        )

    return case


# =========================================================
# GET ALL CASES
# =========================================================

@router.get(
    "/",
    response_model=list[CaseOut],
)
async def get_all_cases_route(
    session: AsyncSession = Depends(get_session),
    user=Depends(student_only),
):
    return await get_all_cases(session)


# =========================================================
# ADD CASE NOTE
# =========================================================

@router.post(
    "/{case_id}/notes",
    response_model=CaseNoteOut,
)
async def add_note_route(
    case_id: int,
    content: str,
    session: AsyncSession = Depends(get_session),
    user=Depends(instructor_only),
):
    return await add_case_note(
        session,
        case_id,
        user.id,
        content,
    )


# =========================================================
# ASSIGN CASE
# =========================================================

@router.post(
    "/{case_id}/assign",
    response_model=CaseAssignmentOut,
)
async def assign_case_route(
    case_id: int,
    user_id: int,
    session: AsyncSession = Depends(get_session),
    user=Depends(instructor_only),
):
    return await assign_case(
        session,
        case_id,
        user_id,
    )


# =========================================================
# ADD TIMELINE EVENT
# =========================================================

@router.post(
    "/{case_id}/timeline",
    response_model=TimelineEventOut,
)
async def add_timeline_route(
    case_id: int,
    event: str,
    session: AsyncSession = Depends(get_session),
    user=Depends(instructor_only),
):
    return await add_timeline_event(
        session,
        case_id,
        event,
    )


# =========================================================
# ADD REPORT
# =========================================================

@router.post(
    "/{case_id}/report",
    response_model=ReportOut,
)
async def add_report_route(
    case_id: int,
    content: str,
    session: AsyncSession = Depends(get_session),
    user=Depends(instructor_only),
):
    return await add_report(
        session,
        case_id,
        content,
    )


# =========================================================
# CASE DASHBOARD
# =========================================================

@router.get(
    "/{case_id}/dashboard",
)
async def get_case_dashboard(
    case_id: int,
    session: AsyncSession = Depends(get_session),
    user=Depends(student_only),
):
    # Get case
    result = await session.exec(
        select(Case).where(
            Case.id == case_id
        )
    )

    case = result.first()

    if not case:
        raise HTTPException(
            status_code=404,
            detail="Case not found",
        )

    # Get evidence
    result = await session.exec(
        select(Evidence)
        .where(Evidence.case_id == case_id)
        .order_by(Evidence.uploaded_at.desc())
    )

    evidence = result.all()

    # Get SOC events
    result = await session.exec(
        select(SOCEvent)
        .where(SOCEvent.case_id == case_id)
        .order_by(SOCEvent.created_at.desc())
    )

    soc_events = result.all()

    # Get timeline
    result = await session.exec(
        select(TimelineEvent)
        .where(TimelineEvent.case_id == case_id)
        .order_by(TimelineEvent.created_at.asc())
    )

    timeline = result.all()

    return {
        "case": {
            "id": case.id,
            "title": case.title,
            "description": case.description,
            "created_by": case.created_by,
            "created_at": case.created_at,
        },

        "evidence": [
            {
                "id": e.id,
                "filename": e.filename,
                "filesize": e.filesize,
                "sha256": e.sha256,
                "uploaded_at": e.uploaded_at,
            }
            for e in evidence
        ],

        "soc_events": [
            {
                "id": s.id,
                "severity": s.severity,
                "title": s.title,
                "description": s.description,
                "created_at": s.created_at,
            }
            for s in soc_events
        ],

        "timeline": [
            {
                "id": t.id,
                "event": t.event,
                "created_at": t.created_at,
            }
            for t in timeline
        ],
    }
