def detect_log_type(lines: list[str]) -> str:
    """
    Detect log type based on patterns.
    """
    sample = " ".join(lines[:5]).lower()

    if "sshd" in sample or "failed password" in sample:
        return "auth"

    if "http" in sample and ("get" in sample or "post" in sample):
        return "apache"

    if "kernel" in sample or "systemd" in sample:
        return "syslog"

    return "generic"
