from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from app.models import (
    Case,
    Report,
    CaseAssignment,
    TimelineEvent,
    CaseNote,
)



async def create_case(
    session: AsyncSession,
    data
):

    case = Case(
        title=data.title,
        description=data.description,
    )


    session.add(case)

    await session.commit()

    await session.refresh(case)

    return case



async def get_case(
    session: AsyncSession,
    case_id: int
):

    result = await session.exec(
        select(Case)
        .where(
            Case.id == case_id
        )
    )

    return result.first()



async def get_all_cases(
    session: AsyncSession
):

    result = await session.exec(
        select(Case)
    )

    return result.all()



async def add_case_note(
    session: AsyncSession,
    case_id: int,
    user_id: int,
    content: str
):

    note = CaseNote(
        case_id=case_id,
        user_id=user_id,
        content=content,
    )


    session.add(note)

    await session.commit()

    await session.refresh(note)

    return note



async def assign_case(
    session: AsyncSession,
    case_id: int,
    user_id: int
):

    assignment = CaseAssignment(
        case_id=case_id,
        user_id=user_id,
    )


    session.add(assignment)

    await session.commit()

    await session.refresh(assignment)

    return assignment



async def add_timeline_event(
    session: AsyncSession,
    case_id: int,
    event: str
):

    timeline = TimelineEvent(
        case_id=case_id,
        event=event,
    )


    session.add(timeline)

    await session.commit()

    await session.refresh(timeline)

    return timeline



async def add_report(
    session: AsyncSession,
    case_id: int,
    content: str
):

    report = Report(
        case_id=case_id,
        title="Case Report",
        content=content,
    )


    session.add(report)

    await session.commit()

    await session.refresh(report)

    return report