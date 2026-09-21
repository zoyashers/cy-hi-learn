"use client";

import Link from "next/link";
import RightSidebar from "@/components/RightSidebar";

const cases = [
  {
    number: "01",
    category: "DIGITAL FORENSICS",
    title: "Suspicious USB Device",
    description:
      "Determine how a removable device was used during a workstation compromise.",
    status: "IN PROGRESS",
    progress: 80,
    difficulty: "BEGINNER",
    xp: 350,
    href: "/missions/suspicious-usb-device",
  },
  {
    number: "02",
    category: "NETWORK FORENSICS",
    title: "Trace the Intrusion",
    description:
      "Follow network activity and identify how an attacker entered the environment.",
    status: "AVAILABLE",
    progress: 0,
    difficulty: "INTERMEDIATE",
    xp: 400,
    href: "/missions/trace-the-intrusion",
  },
  {
    number: "03",
    category: "SYSTEM FORENSICS",
    title: "Log File Analysis",
    description:
      "Reconstruct a suspicious sequence of events using Windows event data.",
    status: "COMPLETED",
    progress: 100,
    difficulty: "INTERMEDIATE",
    xp: 300,
    href: "/missions/log-file-analysis",
  },
];

export default function CasesPage() {
  return (
    <div className="student-app cyhi-dashboard-style-page">
      <RightSidebar />

      <main className="student-main">

        <header className="student-topbar">
          <div>
            <Link
              href="/dashboard"
              className="back-button"
            >
              ← Back to dashboard
            </Link>

            <span className="eyebrow">
              INVESTIGATION WORKSPACE
            </span>

            <h1>
              Case Files
            </h1>
          </div>

          <div className="student-topbar-actions">
            <button
              className="icon-button"
              type="button"
            >
              ◌
            </button>

            <Link
              href="/profile"
              className="topbar-avatar"
            >
              TS
            </Link>
          </div>
        </header>

        <section className="student-hero inner-page-hero">
          <div className="student-hero-copy">
            <span className="hero-kicker">
              YOUR INVESTIGATION ARCHIVE
            </span>

            <h2>
              Every case tells
              <span> a story.</span>
            </h2>

            <p>
              Review active investigations, completed cases
              and new scenarios waiting to be explored.
            </p>
          </div>

          <div className="level-card">
            <div className="level-card-top">
              <span>CASES</span>
              <strong>03</strong>
            </div>

            <div className="mission-summary-ring">
              <div>
                <strong>1</strong>
                <span>ACTIVE</span>
              </div>
            </div>

            <div className="level-progress">
              <div className="level-progress-label">
                <span>Cases completed</span>
                <span>33%</span>
              </div>

              <div className="level-progress-track">
                <div
                  className="level-progress-fill"
                  style={{ width: "33%" }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="student-stats">
          <div className="stat-card">
            <span className="stat-icon">◉</span>
            <div>
              <span className="stat-label">
                ACTIVE
              </span>
              <strong>1</strong>
              <small>Current investigation</small>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">✓</span>
            <div>
              <span className="stat-label">
                SOLVED
              </span>
              <strong>1</strong>
              <small>Completed cases</small>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">◈</span>
            <div>
              <span className="stat-label">
                AVAILABLE
              </span>
              <strong>1</strong>
              <small>Ready to start</small>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">★</span>
            <div>
              <span className="stat-label">
                CASE XP
              </span>
              <strong>300</strong>
              <small>Earned so far</small>
            </div>
          </div>
        </section>

        <section className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <span className="panel-kicker">
                INVESTIGATION ARCHIVE
              </span>

              <h3>
                Your case files
              </h3>
            </div>

            <span className="learning-path-count">
              03 CASES
            </span>
          </div>

          <div className="dashboard-mission-list">
            {cases.map((item) => (
              <Link
                href={item.href}
                key={item.number}
                className="dashboard-mission-row"
              >
                <div className="dashboard-mission-number">
                  {item.number}
                </div>

                <div className="dashboard-mission-main">
                  <span className="mission-type">
                    {item.category}
                  </span>

                  <h4>
                    {item.title}
                  </h4>

                  <p>
                    {item.description}
                  </p>

                  {item.progress > 0 &&
                    item.progress < 100 && (
                      <div className="case-inline-progress">
                        <div className="skill-bar">
                          <div
                            style={{
                              width: `${item.progress}%`,
                            }}
                          />
                        </div>

                        <span>
                          {item.progress}%
                        </span>
                      </div>
                    )}
                </div>

                <div className="dashboard-mission-status">
                  <span>
                    {item.status}
                  </span>

                  <small>
                    {item.difficulty}
                    <br />
                    +{item.xp} XP
                  </small>
                </div>

                <strong className="dashboard-mission-arrow">
                  →
                </strong>
              </Link>
            ))}
          </div>
        </section>

        <section className="learning-next dashboard-bottom-cta">
          <div>
            <span className="hero-kicker">
              READY?
            </span>

            <h2>
              Pick a case.
              <span> Follow the evidence.</span>
            </h2>

            <p>
              Every investigation is an opportunity to practise
              the judgement that turns technical knowledge into
              real investigative ability.
            </p>
          </div>

          <Link
            href="/missions"
            className="primary-action"
          >
            Browse missions →
          </Link>
        </section>

      </main>
    </div>
  );
}