"use client";

import Link from "next/link";
import RightSidebar from "@/components/RightSidebar";

const achievements = [
  {
    icon: "★",
    title: "Evidence Hunter",
    description:
      "Complete your first evidence-analysis investigation.",
    status: "UNLOCKED",
    date: "3 days ago",
  },
  {
    icon: "◈",
    title: "First Investigation",
    description:
      "Complete your first CY-HI mission.",
    status: "UNLOCKED",
    date: "5 days ago",
  },
  {
    icon: "⌁",
    title: "Seven Day Streak",
    description:
      "Learn or investigate for seven consecutive days.",
    status: "IN PROGRESS",
    progress: 6,
    target: 7,
  },
  {
    icon: "◎",
    title: "Case Closer",
    description:
      "Complete five investigations.",
    status: "IN PROGRESS",
    progress: 1,
    target: 5,
  },
  {
    icon: "◇",
    title: "Skill Builder",
    description:
      "Reach Intermediate level in three skills.",
    status: "LOCKED",
  },
  {
    icon: "★",
    title: "Investigator",
    description:
      "Complete ten investigations.",
    status: "LOCKED",
  },
];

export default function AchievementsPage() {
  const unlocked = achievements.filter(
    (item) => item.status === "UNLOCKED"
  ).length;

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
              PROGRESS WORKSPACE
            </span>

            <h1>
              Achievements
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
              YOUR PROGRESS
            </span>

            <h2>
              Every investigation
              <span> leaves a mark.</span>
            </h2>

            <p>
              Achievements recognise the habits, skills and
              milestones you build throughout your investigation
              journey.
            </p>
          </div>

          <div className="level-card">
            <div className="level-card-top">
              <span>UNLOCKED</span>
              <strong>
                {unlocked}
              </strong>
            </div>

            <div className="mission-summary-ring">
              <div>
                <strong>
                  {Math.round(
                    (unlocked / achievements.length) *
                      100
                  )}
                  %
                </strong>

                <span>COMPLETE</span>
              </div>
            </div>

            <div className="level-progress">
              <div className="level-progress-label">
                <span>
                  Achievement progress
                </span>

                <span>
                  {unlocked}/{achievements.length}
                </span>
              </div>

              <div className="level-progress-track">
                <div
                  className="level-progress-fill"
                  style={{
                    width: `${
                      (unlocked /
                        achievements.length) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="student-stats">
          <div className="stat-card">
            <span className="stat-icon">★</span>
            <div>
              <span className="stat-label">
                UNLOCKED
              </span>
              <strong>{unlocked}</strong>
              <small>Achievements earned</small>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">◈</span>
            <div>
              <span className="stat-label">
                IN PROGRESS
              </span>
              <strong>2</strong>
              <small>Almost there</small>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">◇</span>
            <div>
              <span className="stat-label">
                LOCKED
              </span>
              <strong>2</strong>
              <small>More to discover</small>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">✓</span>
            <div>
              <span className="stat-label">
                LATEST
              </span>
              <strong>3d</strong>
              <small>Evidence Hunter</small>
            </div>
          </div>
        </section>

        <section className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <span className="panel-kicker">
                ACHIEVEMENT BOARD
              </span>

              <h3>
                Your milestones
              </h3>
            </div>
          </div>

          <div className="achievement-grid">
            {achievements.map((achievement) => (
              <div
                className={`achievement-card ${
                  achievement.status ===
                  "UNLOCKED"
                    ? "achievement-unlocked"
                    : ""
                } ${
                  achievement.status === "LOCKED"
                    ? "achievement-locked"
                    : ""
                }`}
                key={achievement.title}
              >
                <div className="achievement-icon">
                  {achievement.icon}
                </div>

                <div className="achievement-copy">
                  <span className="achievement-status">
                    {achievement.status}
                  </span>

                  <h4>
                    {achievement.title}
                  </h4>

                  <p>
                    {achievement.description}
                  </p>

                  {achievement.progress !==
                    undefined && (
                    <div className="achievement-progress">
                      <div className="skill-bar">
                        <div
                          style={{
                            width: `${
                              (achievement.progress /
                                achievement.target!) *
                              100
                            }%`,
                          }}
                        />
                      </div>

                      <span>
                        {achievement.progress}/
                        {achievement.target}
                      </span>
                    </div>
                  )}

                  {achievement.date && (
                    <small>
                      Earned {achievement.date}
                    </small>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="learning-next dashboard-bottom-cta">
          <div>
            <span className="hero-kicker">
              KEEP GOING
            </span>

            <h2>
              Your next achievement
              <span> is already waiting.</span>
            </h2>

            <p>
              Keep learning, investigating and building your
              skills. Progress through CY-HI naturally unlocks
              new milestones.
            </p>
          </div>

          <Link
            href="/missions"
            className="primary-action"
          >
            Continue investigating →
          </Link>
        </section>

      </main>
    </div>
  );
}