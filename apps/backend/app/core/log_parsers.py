import re
from datetime import datetime


AUTH_LOG_PATTERN = re.compile(
    r"(?P<date>\w+\s+\d+\s[\d:]+)\s(?P<host>\S+)\s(?P<proc>\S+):\s(?P<message>.*)"
)

GENERIC_LOG_PATTERN = re.compile(
    r"(?P<date>\w+\s+\d+\s[\d:]+)\s(?P<level>[A-Z]+)\s(?P<message>.*)"
)


def parse_auth_log(line: str) -> dict | None:
    match = AUTH_LOG_PATTERN.match(line)
    if not match:
        return None

    data = match.groupdict()
    data["timestamp"] = _parse_syslog_date(data["date"])
    return data


def parse_generic_log(line: str) -> dict | None:
    match = GENERIC_LOG_PATTERN.match(line)
    if not match:
        return None

    data = match.groupdict()
    data["timestamp"] = _parse_syslog_date(data["date"])
    return data


def _parse_syslog_date(date_str: str) -> datetime | None:
    """
    Convert syslog-style timestamps like 'Jan 12 14:22:01' into datetime.
    Year is assumed to be current year.
    """
    try:
        now = datetime.now()
        return datetime.strptime(f"{date_str} {now.year}", "%b %d %H:%M:%S %Y")
    except Exception:
        return None
