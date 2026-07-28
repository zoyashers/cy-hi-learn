import hashlib
import mimetypes
import os


# -----------------------------
# HASHING
# -----------------------------
def compute_sha256(file_path: str) -> str:
    """Compute SHA256 hash of a file in streaming mode."""
    sha256 = hashlib.sha256()
    with open(file_path, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            sha256.update(chunk)
    return sha256.hexdigest()


# Backwards compatibility alias
def sha256_file(file_path: str) -> str:
    return compute_sha256(file_path)


# -----------------------------
# DIRECTORY HELPERS
# -----------------------------
def ensure_directory(path: str):
    """Create directory if it does not exist."""
    os.makedirs(path, exist_ok=True)


# Backwards compatibility alias
def ensure_dir(path: str):
    ensure_directory(path)


# -----------------------------
# MIME TYPE + TEXT DETECTION
# -----------------------------
def get_mime_type(file_path: str) -> str | None:
    mime, _ = mimetypes.guess_type(file_path)
    return mime


def is_text_file(file_path: str) -> bool:
    mime = get_mime_type(file_path)
    if mime and mime.startswith("text/"):
        return True

    text_exts = {
        ".txt", ".log", ".cfg", ".conf", ".ini",
        ".json", ".xml", ".csv", ".md"
    }
    ext = os.path.splitext(file_path)[1].lower()
    return ext in text_exts
