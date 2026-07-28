import random
from datetime import datetime, timedelta
from sqlalchemy.orm import Session

from app.models.soc_event import SOCEvent
from app.core.noise_env import random_ip, random_hostname


LOW_NOISE_TITLES = [
    "Unusual login time",
    "New process observed",
    "New external IP contacted",
    "User logged in from new host",
]

LOW_NOISE_DESCRIPTIONS = [
    "Activity appears benign but deviates slightly from baseline.",
    "No clear malicious indicators detected.",
    "Flagged for visibility only.",
]


def generate_noise_soc_events(
    db: Session,
    case_id: int,
    count: int = 5,
):
    for _ in range(count):
        title = random.choice(LOW_NOISE_TITLES)
        desc = random.choice(LOW_NOISE_DESCRIPTIONS)
        src_ip = random_ip()
        host = random_hostname()

        ev = SOCEvent(
            case_id=case_id,
            evidence_id=None,
            severity="LOW",
            title=title,
            description=f"{desc} Host={host}, IP={src_ip}",
            mitre_techniques=[],
            mitre_tactics=[],
        )
        db.add(ev)
    db.commit()
