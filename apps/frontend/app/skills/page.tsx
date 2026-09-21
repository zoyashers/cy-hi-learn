"use client";

import Link from "next/link";
import RightSidebar from "@/components/RightSidebar";

const skills = [
  {
    name: "Digital Evidence Analysis",
    level: "Advanced",
    value: 82,
    description:
      "Interpreting files, artefacts and evidence from digital systems.",
  },
  {
    name: "Timeline Reconstruction",
    level: "Intermediate",
    value: 64,
    description:
      "Connecting timestamps and artefacts to reconstruct what happened.",
  },
  {
    name: "Network Investigation",
    level: "Developing",
    value: 41,
    description:
      "Identifying suspicious traffic and reconstructing network activity.",
  },
  {
    name: "Attacker Behaviour",
    level: "Developing",
    value: 27,
    description:
      "Understanding behaviour, intent and attack patterns.",
  },
  {
    name: "Windows Forensics",
    level: "Developing",
    value: 38,
    description:
      "Understanding Windows artefacts and system-level evidence.",
  },
  {
    name: "Incident Reasoning",
    level: "Developing",
    value: 45,
    description:
      "Building defensible conclusions from multiple evidence sources.",
  },
];

export default function SkillsPage() {
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
              DEVELOPMENT WORKSPACE
            </span>

            <h1>
              Skills
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
              YOUR DEVELOPMENT PROFILE
            </span>

            <h2>
              Build capability,
              <span> not just knowledge.</span>
            </h2>

            <p>
              Your skills grow as you learn, investigate and
              make decisions across CY-HI.
            </p>

            <div className="hero-actions">
              <Link
                href="/learning"
                className="primary-action"
              >
                Develop a skill →
              </Link>

              <Link
                href="/missions"
                className="secondary-action"
              >
                Practise in missions
              </Link>
            </div>
          </div>

          <div className="level-card">
            <div className="level-card-top">
              <span>SKILLS</span>
              <strong>08</strong>
            </div>

            <div className="mission-summary-ring">
              <div>
                <strong>52%</strong>
                <span>AVERAGE</span>
              </div>
            </div>

            <div className="level-progress">
              <div className="level-progress-label">
                <span>Overall development</span>
                <span>52%</span>
              </div>

              <div className="level-progress-track">
                <div
                  className="level-progress-fill"
                  style={{ width: "52%" }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="student-stats">
          <div className="stat-card">
            <span className="stat-icon">◇</span>
            <div>
              <span className="stat-label">
                SKILLS
              </span>
              <strong>8</strong>
              <small>Tracked skills</small>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">↑</span>
            <div>
              <span className="stat-label">
                ADVANCED
              </span>
              <strong>1</strong>
              <small>Strongest area</small>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">◈</span>
            <div>
              <span className="stat-label">
                DEVELOPING
              </span>
              <strong>5</strong>
              <small>Current focus areas</small>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">★</span>
            <div>
              <span className="stat-label">
                AVERAGE
              </span>
              <strong>52%</strong>
              <small>Across your profile</small>
            </div>
          </div>
        </section>

        {/* =====================================================
            SKILL PROFILE
            ===================================================== */}

        <section className="dashboard-panel skills-panel">
          <div className="panel-heading">
            <div>
              <span className="panel-kicker">
                SKILL PROFILE
              </span>

              <h3>
                Your investigative capabilities
              </h3>
            </div>
          </div>

          <div className="skills-full-list">
            {skills.map((skill) => (
              <div
                className="skill-development-card"
                key={skill.name}
              >
                <div className="skill-development-top">
                  <div>
                    <span>
                      {skill.name}
                    </span>

                    <small>
                      {skill.level}
                    </small>
                  </div>

                  <strong>
                    {skill.value}%
                  </strong>
                </div>

                <div className="skill-bar">
                  <div
                    style={{
                      width: `${skill.value}%`,
                    }}
                  />
                </div>

                <p>
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </section>


        {/* =====================================================
            STRENGTHS & WEAKNESSES
            ===================================================== */}

        <section className="dashboard-panel skills-analysis-panel">

          <div className="skills-analysis-header">
            <div>
              <span className="panel-kicker">
                SKILL ANALYSIS
              </span>

              <h3>
                Strengths & Weaknesses
              </h3>

              <p>
                Your performance across missions and practical
                assessments.
              </p>
            </div>

            <span className="skills-analysis-status">
              LIVE ANALYSIS
            </span>
          </div>


          <div className="skills-analysis-grid">

            {/* STRENGTHS */}

            <div className="skills-analysis-column strengths">

              <div className="skills-analysis-column-header">
                <span>01</span>

                <div>
                  <strong>
                    STRENGTHS
                  </strong>

                  <p>
                    Areas you're performing strongly in
                  </p>
                </div>
              </div>


              <div className="skill-analysis-item">

                <div className="skill-analysis-top">
                  <strong>
                    Network Analysis
                  </strong>

                  <span>
                    86%
                  </span>
                </div>

                <div className="skill-analysis-track">
                  <div
                    style={{
                      width: "86%",
                    }}
                  />
                </div>

                <span className="skill-analysis-note">
                  Consistently strong performance
                </span>

              </div>


              <div className="skill-analysis-item">

                <div className="skill-analysis-top">
                  <strong>
                    Digital Forensics
                  </strong>

                  <span>
                    78%
                  </span>
                </div>

                <div className="skill-analysis-track">
                  <div
                    style={{
                      width: "78%",
                    }}
                  />
                </div>

                <span className="skill-analysis-note">
                  Above average across recent missions
                </span>

              </div>

            </div>


            {/* WEAKNESSES */}

            <div className="skills-analysis-column weaknesses">

              <div className="skills-analysis-column-header">
                <span>02</span>

                <div>
                  <strong>
                    WEAKNESSES
                  </strong>

                  <p>
                    Areas requiring more attention
                  </p>
                </div>
              </div>


              <div className="skill-analysis-item">

                <div className="skill-analysis-top">
                  <strong>
                    Windows Internals
                  </strong>

                  <span>
                    43%
                  </span>
                </div>

                <div className="skill-analysis-track">
                  <div
                    style={{
                      width: "43%",
                    }}
                  />
                </div>

                <span className="skill-analysis-note">
                  Priority area for improvement
                </span>

              </div>


              <div className="skill-analysis-item">

                <div className="skill-analysis-top">
                  <strong>
                    Incident Response
                  </strong>

                  <span>
                    38%
                  </span>
                </div>

                <div className="skill-analysis-track">
                  <div
                    style={{
                      width: "38%",
                    }}
                  />
                </div>

                <span className="skill-analysis-note">
                  Recommended focus area
                </span>

              </div>

            </div>

          </div>


          {/* DEVELOPING */}

          <div className="skills-developing">

            <div className="skills-developing-header">
              <div>
                <span className="panel-kicker">
                  03
                </span>

                <strong>
                  DEVELOPING
                </strong>
              </div>

              <span>
                CONTINUE BUILDING
              </span>
            </div>

            <div className="developing-skill">

              <div>
                <strong>
                  Python
                </strong>

                <span>
                  Developing — needs more practical work
                </span>
              </div>

              <div className="developing-progress">

                <span>
                  61%
                </span>

                <div className="skill-analysis-track">
                  <div
                    style={{
                      width: "61%",
                    }}
                  />
                </div>

              </div>

            </div>

          </div>


          {/* RECOMMENDED FOCUS */}

          <div className="skills-recommendation">

            <div className="recommendation-number">
              04
            </div>

            <div className="recommendation-content">

              <span>
                RECOMMENDED FOCUS
              </span>

              <h3>
                Windows Internals + Incident Response
              </h3>

              <p>
                These are currently your weakest areas.
                Completing investigation-based missions in
                both areas should help strengthen your practical
                performance.
              </p>

            </div>

            <Link
              href="/missions"
              className="recommendation-action"
            >
              VIEW MISSIONS →
            </Link>

          </div>

        </section>


        {/* =====================================================
            CTA
            ===================================================== */}

        <section className="learning-next dashboard-bottom-cta">

          <div>
            <span className="hero-kicker">
              KEEP DEVELOPING
            </span>

            <h2>
              The strongest skill
              <span> is knowing when to use it.</span>
            </h2>

            <p>
              Build your technical knowledge through Learning,
              then reinforce it by applying it inside real
              investigations.
            </p>
          </div>

          <Link
            href="/learning"
            className="primary-action"
          >
            Continue learning →
          </Link>

        </section>

      </main>
    </div>
  );
}