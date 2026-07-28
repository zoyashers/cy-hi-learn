MITRE_TACTICS = {
    "TA0001": "Initial Access",
    "TA0002": "Execution",
    "TA0003": "Persistence",
    "TA0004": "Privilege Escalation",
    "TA0005": "Defense Evasion",
    "TA0006": "Credential Access",
    "TA0007": "Discovery",
    "TA0008": "Lateral Movement",
    "TA0009": "Collection",
    "TA0010": "Exfiltration",
    "TA0011": "Command and Control",
    "TA0012": "Impact",
}

TECHNIQUE_TO_TACTIC = {
    "T1110": "TA0006",
    "T1078": "TA0006",

    "T1059.001": "TA0002",
    "T1059.003": "TA0002",
    "T1059.004": "TA0002",

    "T1547": "TA0003",

    "T1027": "TA0005",

    "T1033": "TA0007",
    "T1087": "TA0007",

    "T1021.001": "TA0008",
    "T1021.002": "TA0008",

    "T1048": "TA0010",
    "T1041": "TA0010",

    "T1040": "TA0009",
}


def map_techniques_to_tactics(techniques):
    tactics = {}
    for tech_id, _ in techniques:
        if tech_id in TECHNIQUE_TO_TACTIC:
            tid = TECHNIQUE_TO_TACTIC[tech_id]
            tactics[tid] = MITRE_TACTICS.get(tid, "Unknown")
    return tactics
