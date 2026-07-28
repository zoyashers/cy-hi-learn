from typing import Dict, Any
try:
    from scapy.all import rdpcap, DNS, DNSQR, TCP, UDP, IP
except Exception:
    rdpcap = None
    DNS = DNSQR = TCP = UDP = IP = None


def analyze_pcap(file_path: str) -> Dict[str, Any] | None:
    if rdpcap is None:
        return None

    try:
        packets = rdpcap(file_path)
    except Exception:
        return None

    info = {
        "packet_count": len(packets),
        "protocol_counts": {},
        "dns_queries": [],
        "http_requests": [],
        "tls_flows": [],
        "top_talkers": {},
        "sample_flows": [],
    }

    def add_talker(ip):
        info["top_talkers"][ip] = info["top_talkers"].get(ip, 0) + 1

    for pkt in packets:
        summary = pkt.summary()
        proto = summary.split()[0]
        info["protocol_counts"][proto] = info["protocol_counts"].get(proto, 0) + 1

        if IP and IP in pkt:
            add_talker(pkt[IP].src)
            add_talker(pkt[IP].dst)

        # DNS
        if DNS and pkt.haslayer(DNS) and pkt.haslayer(DNSQR):
            q = pkt[DNSQR].qname.decode(errors="ignore").rstrip(".")
            info["dns_queries"].append(q)

        # HTTP (port 80/8080)
        if TCP and IP and TCP in pkt:
            sport, dport = pkt[TCP].sport, pkt[TCP].dport
            if sport in (80, 8080) or dport in (80, 8080):
                info["http_requests"].append({
                    "src": pkt[IP].src,
                    "dst": pkt[IP].dst,
                    "sport": sport,
                    "dport": dport,
                })

        # TLS (port 443)
        if TCP and IP and TCP in pkt:
            sport, dport = pkt[TCP].sport, pkt[TCP].dport
            if sport == 443 or dport == 443:
                info["tls_flows"].append({
                    "src": pkt[IP].src,
                    "dst": pkt[IP].dst,
                    "sport": sport,
                    "dport": dport,
                })

    # Sample flows
    for pkt in packets[:50]:
        info["sample_flows"].append(pkt.summary())

    # Sort talkers
    info["top_talkers"] = dict(
        sorted(info["top_talkers"].items(), key=lambda x: x[1], reverse=True)[:10]
    )

    return info
