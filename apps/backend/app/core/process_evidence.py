import json
import math
import os

from sqlalchemy.orm import Session

from app.core.file_utils import sha256_file, get_mime_type, is_text_file
from app.core.yara_engine import yara_scan_file
from app.core.pe_parser import parse_pe_file
from app.core.pcap_utils import analyze_pcap
from app.core.mitre_mapper import map_to_mitre
from app.core.mitre_tactics import map_techniques_to_tactics
from app.core.log_auto_detect import detect_log_type
from app.core.log_parsers import parse_auth_log, parse_generic_log
from app.crud.evidence_analysis import save_evidence_analysis
from app.core.soc_rules import generate_soc_events

# Noise injection
from app.core.noise_evidence import inject_benign_strings


# ---------------------------------------------------------
# Helper: extract strings
# ---------------------------------------------------------
def extract_strings(path: str, min_len: int = 4):
    out = []
    try:
        with open(path, "rb") as f:
            data = f.read()
        current = []
        for b in data:
            if 32 <= b <= 126:
                current.append(chr(b))
            else:
                if len(current) >= min_len:
                    out.append("".join(current))
                current = []
        if len(current) >= min_len:
            out.append("".join(current))
    except Exception:
        pass
    return out[:2000]  # limit for UI


# ---------------------------------------------------------
# Helper: entropy
# ---------------------------------------------------------
def calculate_entropy(path: str) -> float:
    try:
        with open(path, "rb") as f:
            data = f.read()
        if not data:
            return 0.0
        freq = [0] * 256
        for b in data:
            freq[b] += 1
        entropy = 0.0
        for c in freq:
            if c == 0:
                continue
            p = c / len(data)
            entropy -= p * math.log2(p)
        return round(entropy, 3)
    except Exception:
        return 0.0


# ---------------------------------------------------------
# Helper: EXIF (images)
# ---------------------------------------------------------
def extract_exif(path: str):
    try:
        from PIL import Image
        from PIL.ExifTags import TAGS

        img = Image.open(path)
        exif = img.getexif()
        out = {}
        for tag_id, value in exif.items():
            tag = TAGS.get(tag_id, tag_id)
            out[str(tag)] = str(value)
        return out
    except Exception:
        return None


# ---------------------------------------------------------
# MAIN FORENSIC PIPELINE
# ---------------------------------------------------------
def process_evidence(db: Session, evidence):
    file_path = evidence.filepath
    mime = get_mime_type(file_path)

    details = {}
    summary_parts = []

    # -----------------------------------------------------
    # 1) Hash
    # -----------------------------------------------------
    sha256 = sha256_file(file_path)
    details["sha256"] = sha256
    summary_parts.append("SHA256 computed")

    # -----------------------------------------------------
    # 2) Entropy
    # -----------------------------------------------------
    entropy = calculate_entropy(file_path)
    details["entropy"] = entropy
    summary_parts.append(f"Entropy {entropy}")

    # -----------------------------------------------------
    # 3) Strings
    # -----------------------------------------------------
    strings = extract_strings(file_path)

    # Add realism noise
    strings = inject_benign_strings(strings)

    details["strings"] = strings
    summary_parts.append(f"{len(strings)} strings extracted")

    # -----------------------------------------------------
    # 4) YARA
    # -----------------------------------------------------
    yara_hits = yara_scan_file(file_path)
    details["yara_hits"] = yara_hits
    if yara_hits:
        summary_parts.append(f"{len(yara_hits)} YARA hits")
    else:
        summary_parts.append("No YARA hits")

    # -----------------------------------------------------
    # 5) PE parsing
    # -----------------------------------------------------
    if evidence.filename.lower().endswith((".exe", ".dll", ".sys")):
        pe_info = parse_pe_file(file_path)
        details["pe_info"] = pe_info
        if pe_info:
            summary_parts.append("PE header parsed")
        else:
            summary_parts.append("PE parsing failed")

    # -----------------------------------------------------
    # 6) PCAP deep analysis
    # -----------------------------------------------------
    if mime in ("application/vnd.tcpdump.pcap", "application/x-pcap"):
        pcap_info = analyze_pcap(file_path)
        details["pcap_analysis"] = pcap_info
        if pcap_info:
            summary_parts.append(
                f"PCAP: {pcap_info.get('packet_count', 0)} packets, "
                f"{len(pcap_info.get('dns_queries', []))} DNS, "
                f"{len(pcap_info.get('http_requests', []))} HTTP, "
                f"{len(pcap_info.get('tls_flows', []))} TLS"
            )
        else:
            summary_parts.append("PCAP analysis failed")

    # -----------------------------------------------------
    # 7) Log auto-detection + parsing
    # -----------------------------------------------------
    if is_text_file(file_path):
        try:
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                lines = f.readlines()
        except Exception:
            lines = []

        log_type = detect_log_type(lines)
        details["log_type"] = log_type

        if log_type == "auth":
            parsed = parse_auth_log(lines)
            details["parsed_auth_log"] = parsed
            summary_parts.append("Auth log parsed")
        else:
            parsed = parse_generic_log(lines)
            details["parsed_generic_log"] = parsed
            summary_parts.append("Generic log parsed")

    # -----------------------------------------------------
    # 8) EXIF (images)
    # -----------------------------------------------------
    if mime.startswith("image/"):
        exif = extract_exif(file_path)
        details["exif"] = exif
        if exif:
            summary_parts.append("EXIF extracted")

    # -----------------------------------------------------
    # 9) MITRE mapping
    # -----------------------------------------------------
    mitre_hits = []

    # From strings
    for s in strings[:200]:
        mitre_hits.extend(map_to_mitre(s))

    # From logs
    if "parsed_auth_log" in details:
        for e in details["parsed_auth_log"]:
            mitre_hits.extend(map_to_mitre(e.get("message", "")))

    # Deduplicate
    mitre_hits = list(set(mitre_hits))
    details["mitre_techniques"] = [
        {"id": t[0], "name": t[1]} for t in mitre_hits
    ]

    # Map to tactics
    tactics = map_techniques_to_tactics(mitre_hits)
    details["mitre_tactics"] = [
        {"id": tid, "name": tname} for tid, tname in tactics.items()
    ]

    if mitre_hits:
        summary_parts.append(f"{len(mitre_hits)} MITRE techniques")

    # -----------------------------------------------------
    # 10) Save analysis
    # -----------------------------------------------------
    summary = " | ".join(summary_parts)
    save_evidence_analysis(
        db=db,
        evidence_id=evidence.id,
        summary=summary,
        details_json=json.dumps(details),
    )

    # -----------------------------------------------------
    # 11) Generate SOC alerts
    # -----------------------------------------------------
    generate_soc_events(
        db=db,
        case_id=evidence.case_id,
        evidence_id=evidence.id,
        analysis_json=json.dumps(details),
    )

    return True

