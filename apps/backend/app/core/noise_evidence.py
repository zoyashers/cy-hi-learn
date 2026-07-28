import random


def inject_benign_strings(strings: list[str], extra_count: int = 30) -> list[str]:
    benign = [
        "C:\\Windows\\System32\\cmd.exe",
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "GET /favicon.ico HTTP/1.1",
        "User-Agent: curl/7.68.0",
    ]
    for _ in range(extra_count):
        strings.append(random.choice(benign))
    random.shuffle(strings)
    return strings
