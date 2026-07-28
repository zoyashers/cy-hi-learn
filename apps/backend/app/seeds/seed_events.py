from sqlmodel import select
from app.models.case_models import Case
from app.models.evidence import Evidence
from app.core.session import async_session


async def seed_events():
    async with async_session() as session:
        # Example evidence items
        evidence_items = [
            Evidence(case_id=1, filename="encoded_ps_log.txt", description="Encoded PS log"),
            Evidence(case_id=2, filename="ssh_failures.log", description="SSH failures"),
            Evidence(case_id=3, filename="trojan_sample.bin", description="Trojan sample"),
        ]

        session.add_all(evidence_items)
        await session.commit()
