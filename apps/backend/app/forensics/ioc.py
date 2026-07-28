import re

def extract_iocs(text: str):
    ips = re.findall(r"\b(?:\d{1,3}\.){3}\d{1,3}\b", text)
    urls = re.findall(r"https?://[^\s]+", text)
    emails = re.findall(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", text)
    return {"ips": ips, "urls": urls, "emails": emails}

