"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import RightSidebar from "@/components/RightSidebar";
import { apiGet } from "@/lib/api";
import { getToken } from "@/lib/auth";

interface UserData {
  id: number;
  username: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  role: string;
  is_active: boolean;
}

interface XPData {
  user_id: number;
  xp: number;
}

interface LevelData {
  user_id: number;
  xp: number;
  level: number;
}

function getLevelProgress(xp: number, level: number) {
  const thresholds = [0, 100, 250, 500, 1000, 2000];

  const currentThreshold =
    thresholds[Math.min(level - 1, thresholds.length - 1)] ?? 0;

  const nextThreshold =
    thresholds[level] ?? currentThreshold + 1000;

  const range = nextThreshold - currentThreshold;

  const progress =
    range > 0
      ? Math.min(
          100,
          Math.max(
            0,
            Math.round(
              ((xp - currentThreshold) / range) * 100
            )
          )
        )
      : 100;

  const remaining = Math.max(0, nextThreshold - xp);

  return {
    progress,
    remaining,
    nextLevel: level + 1,
  };
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [xpData, setXpData] = useState<XPData | null>(null);
  const [levelData, setLevelData] = useState<LevelData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        // =====================================================
        // CHECK AUTHENTICATION
        // =====================================================

        const token = getToken();

        if (!token) {
          window.location.href = "/login";
          return;
        }

        // =====================================================
        // LOAD CURRENT USER
        // =====================================================

        let userResponse: UserData;

        try {
          userResponse = await apiGet("/api/auth/me");
        } catch (err) {
          console.error("Failed to load current user:", err);

          // Token is invalid or expired.
          // Clear both token names because the application
          // currently supports both.
          if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("access_token");
          }

          window.location.href = "/login";
          return;
        }

        setUser(userResponse);

        // =====================================================
        // LOAD XP
        // =====================================================

        try {
          const xpResponse = await apiGet("/api/progress/xp/me");
          setXpData(xpResponse);
        } catch (err) {
          console.error("Failed to load XP:", err);
        }

        // =====================================================
        // LOAD LEVEL
        // =====================================================

        try {
          const levelResponse = await apiGet(
            "/api/progress/level/me"
          );

          setLevelData(levelResponse);
        } catch (err) {
          console.error("Failed to load level:", err);
        }

      } catch (err) {
        console.error("Failed to load dashboard:", err);
        setError("Unable to load your account data.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const userName =
    user?.first_name ||
    user?.username ||
    "Student";

  const xp =
    xpData?.xp ??
    levelData?.xp ??
    0;

  const level =
    levelData?.level ??
    1;

  const {
    progress,
    remaining,
    nextLevel,
  } = getLevelProgress(xp, level);

  return (
    <div className="student-app cyhi-dashboard">
      <RightSidebar />

      <main className="student-main">

        {/* =====================================================
            TOP BAR
        ===================================================== */}

        <header className="student-topbar">

          <div>

            <span className="eyebrow">
              STUDENT WORKSPACE
            </span>

            <h1>
              {loading
                ? "Loading your workspace..."
                : `Good to see you, ${userName}.`}
            </h1>

            {error && (
              <p
                style={{
                  marginTop: "6px",
                  color: "#f87171",
                  fontSize: "13px",
                }}
              >
                {error}
              </p>
            )}

          </div>

          <div className="student-topbar-actions">

            <button
              className="icon-button"
              title="Notifications"
              type="button"
            >
              â—Œ
            </button>

            <Link
              href="/profile"
              className="topbar-avatar"
            >
              {user
                ? `${user.first_name?.[0] ?? ""}${user.last_name?.[0] ?? ""}` ||
                  user.username.slice(0, 2).toUpperCase()
                : "ST"}
            </Link>

          </div>

        </header>


        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="student-hero cyhi-dashboard-hero">

          <div className="student-hero-copy">

            <span className="hero-kicker">
              YOUR INVESTIGATION JOURNEY
            </span>

            <h2>
              Learn to think like a
              <span> cyber investigator.</span>
            </h2>

            <p>
              Build practical skills through investigations,
              evidence analysis, realistic scenarios and
              understanding how attackers think.
            </p>

            <div className="hero-actions">

              <Link
                href="/learning"
                className="primary-action"
              >
                Continue Learning â†’
              </Link>

              <Link
                href="/missions"
                className="secondary-action"
              >
                Explore Missions
              </Link>

            </div>

          </div>


          {/* ===================================================
              LEVEL
          =================================================== */}

          <div className="level-card">

            <div className="level-card-top">

              <span>
                LEVEL
              </span>

              <strong>
                {loading
                  ? "--"
                  : String(level).padStart(2, "0")}
              </strong>

            </div>

            <div className="level-ring">

              <div className="level-ring-inner">

                <strong>
                  {loading
                    ? "â€”"
                    : xp.toLocaleString()}
                </strong>

                <span>
                  XP
                </span>

              </div>

            </div>

            <div className="level-progress">

              <div className="level-progress-label">

                <span>
                  {loading
                    ? "Loading XP..."
                    : remaining > 0
                      ? `${remaining} XP to Level ${nextLevel}`
                      : "Maximum level reached"}
                </span>

                <span>
                  {loading
                    ? "â€”"
                    : `${progress}%`}
                </span>

              </div>

              <div className="level-progress-track">

                <div
                  className="level-progress-fill"
                  style={{
                    width: `${loading ? 0 : progress}%`,
                  }}
                />

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            QUICK STATS
        ===================================================== */}

        <section className="student-stats">

          <Link
            href="/missions"
            className="stat-card"
          >

            <span className="stat-icon">
              â—ˆ
            </span>

            <div>

              <span className="stat-label">
                MISSIONS
              </span>

              <strong>
                12
              </strong>

              <small>
                4 completed this week
              </small>

            </div>

          </Link>


          <Link
            href="/skills"
            className="stat-card"
          >

            <span className="stat-icon">
              â—‡
            </span>

            <div>

              <span className="stat-label">
                SKILLS
              </span>

              <strong>
                8
              </strong>

              <small>
                3 currently developing
              </small>

            </div>

          </Link>


          <Link
            href="/activity"
            className="stat-card"
          >

            <span className="stat-icon">
              â˜…
            </span>

            <div>

              <span className="stat-label">
                STREAK
              </span>

              <strong>
                6 days
              </strong>

              <small>
                Keep it going
              </small>

            </div>

          </Link>


          <Link
            href="/activity"
            className="stat-card"
          >

            <span className="stat-icon">
              âœ“
            </span>

            <div>

              <span className="stat-label">
                ACCURACY
              </span>

              <strong>
                84%
              </strong>

              <small>
                Across investigations
              </small>

            </div>

          </Link>

        </section>


        {/* =====================================================
            MAIN GRID
        ===================================================== */}

        <section className="student-content-grid">


          {/* ===================================================
              CURRENT INVESTIGATION
          =================================================== */}

          <div className="dashboard-panel current-mission">

            <div className="panel-heading">

              <div>

                <span className="panel-kicker">
                  CONTINUE
                </span>

                <h3>
                  Your current investigation
                </h3>

              </div>

              <span className="status-pill">
                IN PROGRESS
              </span>

            </div>


            <div className="mission-visual">

              <div className="mission-number">
                03
              </div>

              <div>

                <span className="mission-type">
                  DIGITAL FORENSICS
                </span>

                <h4>
                  Suspicious USB Device
                </h4>

                <p>
                  Investigate a suspicious device and determine
                  how it was used to compromise a workstation.
                </p>

              </div>

            </div>


            <div className="mission-footer">

              <div className="mission-progress">

                <div className="mission-progress-label">

                  <span>
                    Investigation progress
                  </span>

                  <span>
                    80%
                  </span>

                </div>

                <div className="mission-progress-track">

                  <div
                    className="mission-progress-fill"
                    style={{
                      width: "80%",
                    }}
                  />

                </div>

              </div>

              <Link
                href="/missions/suspicious-usb-device"
                className="primary-action"
              >
                Resume â†’
              </Link>

            </div>

          </div>


          {/* ===================================================
              RECOMMENDED
          =================================================== */}

          <div className="dashboard-panel next-panel">

            <div className="panel-heading">

              <div>

                <span className="panel-kicker">
                  UP NEXT
                </span>

                <h3>
                  Recommended for you
                </h3>

              </div>

            </div>


            <Link
              href="/missions/trace-the-intrusion"
              className="recommended-card"
            >

              <span className="recommend-icon">
                01
              </span>

              <div>

                <span className="mission-type">
                  NETWORK FORENSICS
                </span>

                <h4>
                  Trace the Intrusion
                </h4>

                <p>
                  Follow network activity to identify
                  suspicious behaviour and reconstruct
                  how an attacker entered the environment.
                </p>

                <div className="recommend-meta">

                  <span>
                    INTERMEDIATE
                  </span>

                  <span>
                    +400 XP
                  </span>

                  <span>
                    ~45 MIN
                  </span>

                </div>

              </div>

            </Link>


            <Link
              href="/missions"
              className="outline-action"
            >
              View all missions
            </Link>

          </div>

        </section>


        {/* =====================================================
            SKILLS
        ===================================================== */}

        <section className="dashboard-panel skills-panel">

          <div className="panel-heading">

            <div>

              <span className="panel-kicker">
                DEVELOPMENT
              </span>

              <h3>
                Skills you're building
              </h3>

            </div>

            <Link
              href="/skills"
              className="text-action"
            >
              View skills â†’
            </Link>

          </div>


          <div className="skill-list">

            <div className="skill-row">

              <div className="skill-info">

                <span>
                  Digital Evidence Analysis
                </span>

                <small>
                  Advanced
                </small>

              </div>

              <div className="skill-bar">
                <div style={{ width: "82%" }} />
              </div>

              <strong>
                82%
              </strong>

            </div>


            <div className="skill-row">

              <div className="skill-info">

                <span>
                  Timeline Reconstruction
                </span>

                <small>
                  Intermediate
                </small>

              </div>

              <div className="skill-bar">
                <div style={{ width: "64%" }} />
              </div>

              <strong>
                64%
              </strong>

            </div>


            <div className="skill-row">

              <div className="skill-info">

                <span>
                  Network Investigation
                </span>

                <small>
                  Developing
                </small>

              </div>

              <div className="skill-bar">
                <div style={{ width: "41%" }} />
              </div>

              <strong>
                41%
              </strong>

            </div>


            <div className="skill-row">

              <div className="skill-info">

                <span>
                  Attacker Behaviour
                </span>

                <small>
                  Developing
                </small>

              </div>

              <div className="skill-bar">
                <div style={{ width: "27%" }} />
              </div>

              <strong>
                27%
              </strong>

            </div>

          </div>

        </section>


        {/* =====================================================
            INVESTIGATION JOURNEY
        ===================================================== */}

        <section className="dashboard-panel cyhi-dashboard-method">

          <div className="dashboard-method-copy">

            <span className="panel-kicker">
              YOUR DEVELOPMENT MODEL
            </span>

            <h2>
              Learn the skill.
              <br />
              <span>
                Use the evidence.
              </span>
              <br />
              Explain the why.
            </h2>

            <p>
              CY-HI is designed to move you from understanding
              a technical concept to actually using it inside
              an investigation. Each stage develops a different
              part of your investigative judgement.
            </p>

          </div>


          <div className="dashboard-method-grid">

            <Link
              href="/learning"
              className="dashboard-method-step"
            >

              <span>
                01
              </span>

              <small>
                LEARN
              </small>

              <h3>
                Build the foundation.
              </h3>

              <p>
                Understand the technical concepts before
                you're asked to interpret evidence.
              </p>

              <strong>
                Open learning â†’
              </strong>

            </Link>


            <Link
              href="/missions"
              className="dashboard-method-step featured"
            >

              <span>
                02
              </span>

              <small>
                INVESTIGATE
              </small>

              <h3>
                Put knowledge into practice.
              </h3>

              <p>
                Work through realistic evidence and decide
                what should be examined next.
              </p>

              <strong>
                Explore missions â†’
              </strong>

            </Link>


            <Link
              href="/skills"
              className="dashboard-method-step"
            >

              <span>
                03
              </span>

              <small>
                UNDERSTAND
              </small>

              <h3>
                Connect the evidence.
              </h3>

              <p>
                Develop the reasoning needed to explain
                what happened and why it matters.
              </p>

              <strong>
                View skills â†’
              </strong>

            </Link>

          </div>

        </section>


        {/* =====================================================
            RECENT ACTIVITY
        ===================================================== */}

        <section className="dashboard-panel activity-panel">

          <div className="panel-heading">

            <div>

              <span className="panel-kicker">
                RECENT ACTIVITY
              </span>

              <h3>
                Your investigation history
              </h3>

            </div>

            <Link
              href="/activity"
              className="text-action"
            >
              View activity â†’
            </Link>

          </div>


          <div className="activity-list">

            <div className="activity-item">

              <span className="activity-dot completed" />

              <div>

                <strong>
                  Completed Log File Analysis
                </strong>

                <span>
                  Intermediate mission Â· +300 XP
                </span>

              </div>

              <time>
                Today
              </time>

            </div>


            <div className="activity-item">

              <span className="activity-dot" />

              <div>

                <strong>
                  Started Suspicious USB Device
                </strong>

                <span>
                  Digital forensics Â· 80% complete
                </span>

              </div>

              <time>
                Yesterday
              </time>

            </div>


            <div className="activity-item">

              <span className="activity-dot completed" />

              <div>

                <strong>
                  Earned Evidence Hunter badge
                </strong>

                <span>
                  Achievement unlocked
                </span>

              </div>

              <time>
                3 days ago
              </time>

            </div>

          </div>

        </section>

      </main>
    </div>
  );
}
