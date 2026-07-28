import Link from "next/link";

export default function Mentor() {
  return (
    <div className="coming-container">
      <h1 className="coming-title">CY‑HI Mentor</h1>

      <p className="coming-text">
        Your personal AI cyber guide is almost here.  
        CY‑HI Mentor will help you break down complex concepts, walk through missions,
        explain evidence, and support you like a real analyst coach.
      </p>

      <p className="coming-text">
        Built for beginners. Powered by advanced AI.  
        Designed to make cybersecurity feel clear, exciting, and achievable.
      </p>

      <div className="coming-links">
        <Link href="/missions" className="btn btn-primary">
          Explore Missions
        </Link>
        <Link href="/paths" className="btn btn-secondary">
          View Learning Paths
        </Link>
      </div>

      <p className="coming-soon-tag">Launching Soon</p>
    </div>
  );
}
