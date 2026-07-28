import Link from "next/link";

export default function Error500() {
  return (
    <div className="coming-container">
      <h1 className="coming-title">System Glitch Detected</h1>

      <p className="coming-text">
        Something inside the CY‑HI network malfunctioned.  
        Our systems are recalibrating — but you can still continue your journey.
      </p>

      <div className="coming-links">
        <Link href="/" className="btn btn-primary">
          Return to Dashboard
        </Link>
        <Link href="/missions" className="btn btn-secondary">
          Explore Missions
        </Link>
      </div>

      <p className="coming-soon-tag">Error Code: 500</p>
    </div>
  );
}
