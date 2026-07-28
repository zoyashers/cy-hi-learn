import random
from datetime import datetime, timedelta

from app.core.noise_env import random_username, random_ip, random_hostname


def _rand_time_past_hours(hours: int = 24) -> str:
    dt = datetime.utcnow() - timedelta(
        seconds=random.randint(0, hours * 3600)
    )
    return dt.strftime("%b %d %H:%M:%S")


def generate_benign_auth_logs(count: int = 50) -> list[str]:
    logs = []
    for _ in range(count):
        ts = _rand_time_past_hours()
        host = random_hostname()
        user = random_username()
        src_ip = random_ip()
        ok = random.random() < 0.8  # 80% success, 20% fail
        if ok:
            msg = f"{ts} {host} sshd[1234]: Accepted password for {user} from {src_ip} port 51234 ssh2"
        else:
            msg = f"{ts} {host} sshd[1234]: Failed password for {user} from {src_ip} port 51234 ssh2"
        logs.append(msg)
    return logs


def generate_system_noise_logs(count: int = 50) -> list[str]:
    msgs = [
        "systemd[1]: Started Daily apt download activities.",
        "kernel: eth0: Link is Up 1000 Mbps Full Duplex.",
        "cron[1234]: (root) CMD (/usr/local/bin/backup.sh)",
        "systemd[1]: Stopping User Manager for UID 1000...",
        "systemd[1]: Starting Cleanup of Temporary Directories...",
    ]
    logs = []
    for _ in range(count):
        ts = _rand_time_past_hours()
        host = random_hostname()
        msg = random.choice(msgs)
        logs.append(f"{ts} {host} {msg}")
    return logs
