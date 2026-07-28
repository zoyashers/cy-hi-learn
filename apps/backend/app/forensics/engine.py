from pathlib import Path


class ForensicEngine:
    def __init__(self, evidence_dir: str = "app/uploads/evidence"):
        self.evidence_dir = Path(evidence_dir)

    def list_evidence(self) -> list[str]:
        if not self.evidence_dir.exists():
            return []
        return [p.name for p in self.evidence_dir.iterdir() if p.is_file()]

    def analyze_file(self, filename: str) -> dict:
        # placeholder – later: entropy, EXIF, PE, YARA, etc.
        path = self.evidence_dir / filename
        if not path.exists():
            return {"error": "file not found"}
        return {"filename": filename, "size": path.stat().st_size}
