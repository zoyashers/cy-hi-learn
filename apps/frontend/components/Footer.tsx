import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">

      {/* CTA */}
      <div className="footer-cta">
        <Image src="/logo.png" alt="CY‑HI Logo" width={70} height={70} />

        <h2>FLY HIGH WITH CY‑HI</h2>
        <p>LEARN • PRACTICE • GROW</p>
        <p>CYBER LEARNING. HUMAN IMPACT.</p>

        <div className="footer-cta-buttons">
          <Link href="/get-started" className="btn btn-primary">Start Learning Free</Link>
          <Link href="/contact" className="btn btn-secondary">Request Demo</Link>
        </div>
      </div>

      {/* Columns */}
      <div className="footer-columns">
        <div className="footer-col">
          <h3>Platform</h3>
          <Link href="/learn">Learning Paths</Link>
          <Link href="/missions">Missions</Link>
          <Link href="/mentor">AI Mentor</Link>
          <Link href="/research">Research</Link>
        </div>

        <div className="footer-col">
          <h3>Educators</h3>
          <Link href="/educators">Lecturer Dashboard</Link>
          <Link href="/reports">Reports</Link>
          <Link href="/lms">LMS Integration</Link>
          <Link href="/analytics">Analytics</Link>
        </div>

        <div className="footer-col">
          <h3>Company</h3>
          <Link href="/about">About</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="footer-col">
          <h3>Legal</h3>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/cookies">Cookies</Link>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 CY‑HI Learn. All rights reserved.
      </div>
    </footer>
  );
}
