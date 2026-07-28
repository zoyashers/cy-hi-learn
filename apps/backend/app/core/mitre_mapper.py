MITRE_MAP = {
    "Failed password": ("T1110", "Brute Force"),
    "Accepted password": ("T1078", "Valid Accounts"),
    "authentication failure": ("T1110", "Brute Force"),

    "powershell": ("T1059.001", "PowerShell"),
    "cmd.exe": ("T1059.003", "Windows Command Shell"),
    "bash": ("T1059.004", "Unix Shell"),

    "registry": ("T1547", "Boot or Logon Autostart Execution"),
    "autorun": ("T1547", "Boot or Logon Autostart Execution"),

    "packed": ("T1027", "Obfuscated/Encrypted Files"),
    "entropy_high": ("T1027", "Obfuscated/Encrypted Files"),

    "whoami": ("T1033", "Account Discovery"),
    "net user": ("T1087", "Account Discovery"),

    "smb": ("T1021.002", "SMB/Windows Admin Shares"),
    "rdp": ("T1021.001", "Remote Desktop Protocol"),

    "ftp": ("T1048", "Exfiltration Over Alternative Protocol"),
    "http upload": ("T1041", "Exfiltration Over C2 Channel"),

    "pcap": ("T1040", "Network Sniffing"),
}


def map_to_mitre(text: str):
    matches = []
    lower = text.lower()
    for pattern, (tech_id, tech_name) in MITRE_MAP.items():
        if pattern.lower() in lower:
            matches.append((tech_id, tech_name))
    return matches
