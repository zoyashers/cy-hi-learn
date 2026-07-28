from app.models.case_models import Case
from app.core.session import get_session

async def seed_cases():
    async for session in get_session():
        cases = [
            Case(title="Suspicious PowerShell Activity", description="Encoded PowerShell commands detected."),
            Case(title="Unauthorized Login Attempt", description="Multiple failed SSH login attempts."),
            Case(title="Malicious File Detected", description="AV flagged a trojan executable."),
        ]

        session.add_all(cases)
        await session.commit()
        print("Sample cases created.")
