import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="notfound-container">
      <Image
        src="/Logo.png"
        alt="CY-HI Logo"
        width={140}
        height={140}
        className="notfound-logo"
      />

      <h1 className="notfound-title">This Page Flew Too High</h1>

      <p className="notfound-text">
        The page you're looking for drifted outside the CY‑HI network.  
        But don’t worry — here are the key areas of the platform you can explore.
      </p>

      {/* QUICK NAVIGATION */}
      <div className="notfound-links">
        <Link href="/" className="notfound-link">
          ⬅ Return to Dashboard
        </Link>

        <Link href="/paths" className="notfound-link">
          📚 Learning Paths
        </Link>

        <Link href="/missions" className="notfound-link">
          🎯 Missions
        </Link>

        <Link href="/mentor" className="notfound-link">
          🧠 CY‑HI Mentor <span className="coming-soon">Coming Soon</span>
        </Link>

        <Link href="/research" className="notfound-link">
          🔍 CY‑HI Research <span className="coming-soon">Coming Soon</span>
        </Link>
      </div>

      <Link href="/" className="btn btn-primary notfound-btn">
        Back to Safety
      </Link>
    </div>
  );
}
