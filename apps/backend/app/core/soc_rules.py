import json
from sqlalchemy.orm import Session

from app.crud.soc_events import create_soc_event


def generate_soc_events(db: Session, case_id: int, evidence_id: int, analysis_json: str):
    """
    Convert analysis results into SOC alerts.
    """
    data = json.loads(analysis_json)
    events = []

    # 1) High entropy + no signature → suspicious binary
    entropy = data.get("entropy")
    pe_info = data.get("pe_info")
    yara_hits = data.get("yara_hits", [])

    if entropy and entropy > 7.0:
        events.append({
            "severity": "HIGH",
            "title": "High-entropy binary detected",
            "description": f"Entropy {entropy:.2f} suggests packing or obfuscation.",
        })

    if pe_info and not pe_info.get("has_signature"):
        events.append({
            "severity": "MEDIUM",
            "title": "Unsigned executable",
            "description": "The PE file has no digital signature.",
        })

    if yara_hits:
        events.append({
            "severity": "CRITICAL",
            "title": "YARA rule triggered",
            "description": f"{len(yara_hits)} YARA rules matched this file.",
        })

    # 2) PCAP anomalies
    pcap = data.get("pcap_analysis")
    if pcap:
        dns_count = len(pcap.get("dns_queries", []))
        tls_count = len(pcap.get("tls_flows", []))

        if dns_count > 20:
            events.append({
                "severity": "HIGH",
                "title": "Suspicious DNS activity",
                "description": f"{dns_count} DNS queries detected — possible C2 or exfiltration.",
            })

        if tls_count > 10:
            events.append({
                "severity": "HIGH",
                "title": "High TLS flow volume",
                "description": f"{tls_count} TLS flows detected — possible encrypted C2.",
            })

    # 3) Log-based alerts
    if "parsed_auth_log" in data:
        auth_events = data["parsed_auth_log"]
        failed = [e for e in auth_events if "Failed password" in e.get("message", "")]
        if len(failed) > 5:
            events.append({
                "severity": "HIGH",
                "title": "Brute force login attempts",
                "description": f"{len(failed)} failed SSH login attempts detected.",
            })

    # 4) Attach MITRE mapping if present
    mitre_techniques = data.get("mitre_techniques", [])
    mitre_tactics = data.get("mitre_tactics", [])

    # Save events
    for e in events:
        create_soc_event(
            db=db,
            case_id=case_id,
            evidence_id=evidence_id,
            severity=e["severity"],
            title=e["title"],
            description=e["description"],
            mitre_techniques=mitre_techniques,
            mitre_tactics=mitre_tactics,
        )
