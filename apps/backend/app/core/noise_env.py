import random

USERNAMES = ["alice", "bob", "charlie", "dave", "eve", "frank", "grace"]
HOSTNAMES = ["ws-01", "ws-02", "laptop-03", "srv-web-01", "srv-db-01"]
DOMAINS = ["corp.local", "internal.lan", "lab.local"]
COUNTRIES = ["GB", "US", "DE", "FR", "IN", "BR", "NL"]


def random_username() -> str:
    return random.choice(USERNAMES)


def random_hostname() -> str:
    return random.choice(HOSTNAMES)


def random_domain() -> str:
    return random.choice(DOMAINS)


def random_ip() -> str:
    return ".".join(str(random.randint(1, 254)) for _ in range(4))


def random_country() -> str:
    return random.choice(COUNTRIES)
