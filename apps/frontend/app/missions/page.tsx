"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import RightSidebar from "@/components/RightSidebar";

type ApiMission = {
  id: number;
  title: string;
  category: string;
  description: string;
  difficulty: string;
  xp_reward: number;
  badge_reward?: string | null;
  is_active: boolean;
  created_at: string;
  status: string;
  progress: number;
  score: number;
};

type Mission = {
  id: string;
  backendId: number;
  title: string;
  category: string;
  description: string;
  difficulty: string;
  xp: number;
  duration: string;
  status: string;
  progress: number;
  href: string;
  visualType: "forensics" | "network" | "incident" | "threat" | "general";
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

/* =========================================================
   INVESTIGATION STAGES
   ========================================================= */

const stages = [
  {
    number: "01",
    icon: "⌁",
    label: "THINK",
    title: "Follow the evidence.",
    short:
      "Learn how to identify the evidence that actually matters.",
    contextTitle: "Start with the right questions.",
    contextText:
      "Before touching the evidence, establish what you are actually trying to determine. Strong investigators do not examine everything equally. They identify what could prove, disprove or change their understanding of the incident.",
    points: [
      "Define the question you are trying to answer.",
      "Identify which evidence could provide useful information.",
      "Challenge assumptions before drawing conclusions.",
    ],
    href: "/learning",
    action: "Open learning →",
  },
  {
    number: "02",
    icon: "◈",
    label: "INVESTIGATE",
    title: "Make the connection.",
    short:
      "Practise connecting evidence and reconstructing events.",
    contextTitle: "Build the incident from evidence.",
    contextText:
      "Investigation is about connecting individual observations into a coherent timeline. A suspicious file may mean little on its own, but when combined with logs, network activity and user behaviour, it can reveal what actually happened.",
    points: [
      "Correlate evidence from different sources.",
      "Reconstruct events in the correct sequence.",
      "Look for relationships between technical indicators.",
    ],
    href: "/missions",
    action: "Explore missions →",
  },
  {
    number: "03",
    icon: "◎",
    label: "EXPLAIN",
    title: "Defend your findings.",
    short:
      "Turn your investigation into a defensible conclusion.",
    contextTitle: "Turn evidence into a defensible conclusion.",
    contextText:
      "A good investigation does not stop when something suspicious is found. You need to explain what happened, why you believe it happened and which evidence supports your conclusion.",
    points: [
      "Separate confirmed facts from assumptions.",
      "Explain why each important piece of evidence matters.",
      "Build a conclusion another investigator could challenge.",
    ],
    href: "/skills",
    action: "View investigator skills →",
  },
];

/* =========================================================
   AUTH
   ========================================================= */

function getAuthToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return (
    localStorage.getItem("access_token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("auth_token")
  );
}

/* =========================================================
   HELPERS
   ========================================================= */

function formatDifficulty(value: string) {
  const normalized = value?.toLowerCase().replace(/_/g, " ");

  if (normalized.includes("hard") || normalized.includes("advanced")) {
    return "HARD";
  }

  if (
    normalized.includes("medium") ||
    normalized.includes("intermediate")
  ) {
    return "MEDIUM";
  }

  return "EASY";
}

function getDifficultyDescription(difficulty: string) {
  switch (difficulty) {
    case "HARD":
      return "Complex evidence · minimal guidance";

    case "MEDIUM":
      return "Independent investigation · mixed evidence";

    default:
      return "Guided investigation · focused evidence";
  }
}

function getMissionHref(title: string, id: number) {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug
    ? `/missions/${slug}`
    : `/missions/${id}`;
}

function getVisualType(category: string): Mission["visualType"] {
  const value = category?.toLowerCase() || "";

  if (
    value.includes("network") ||
    value.includes("traffic") ||
    value.includes("packet")
  ) {
    return "network";
  }

  if (
    value.includes("incident") ||
    value.includes("response") ||
    value.includes("timeline")
  ) {
    return "incident";
  }

  if (
    value.includes("threat") ||
    value.includes("malware") ||
    value.includes("intel")
  ) {
    return "threat";
  }

  if (
    value.includes("forensic") ||
    value.includes("forensics") ||
    value.includes("file") ||
    value.includes("log")
  ) {
    return "forensics";
  }

  return "general";
}

function getVisualLabel(type: Mission["visualType"]) {
  switch (type) {
    case "network":
      return "NETWORK";

    case "incident":
      return "INCIDENT";

    case "threat":
      return "THREAT";

    case "forensics":
      return "FORENSICS";

    default:
      return "INVESTIGATION";
  }
}

function getVisualSymbol(type: Mission["visualType"]) {
  switch (type) {
    case "network":
      return "⌁";

    case "incident":
      return "◉";

    case "threat":
      return "◇";

    case "forensics":
      return "◈";

    default:
      return "◎";
  }
}

function mapMission(mission: ApiMission): Mission {
  const difficulty = formatDifficulty(mission.difficulty);

  return {
    id: String(mission.id).padStart(2, "0"),
    backendId: mission.id,
    title: mission.title,
    category:
      mission.category?.toUpperCase() || "CYBER FORENSICS",
    description:
      mission.description ||
      "Investigate the evidence and determine what happened.",
    difficulty,
    xp: mission.xp_reward,
    duration: "MISSION",
    status: mission.status,
    progress: mission.progress || 0,
    href: getMissionHref(
      mission.title,
      mission.id
    ),
    visualType: getVisualType(
      mission.category
    ),
  };
}

/* =========================================================
   PAGE
   ========================================================= */

export default function MissionsPage() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeStage, setActiveStage] = useState("01");

  /* =======================================================
     LOAD MISSIONS
     ======================================================= */

  useEffect(() => {
    let cancelled = false;

    async function loadMissions() {
      try {
        setLoading(true);
        setError("");

        const token = getAuthToken();

        if (!token) {
          throw new Error("You are not signed in.");
        }

        const response = await fetch(
          `${API_URL}/api/missions/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
            cache: "no-store",
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error(
              "Your session has expired. Please sign in again."
            );
          }

          throw new Error(
            `Unable to load missions (${response.status}).`
          );
        }

        const data: ApiMission[] =
          await response.json();

        if (!cancelled) {
          setMissions(
            data
              .filter(
                (mission) => mission.is_active
              )
              .map(mapMission)
          );
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load missions."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadMissions();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =======================================================
     STATS
     ======================================================= */

  const completed = useMemo(
    () =>
      missions.filter(
        (mission) =>
          mission.status === "COMPLETED"
      ).length,
    [missions]
  );

  const inProgress = useMemo(
    () =>
      missions.find(
        (mission) =>
          mission.status === "IN PROGRESS"
      ),
    [missions]
  );

  const available = useMemo(
    () =>
      missions.filter(
        (mission) =>
          mission.status === "AVAILABLE"
      ).length,
    [missions]
  );

  const totalXp = useMemo(
    () =>
      missions
        .filter(
          (mission) =>
            mission.status === "COMPLETED"
        )
        .reduce(
          (total, mission) =>
            total + mission.xp,
          0
        ),
    [missions]
  );

  const completionPercentage =
    missions.length > 0
      ? Math.round(
          (completed / missions.length) * 100
        )
      : 0;

  const selectedStage =
    stages.find(
      (stage) =>
        stage.number === activeStage
    ) || stages[0];

  /* =======================================================
     DIFFICULTY COUNTS
     ======================================================= */

  const easyCount = missions.filter(
    (mission) =>
      mission.difficulty === "EASY"
  ).length;

  const mediumCount = missions.filter(
    (mission) =>
      mission.difficulty === "MEDIUM"
  ).length;

  const hardCount = missions.filter(
    (mission) =>
      mission.difficulty === "HARD"
  ).length;

  return (
    <div className="student-app cyhi-dashboard-style-page">

      <RightSidebar />

      <main className="student-main">

        {/* =================================================
            TOP BAR
        ================================================= */}

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
              Missions
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

        {/* =================================================
            HERO
        ================================================= */}

        <section className="student-hero inner-page-hero">

          <div className="student-hero-copy">

            <span className="hero-kicker">
              PRACTICAL INVESTIGATION
            </span>

            <h2>
              Don't just learn
              <span> cybersecurity.</span>
              <br />
              Investigate it.
            </h2>

            <p>
              Missions are short, repeatable investigations
              designed to turn cybersecurity knowledge into
              practical investigative ability.
            </p>

            <div className="hero-actions">

              <Link
                href={
                  inProgress
                    ? inProgress.href
                    : missions.length > 0
                    ? missions[0].href
                    : "/missions"
                }
                className="primary-action"
              >
                {inProgress
                  ? "Resume investigation →"
                  : "Start investigation →"}
              </Link>

              <Link
                href="/cases"
                className="secondary-action"
              >
                Compare with case files
              </Link>

            </div>

          </div>

          {/* HERO SUMMARY */}

          <div className="level-card">

            <div className="level-card-top">

              <span>
                ACTIVE MISSIONS
              </span>

              <strong>
                {loading
                  ? "—"
                  : missions.length}
              </strong>

            </div>

            <div className="mission-summary-ring">

              <div>

                <strong>
                  {loading
                    ? "—"
                    : completed}
                </strong>

                <span>
                  COMPLETED
                </span>

              </div>

            </div>

            <div className="level-progress">

              <div className="level-progress-label">

                <span>
                  {loading
                    ? "Loading..."
                    : `${completed} of ${missions.length}`}
                </span>

                <span>
                  {loading
                    ? "—"
                    : `${completionPercentage}%`}
                </span>

              </div>

              <div className="level-progress-track">

                <div
                  className="level-progress-fill"
                  style={{
                    width: `${completionPercentage}%`,
                  }}
                />

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            MISSION SYSTEM EXPLAINER
        ================================================= */}

        <section className="dashboard-panel">

          <div className="panel-heading">

            <div>

              <span className="panel-kicker">
                HOW CY-HI WORKS
              </span>

              <h3>
                Learn it. Practise it. Prove it.
              </h3>

              <p>
                Missions sit between learning and full case
                investigations. They give you repeated practice
                before you are expected to handle a complete case.
              </p>

            </div>

          </div>

          <div className="dashboard-method-grid">

            <button
              type="button"
              onClick={() =>
                setActiveStage("01")
              }
              className={`dashboard-method-step ${
                activeStage === "01"
                  ? "featured"
                  : ""
              }`}
              aria-expanded={
                activeStage === "01"
              }
            >

              <span>
                01
              </span>

              <small>
                LEARN
              </small>

              <h3>
                Build the knowledge.
              </h3>

              <p>
                Understand the concepts and investigative
                techniques before applying them.
              </p>

              <strong>
                {activeStage === "01"
                  ? "Learning path ↑"
                  : "Explore learning →"}
              </strong>

            </button>

            <button
              type="button"
              onClick={() =>
                setActiveStage("02")
              }
              className={`dashboard-method-step ${
                activeStage === "02"
                  ? "featured"
                  : ""
              }`}
              aria-expanded={
                activeStage === "02"
              }
            >

              <span>
                02
              </span>

              <small>
                PRACTISE
              </small>

              <h3>
                Investigate the evidence.
              </h3>

              <p>
                Work through focused scenarios and practise
                making investigative decisions.
              </p>

              <strong>
                {activeStage === "02"
                  ? "Mission path ↑"
                  : "Explore missions →"}
              </strong>

            </button>

            <button
              type="button"
              onClick={() =>
                setActiveStage("03")
              }
              className={`dashboard-method-step ${
                activeStage === "03"
                  ? "featured"
                  : ""
              }`}
              aria-expanded={
                activeStage === "03"
              }
            >

              <span>
                03
              </span>

              <small>
                PROVE
              </small>

              <h3>
                Handle the full case.
              </h3>

              <p>
                Combine multiple skills to reconstruct and
                explain a complete investigation.
              </p>

              <strong>
                {activeStage === "03"
                  ? "Case path ↑"
                  : "Explore cases →"}
              </strong>

            </button>

          </div>

          {/* SELECTED STAGE INFORMATION */}

          <div
            className="dashboard-method-context"
            key={selectedStage.number}
          >

            <div className="dashboard-method-context-header">

              <div>

                <span className="panel-kicker">
                  {selectedStage.number} ·{" "}
                  {selectedStage.label}
                </span>

                <h3>
                  {selectedStage.contextTitle}
                </h3>

              </div>

              <span className="status-pill">
                {selectedStage.number === "01"
                  ? "KNOWLEDGE"
                  : selectedStage.number === "02"
                  ? "PRACTICE"
                  : "ASSESSMENT"}
              </span>

            </div>

            <p>
              {selectedStage.contextText}
            </p>

            <div className="dashboard-method-context-points">

              {selectedStage.points.map(
                (point, index) => (
                  <div
                    key={index}
                    className="dashboard-method-context-point"
                  >

                    <span>
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </span>

                    <p>
                      {point}
                    </p>

                  </div>
                )
              )}

            </div>

            <Link
              href={selectedStage.href}
              className="primary-action"
            >
              {selectedStage.action}
            </Link>

          </div>

        </section>

        {/* =================================================
            DIFFICULTY
        ================================================= */}

        <section className="dashboard-panel">

          <div className="panel-heading">

            <div>

              <span className="panel-kicker">
                INVESTIGATION DIFFICULTY
              </span>

              <h3>
                Difficulty changes the investigation.
              </h3>

              <p>
                Higher difficulty does not simply mean a bigger
                number. It means less guidance, more ambiguity
                and a greater need to justify your decisions.
              </p>

            </div>

          </div>

          <div className="student-stats">

            <div className="stat-card">

              <span className="stat-icon">
                01
              </span>

              <div>

                <span className="stat-label">
                  EASY
                </span>

                <strong>
                  {loading ? "—" : easyCount}
                </strong>

                <small>
                  Guided · focused evidence
                </small>

              </div>

            </div>

            <div className="stat-card">

              <span className="stat-icon">
                02
              </span>

              <div>

                <span className="stat-label">
                  MEDIUM
                </span>

                <strong>
                  {loading ? "—" : mediumCount}
                </strong>

                <small>
                  Independent · mixed evidence
                </small>

              </div>

            </div>

            <div className="stat-card">

              <span className="stat-icon">
                03
              </span>

              <div>

                <span className="stat-label">
                  HARD
                </span>

                <strong>
                  {loading ? "—" : hardCount}
                </strong>

                <small>
                  Complex · minimal guidance
                </small>

              </div>

            </div>

          </div>

          <div className="dashboard-method-context">

            <div className="dashboard-method-context-points">

              <div className="dashboard-method-context-point">

                <span>
                  EASY
                </span>

                <p>
                  Smaller evidence sets, clearer indicators
                  and more guidance. The goal is to build the
                  investigation habit.
                </p>

              </div>

              <div className="dashboard-method-context-point">

                <span>
                  MEDIUM
                </span>

                <p>
                  Multiple evidence sources, conflicting clues
                  and fewer hints. You need to decide what
                  matters yourself.
                </p>

              </div>

              <div className="dashboard-method-context-point">

                <span>
                  HARD
                </span>

                <p>
                  Ambiguous evidence, competing explanations
                  and minimal guidance. Your reasoning matters
                  as much as your answer.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <section className="dashboard-panel">

            <div className="panel-heading">

              <div>

                <span className="panel-kicker">
                  MISSION SYSTEM
                </span>

                <h3>
                  Unable to load missions
                </h3>

                <p>
                  {error}
                </p>

              </div>

            </div>

          </section>
        )}

        {/* =================================================
            CONTINUE CURRENT MISSION
        ================================================= */}

        {inProgress && (
          <section className="dashboard-panel">

            <div className="panel-heading">

              <div>

                <span className="panel-kicker">
                  CONTINUE
                </span>

                <h3>
                  Pick up where you left off.
                </h3>

              </div>

              <span className="status-pill">
                IN PROGRESS
              </span>

            </div>

            <Link
              href={inProgress.href}
              className={`dashboard-mission-row mission-${inProgress.visualType}`}
            >

              <div className="dashboard-mission-number">
                {inProgress.id}
              </div>

              <div className="dashboard-mission-main">

                <span className="mission-type">
                  {getVisualLabel(
                    inProgress.visualType
                  )}
                </span>

                <h4>
                  {inProgress.title}
                </h4>

                <p>
                  {inProgress.description}
                </p>

              </div>

              <div className="dashboard-mission-status">

                <span className="mission-status-progress">
                  {inProgress.progress}% COMPLETE
                </span>

                <small>
                  {inProgress.difficulty}
                  <br />
                  +{inProgress.xp} XP
                </small>

              </div>

              <strong className="dashboard-mission-arrow">
                →
              </strong>

            </Link>

          </section>
        )}

        {/* =================================================
            ALL MISSIONS
        ================================================= */}

        <section className="dashboard-panel">

          <div className="panel-heading">

            <div>

              <span className="panel-kicker">
                PRACTICE LIBRARY
              </span>

              <h3>
                Choose an investigation.
              </h3>

              <p>
                Complete missions repeatedly to build
                investigative fluency. A mission is practice;
                a case is proof.
              </p>

            </div>

            <span className="learning-path-count">
              {loading
                ? "LOADING"
                : `${missions.length} ACTIVE`}
            </span>

          </div>

          {/* MISSION CARDS */}

          <div className="dashboard-mission-list">

            {loading && (
              <div className="dashboard-mission-row">

                <div className="dashboard-mission-number">
                  —
                </div>

                <div className="dashboard-mission-main">

                  <span className="mission-type">
                    MISSION SYSTEM
                  </span>

                  <h4>
                    Loading investigations...
                  </h4>

                  <p>
                    Connecting to the CY-HI mission engine.
                  </p>

                </div>

              </div>
            )}

            {!loading &&
              !error &&
              missions.length === 0 && (
                <div className="dashboard-mission-row">

                  <div className="dashboard-mission-number">
                    —
                  </div>

                  <div className="dashboard-mission-main">

                    <span className="mission-type">
                      MISSION SYSTEM
                    </span>

                    <h4>
                      No active missions
                    </h4>

                    <p>
                      There are currently no active
                      investigations available.
                    </p>

                  </div>

                </div>
              )}

            {!loading &&
              missions.map((mission) => (

                <Link
                  key={mission.backendId}
                  href={mission.href}
                  className={`dashboard-mission-row mission-${mission.visualType}`}
                >

                  {/* NUMBER / SYMBOL */}

                  <div className="dashboard-mission-number">

                    <span>
                      {mission.id}
                    </span>

                    <small>
                      {getVisualSymbol(
                        mission.visualType
                      )}
                    </small>

                  </div>

                  {/* MAIN */}

                  <div className="dashboard-mission-main">

                    <span className="mission-type">
                      {getVisualLabel(
                        mission.visualType
                      )}
                    </span>

                    <h4>
                      {mission.title}
                    </h4>

                    <p>
                      {mission.description}
                    </p>

                    <div className="mission-meta-row">

                      <span>
                        {mission.difficulty}
                      </span>

                      <span>
                        +{mission.xp} XP
                      </span>

                      <span>
                        REPEATABLE PRACTICE
                      </span>

                    </div>

                  </div>

                  {/* STATUS */}

                  <div className="dashboard-mission-status">

                    <span
                      className={
                        mission.status ===
                        "COMPLETED"
                          ? "mission-status-complete"
                          : mission.status ===
                            "IN PROGRESS"
                          ? "mission-status-progress"
                          : ""
                      }
                    >
                      {mission.status}
                    </span>

                    <small>
                      {getDifficultyDescription(
                        mission.difficulty
                      )}
                    </small>

                  </div>

                  {/* ARROW */}

                  <strong className="dashboard-mission-arrow">
                    →
                  </strong>

                </Link>

              ))}

          </div>

        </section>

        {/* =================================================
            MISSION VS CASE
        ================================================= */}

        <section className="dashboard-panel">

          <div className="panel-heading">

            <div>

              <span className="panel-kicker">
                MISSION → CASE
              </span>

              <h3>
                Know what you are training for.
              </h3>

              <p>
                Missions build individual investigation skills.
                Cases combine those skills into a complete
                investigation.
              </p>

            </div>

          </div>

          <div className="dashboard-method-grid">

            <div className="dashboard-method-step featured">

              <span>
                M
              </span>

              <small>
                MISSION
              </small>

              <h3>
                Practise one skill.
              </h3>

              <p>
                Short, repeatable scenarios focused on a
                particular investigation technique.
              </p>

              <strong>
                Build fluency
              </strong>

            </div>

            <div className="dashboard-method-step">

              <span>
                C
              </span>

              <small>
                CASE
              </small>

              <h3>
                Combine multiple skills.
              </h3>

              <p>
                Longer investigations where you must connect
                evidence, reconstruct events and explain what
                happened.
              </p>

              <strong>
                Prove your ability
              </strong>

            </div>

            <div className="dashboard-method-step">

              <span>
                S
              </span>

              <small>
                SKILLS
              </small>

              <h3>
                Track what you can actually do.
              </h3>

              <p>
                Your investigation behaviour and performance
                build an evidence-based skills profile.
              </p>

              <strong>
                View your progress
              </strong>

            </div>

          </div>

          <div className="hero-actions">

            <Link
              href="/learning"
              className="secondary-action"
            >
              Learn investigation skills
            </Link>

            <Link
              href="/cases"
              className="primary-action"
            >
              Start a full case →
            </Link>

            <Link
              href="/skills"
              className="secondary-action"
            >
              View skills
            </Link>

          </div>

        </section>

        {/* =================================================
            RECURRING MISSION SYSTEM
        ================================================= */}

        <section className="dashboard-panel">

          <div className="panel-heading">

            <div>

              <span className="panel-kicker">
                REPEAT. ADAPT. IMPROVE.
              </span>

              <h3>
                Missions are practice, not answers.
              </h3>

              <p>
                Completing a mission should not mean you have
                memorised the solution. Repeat investigations
                with changing evidence and learn to recognise
                the underlying pattern.
              </p>

            </div>

          </div>

          <div className="dashboard-method-context">

            <div className="dashboard-method-context-points">

              <div className="dashboard-method-context-point">

                <span>
                  01
                </span>

                <p>
                  Complete the investigation and receive XP
                  based on your performance.
                </p>

              </div>

              <div className="dashboard-method-context-point">

                <span>
                  02
                </span>

                <p>
                  The mission can return with different
                  evidence, timestamps, indicators or
                  investigative conditions.
                </p>

              </div>

              <div className="dashboard-method-context-point">

                <span>
                  03
                </span>

                <p>
                  Your repeated performance becomes evidence
                  of your actual investigation ability.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            BOTTOM CTA
        ================================================= */}

        <section className="learning-next dashboard-bottom-cta">

          <div>

            <span className="hero-kicker">
              NEXT STEP
            </span>

            <h2>
              Ready for something
              <span>
                {" "}
                bigger?
              </span>
            </h2>

            <p>
              Missions help you practise individual
              investigation skills. Cases challenge you to
              combine them and explain what actually happened.
            </p>

          </div>

          <div className="hero-actions">

            <Link
              href="/learning"
              className="secondary-action"
            >
              Back to learning
            </Link>

            <Link
              href="/cases"
              className="primary-action"
            >
              Explore case files →
            </Link>

          </div>

        </section>

      </main>

    </div>
  );
}