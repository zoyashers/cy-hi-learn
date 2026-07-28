from scapy.all import rdpcap

def analyze_pcap(path: str):
    packets = rdpcap(path)
    return {
        "total_packets": len(packets),
        "protocols": list({pkt.summary().split()[0] for pkt in packets}),
        "src_ips": list({pkt[0][1].src for pkt in packets if hasattr(pkt[0][1], "src")}),
        "dst_ips": list({pkt[0][1].dst for pkt in packets if hasattr(pkt[0][1], "dst")}),
    }
