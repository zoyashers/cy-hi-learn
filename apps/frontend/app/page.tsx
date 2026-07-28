
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Navbar />

      {/* BIG LOGO BANNER */}
      <div className="banner">
        <Image
          src="/Logo.png"
          alt="CY‑HI Logo"
          width={420}
          height={420}
          className="banner-logo"
        />

        <h2 className="banner-title">CYBER HUMAN INTELLIGENCE</h2>

        <p className="banner-subtext">
          A next‑generation cyber training platform built for beginners and future
          analysts. Learn through missions, guided explanations, and immersive
          simulations — all powered by the CY‑HI ecosystem.
        </p>

        <Link href="/get-started" className="btn btn-primary banner-btn">
          Begin Your Journey
        </Link>
      </div>

      {/* ABOUT CY‑HI SECTION */}
      <section className="about">
        <h2>What is CY‑HI?</h2>
        <p>
          CY‑HI Learn blends real‑world cybersecurity workflows with AI‑powered support
          to help you grow from absolute beginner to confident analyst. Explore missions,
          investigate digital evidence, understand attacker behaviour, and build practical
          skills at your own pace — no experience required.
        </p>
      </section>

      {/* DASHBOARD PREVIEW */}
      <div className="dashboard-preview">
        <Image
          src="/dashboard-preview.png"
          alt="CY‑HI Dashboard"
          width={900}
          height={600}
          className="glow dashboard-img"
        />
      </div>

      {/* PRODUCT PILLARS */}
      <section className="features">
        <div className="pillar-card">
          <h3>🧠 CY‑HI Mentor</h3>
          <p>
            Your personal cyber guide. CY‑HI Mentor breaks down complex concepts,
            explains evidence, gives hints during missions, and helps you understand the
            “why” behind every step. Designed to make learning feel clear, supportive,
            and exciting.
          </p>
        </div>

        <div className="pillar-card">
          <h3>🎯 Missions</h3>
          <p>
            Hands‑on cyber investigations inspired by real incidents. Solve puzzles,
            analyse logs, uncover attacker activity, and learn by doing — the best way
            to build real skills.
          </p>
        </div>

        <div className="pillar-card">
          <h3>📊 Progress</h3>
          <p>
            Track your growth with XP, badges, streaks, and skill analytics. See exactly
            how you're improving and what to focus on next as you level up your cyber
            abilities.
          </p>
        </div>
      </section>

      {/* FEATURED PATH + MISSION */}
      <section className="featured">
        <div className="card glow featured-path">
          <h2>⭐ Featured Path</h2>
          <h3>Digital Forensics</h3>
          <p>
            Learn how analysts uncover hidden evidence, recover deleted files, and trace
            attacker activity across systems. This path introduces you to the foundations
            of digital forensics through simple, guided lessons.
          </p>

          <ul>
            <li>• Introduction to Digital Forensics</li>
            <li>• Chain of Custody</li>
            <li>• File Systems Basics</li>
            <li>• Windows Registry Analysis</li>
          </ul>

          <Link href="/paths/digital-forensics" className="btn btn-primary">
            Start Path
          </Link>
        </div>

        <div className="card featured-mission">
          <h3>🎮 Featured Mission: The Stolen Secrets</h3>

          <p>
            🧩 <strong>Objective:</strong> Investigate a suspicious workstation, recover
            deleted files, and piece together what happened. A perfect first mission for
            new learners.
          </p>

          <p>
            🎯 <strong>Skills Gained:</strong> Registry analysis, timeline reconstruction,
            evidence correlation, and attacker behaviour analysis.
          </p>

          <p>⏱ 45 minutes • ⭐ Beginner • +300 XP</p>

          <Link href="/missions/stolen-secrets" className="btn btn-primary">
            Start Mission
          </Link>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing">
        <div className="price-card">
          <h2>Free</h2>
          <p>Start your journey with essential missions and beginner‑friendly paths.</p>
          <ul>
            <li>Access to Free Missions</li>
            <li>Basic Learning Paths</li>
            <li>Community Support</li>
          </ul>
          <Link href="/get-started" className="btn btn-primary">
            Start Free
          </Link>
        </div>

        <div className="price-card glow recommended">
          <div className="badge">Most Popular</div>
          <h2>Pro</h2>
          <p>Unlock the full CY‑HI experience with unlimited missions and certificates.</p>
          <ul>
            <li>All Learning Paths</li>
            <li>Unlimited Missions</li>
            <li>Certificates</li>
            <li>Skill Analytics</li>
          </ul>
          <Link href="/subscribe/pro" className="btn btn-primary">
            Go Pro
          </Link>
        </div>

        <div className="price-card">
          <h2>Premium</h2>
          <p>Become job‑ready with advanced AI support, career tools, and priority access.</p>
          <ul>
            <li>Everything in Pro</li>
            <li>Advanced AI Mentor</li>
            <li>Career Roadmap</li>
            <li>Priority Support</li>
          </ul>
          <Link href="/subscribe/premium" className="btn btn-primary">
            Go Premium
          </Link>
        </div>

        <div className="price-card">
          <h2>Universities</h2>
          <p>Empower entire cohorts with analytics, dashboards, and custom learning paths.</p>
          <ul>
            <li>Lecturer Dashboard</li>
            <li>Student Analytics</li>
            <li>LMS Integration</li>
            <li>Custom Learning Paths</li>
          </ul>
          <Link href="/contact" className="btn btn-secondary">
            Request Demo
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="hero final-cta">
        <h2>Start your first mission in 3 minutes</h2>
        <p className="final-cta-text">
          Jump into your first mission and experience cybersecurity the fun, futuristic
          way.
        </p>
        <Link href="/get-started" className="btn btn-primary">
          Launch Free Lab
        </Link>
      </section>

      <Footer />
    </>
  );
}
