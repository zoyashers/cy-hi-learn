from pathlib import Path
import magic
import math
from PIL import Image
import yara


class ForensicEngine:
    def __init__(self, evidence_dir: str = "app/uploads/evidence"):
        self.evidence_dir = Path(evidence_dir)

    # -----------------------------
    # List evidence
    # -----------------------------
    def list_evidence(self):
        if not self.evidence_dir.exists():
            return []
        return [p.name for p in self.evidence_dir.iterdir() if p.is_file()]

    # -----------------------------
    # Main analysis function
    # -----------------------------
    def analyze_file(self, filename: str):
        path = self.evidence_dir / filename
        if not path.exists():
            return {"error": "file not found"}

        return {
            "filename": filename,
            "size": path.stat().st_size,
            "type": self.detect_type(path),
            "entropy": self.calculate_entropy(path),
            "exif": self.extract_exif(path),
            "yara_matches": self.run_yara(path),
        }

    # -----------------------------
    # File type detection
    # -----------------------------
    def detect_type(self, path: Path):
        try:
            return magic.from_file(str(path))
        except:
            return "unknown"

    # -----------------------------
    # Entropy calculation
    # -----------------------------
    def calculate_entropy(self, path: Path):
        data = path.read_bytes()
        if not data:
            return 0.0

        freq = [0] * 256
        for b in data:
            freq[b] += 1

        entropy = 0
        for f in freq:
            if f > 0:
                p = f / len(data)
                entropy -= p * math.log2(p)

        return round(entropy, 4)

    # -----------------------------
    # EXIF extraction (images)
    # -----------------------------
    def extract_exif(self, path: Path):
        try:
            img = Image.open(path)
            exif = img.getexif()
            return {str(k): str(v) for k, v in exif.items()}
        except:
            return {}

    # -----------------------------
    # YARA scanning
    # -----------------------------
    def run_yara(self, path: Path):
        rules_dir = Path("app/yara_rules")
        if not rules_dir.exists():
            return []

        rules = yara.compile(
            filepaths={f.name: str(f) for f in rules_dir.glob("*.yar")}
        )

        matches = rules.match(str(path))
        return [m.rule for m in matches]
