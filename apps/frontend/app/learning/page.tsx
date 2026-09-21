"use client";

import Link from "next/link";
import RightSidebar from "@/components/RightSidebar";

const learningPaths = [
  {
    number: "01",
    icon: "⌁",
    type: "FOUNDATION",
    title: "Digital Evidence",
    description:
      "Understand how digital evidence is created, stored and preserved before interpreting an investigation.",
    level: "BEGINNER → INTERMEDIATE",
    progress: 82,
    href: "/learning/digital-evidence",
  },
  {
    number: "02",
    icon: "◈",
    type: "INVESTIGATION",
    title: "Evidence Analysis",
    description:
      "Learn how files, logs and system artefacts can be examined to identify meaningful evidence.",
    level: "INTERMEDIATE",
    progress: 64,
    href: "/learning/evidence-analysis",
  },
  {
    number: "03",
    icon: "◎",
    type: "REASONING",
    title: "Attacker Thinking",
    description:
      "Understand behaviour, intent and investigative reasoning so technical findings can be placed into context.",
    level: "BEGINNER → INTERMEDIATE",
    progress: 27,
    href: "/learning/attacker-thinking",
  },
];

const skills = [
  ["Digital Evidence Analysis", "Advanced", 82],
  ["Timeline Reconstruction", "Intermediate", 64],
  ["Network Investigation", "Developing", 41],
  ["Attacker Behaviour", "Developing", 27],
];

