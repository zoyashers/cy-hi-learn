"use client";

import { useState } from "react";

export default function LecturerFinalGrading() {
  // Mock data — replace with API fetch
  const [submissions] = useState([
    {
      id: "stu001",
      name: "Aisha Khan",
      submittedAt: "2026-03-20 14:22",
    },
    {
      id: "stu002",
      name: "Daniel Murphy",
      submittedAt: "2026-03-20 15:10",
    },
    {
      id: "stu003",
      name: "Lina Chen",
      submittedAt: "2026-03-21 09:05",
    },
  ]);

  const [selected, setSelected] = useState<any>(null);
  const [grade, setGrade] = useState({
    score: "",
    feedback: "",
    pass: false,
  });

  const handleSave = () => {
    // Replace with POST to your backend
    console.log("Saving grade:", { student: selected, grade });
    alert("Grade saved successfully.");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#020617", color: "#fff" }}>
      {/* SIDEBAR */}
      <aside
        style={{
          width: "260px",
          background: "#020617",
          padding: "2rem 1rem",
          borderRight: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Lecturer Dashboard</h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <a href="/learn/lecturer" style={{ color: "#fff" }}>
            Overview
          </a>
          <a href="/learn/lecturer/grading/final" style={{ color: "#fff", fontWeight: 600 }}>
            Final Assessment Grading
          </a>
          <a href="/learn/dashboard" style={{ color: "#fff" }}>
            Student View
          </a>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: "2rem" }}>
        <h1>TB1 Final Assessment — Grading</h1>
        <p style={{ opacity: 0.8, marginTop: "0.5rem" }}>
          Select a student to review their submission and assign a grade.
        </p>

        {/* STUDENT LIST */}
        <div
          style={{
            marginTop: "2rem",
            background: "#0f172a",
            padding: "1.5rem",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <h2>Submissions</h2>
          <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", opacity: 0.7 }}>
                <th>Name</th>
                <th>Submitted At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr key={s.id} style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                  <td style={{ padding: "0.75rem 0" }}>{s.name}</td>
                  <td>{s.submittedAt}</td>
                  <td>
                    <button
                      onClick={() => setSelected(s)}
                      style={{
                        padding: "0.4rem 0.8rem",
                        background: "#4f46e5",
                        border: "none",
                        borderRadius: "6px",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* GRADING PANEL */}
        {selected && (
          <div
            style={{
              marginTop: "2rem",
              background: "#0f172a",
              padding: "1.5rem",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <h2>Grading: {selected.name}</h2>
            <p style={{ opacity: 0.7 }}>Student ID: {selected.id}</p>

            {/* RUBRIC */}
            <div
              style={{
                marginTop: "1.5rem",
                padding: "1rem",
                background: "#1e293b",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <h3>Rubric</h3>
              <ul style={{ marginTop: "0.5rem", opacity: 0.85 }}>
                <li><strong>Accuracy (30%)</strong> — Correct interpretation of evidence.</li>
                <li><strong>Reasoning (30%)</strong> — Logical, justified explanations.</li>
                <li><strong>Evidence Use (20%)</strong> — References to scenario artifacts.</li>
                <li><strong>Clarity (20%)</strong> — Professional writing, structure.</li>
              </ul>
            </div>

            {/* SCORE */}
            <div style={{ marginTop: "1.5rem" }}>
              <label>Score (0–100)</label>
              <input
                type="number"
                value={grade.score}
                onChange={(e) => setGrade({ ...grade, score: e.target.value })}
                style={{
                  width: "120px",
                  padding: "0.5rem",
                  marginTop: "0.5rem",
                  borderRadius: "6px",
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "#020617",
                  color: "#fff",
                }}
              />
            </div>

            {/* PASS/FAIL */}
            <div style={{ marginTop: "1rem" }}>
              <label>
                <input
                  type="checkbox"
                  checked={grade.pass}
                  onChange={(e) => setGrade({ ...grade, pass: e.target.checked })}
                  style={{ marginRight: "0.5rem" }}
                />
                Mark as Pass
              </label>
            </div>

            {/* FEEDBACK */}
            <div style={{ marginTop: "1.5rem" }}>
              <label>Feedback</label>
              <textarea
                value={grade.feedback}
                onChange={(e) => setGrade({ ...grade, feedback: e.target.value })}
                placeholder="Write detailed feedback for the student..."
                style={{
                  width: "100%",
                  minHeight: "140px",
                  marginTop: "0.5rem",
                  padding: "1rem",
                  borderRadius: "8px",
                  background: "#020617",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.25)",
                }}
              />
            </div>

            {/* SAVE BUTTON */}
            <button
              onClick={handleSave}
              style={{
                marginTop: "1.5rem",
                padding: "0.8rem 1.2rem",
                background: "#22c55e",
                borderRadius: "8px",
                border: "none",
                color: "#020617",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Save Grade
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
