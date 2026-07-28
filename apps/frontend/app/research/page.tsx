import Link from "next/link";

export default function Research() {
  return (
    <div className="coming-container">
      <h1 className="coming-title">CY‑HI Research</h1>

      <p className="coming-text">
        A new hub for cyber intelligence, threat reports, case studies, and
        analyst‑ready breakdowns.  
        CY‑HI Research will help you understand how attackers think — and how
        defenders respond.
      </p>

      <p className="coming-text">
        From malware analysis to SOC investigations, this space will evolve into
        a knowledge vault for learners and professionals.
      </p>

      <div className="coming-links">
        <Link href="/missions" className="btn btn-primary">
          Try a Mission
        </Link>
        <Link href="/paths" className="btn btn-secondary">
          Explore Paths
        </Link>
      </div>

      <p className="coming-soon-tag">Launching Soon</p>
    </div>
  );
}