export default function LearningPage() {
  return (
    <div className="student-app cyhi-dashboard-style-page">
      <RightSidebar />

      <main className="student-main">

        {/* TOP BAR */}

        <header className="student-topbar">
          <div>
            <Link
              href="/dashboard"
              className="back-button"
            >
              ← Back to dashboard
            </Link>

            <span className="eyebrow">
              LEARNING WORKSPACE
            </span>

            <h1>
              Learning
            </h1>
          </div>

          <div className="student-topbar-actions">
            <button
              className="icon-button"
              type="button"
              title="Notifications"
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

        {/* HERO */}

        <section className="student-hero inner-page-hero">
          <div className="student-hero-copy">
            <span className="hero-kicker">
              YOUR CYBER DEVELOPMENT
            </span>

            <h2>
              Build the skills behind
              <span> the investigation.</span>
            </h2>

            <p>
              Learn the concepts, techniques and thinking
              patterns that turn cybersecurity knowledge into
              practical investigative ability.
            </p>

            <div className="hero-actions">
              <Link
                href="/learning/digital-evidence"
                className="primary-action"
              >
                Continue Learning →
              </Link>

              <Link
                href="/skills"
                className="secondary-action"
              >
                View skill profile
              </Link>
            </div>
          </div>

          <div className="level-card">
            <div className="level-card-top">
              <span>PATH</span>
              <strong>64%</strong>
            </div>

            <div className="mission-summary-ring learning-ring">
              <div>
                <strong>12</strong>
                <span>MODULES</span>
              </div>
            </div>

            <div className="level-progress">
              <div className="level-progress-label">
                <span>12 / 19 modules</span>
                <span>64%</span>
              </div>

              <div className="level-progress-track">
                <div
                  className="level-progress-fill"
                  style={{ width: "64%" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}

        <section className="student-stats">
          <div className="stat-card">
            <span className="stat-icon">▣</span>

            <div>
              <span className="stat-label">
                MODULES
              </span>

              <strong>19</strong>

              <small>
                12 completed
              </small>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">✓</span>

            <div>
              <span className="stat-label">
                PROGRESS
              </span>

              <strong>64%</strong>

              <small>
                Current learning path
              </small>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">◇</span>

            <div>
              <span className="stat-label">
                SKILLS
              </span>

              <strong>8</strong>

              <small>
                Across your profile
              </small>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">★</span>

            <div>
              <span className="stat-label">
                LEARNING XP
              </span>

              <strong>1,350</strong>

              <small>
                Earned through learning
              </small>
            </div>
          </div>
        </section>

        {/* CONTINUE */}

        <section className="dashboard-panel mission-feature-panel">
          <div className="panel-heading">
            <div>
              <span className="panel-kicker">
                CONTINUE LEARNING
              </span>

              <h3>
                Digital Forensics
              </h3>
            </div>

            <span className="status-pill">
              64% COMPLETE
            </span>
          </div>

          <div className="mission-feature-grid">
            <div className="mission-feature-number">
              01
            </div>

            <div>
              <span className="mission-type">
                CURRENT MODULE
              </span>

              <h4>
                Understanding File Metadata
              </h4>

              <p>
                Learn how timestamps, file attributes and
                metadata can provide clues about what happened
                on a system and when.
              </p>

              <div className="mission-meta-row">
                <span>
                  INTERMEDIATE
                </span>

                <span>
                  ~30 MIN
                </span>

                <span>
                  +150 XP
                </span>
              </div>
            </div>

            <div className="mission-feature-progress">
              <strong>64%</strong>

              <span>
                PATH COMPLETE
              </span>

              <div className="skill-bar">
                <div style={{ width: "64%" }} />
              </div>

              <Link
                href="/learning/digital-evidence"
                className="primary-action"
              >
                Continue →
              </Link>
            </div>
          </div>
        </section>

        {/* PATHS */}

        <section className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <span className="panel-kicker">
                LEARNING PATHS
              </span>

              <h3>
                Choose what to develop next.
              </h3>
            </div>

            <span className="learning-path-count">
              03 PATHS
            </span>
          </div>

          <div className="dashboard-learning-grid">
            {learningPaths.map((path) => (
              <Link
                href={path.href}
                key={path.number}
                className="dashboard-learning-card"
              >
                <div className="dashboard-learning-card-top">
                  <span>
                    {path.number}
                  </span>

                  <strong>
                    {path.icon}
                  </strong>
                </div>

                <small>
                  {path.type}
                </small>

                <h4>
                  {path.title}
                </h4>

                <p>
                  {path.description}
                </p>

                <div className="dashboard-learning-progress">
                  <div>
                    <span>
                      {path.progress}% complete
                    </span>

                    <span>
                      {path.level}
                    </span>
                  </div>

                  <div className="skill-bar">
                    <div
                      style={{
                        width: `${path.progress}%`,
                      }}
                    />
                  </div>
                </div>

                <strong className="dashboard-card-arrow">
                  Open path →
                </strong>
              </Link>
            ))}
          </div>
        </section>

        {/* METHOD */}

        <section className="dashboard-panel cyhi-dashboard-method">
          <div className="dashboard-method-copy">
            <span className="panel-kicker">
              HOW YOU LEARN
            </span>

            <h2>
              Understand it.
              <br />
              <span>Apply it.</span>
              <br />
              Explain it.
            </h2>

            <p>
              CY-HI separates technical knowledge from
              investigative practice so you understand what
              you're looking at before you're asked to make
              decisions from it.
            </p>
          </div>

          <div className="dashboard-method-grid">
            <Link
              href="/learning/digital-evidence"
              className="dashboard-method-step"
            >
              <span>01</span>
              <small>LEARN</small>

              <h3>
                Understand the concept.
              </h3>

              <p>
                Build the technical foundation before entering
                an investigation.
              </p>

              <strong>
                Start foundation →
              </strong>
            </Link>

            <Link
              href="/learning/evidence-analysis"
              className="dashboard-method-step featured"
            >
              <span>02</span>
              <small>APPLY</small>

              <h3>
                Put knowledge into practice.
              </h3>

              <p>
                Analyse evidence and recognise when a technique
                actually matters.
              </p>

              <strong>
                Explore analysis →
              </strong>
            </Link>

            <Link
              href="/learning/attacker-thinking"
              className="dashboard-method-step"
            >
              <span>03</span>
              <small>UNDERSTAND</small>

              <h3>
                Understand the why.
              </h3>

              <p>
                Connect technical findings with context,
                behaviour and intent.
              </p>

              <strong>
                Explore behaviour →
              </strong>
            </Link>
          </div>
        </section>

        {/* SKILLS */}

        <section className="dashboard-panel skills-panel">
          <div className="panel-heading">
            <div>
              <span className="panel-kicker">
                DEVELOPMENT
              </span>

              <h3>
                Your current skill profile
              </h3>
            </div>

            <Link
              href="/skills"
              className="text-action"
            >
              View full profile →
            </Link>
          </div>

          <div className="skill-list">
            {skills.map(([name, level, value]) => (
              <div
                className="skill-row"
                key={name}
              >
                <div className="skill-info">
                  <span>{name}</span>
                  <small>{level}</small>
                </div>

                <div className="skill-bar">
                  <div
                    style={{
                      width: `${value}%`,
                    }}
                  />
                </div>

                <strong>
                  {value}%
                </strong>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}

        <section className="learning-next dashboard-bottom-cta">
          <div>
            <span className="hero-kicker">
              THE NEXT STEP
            </span>

            <h2>
              Knowledge becomes useful
              <span> when you can apply it.</span>
            </h2>

            <p>
              Once you've developed the underlying concepts,
              missions give you the opportunity to use them
              against realistic evidence.
            </p>
          </div>

          <Link
            href="/missions"
            className="primary-action"
          >
            Explore investigations →
          </Link>
        </section>

      </main>
    </div>
  );
}