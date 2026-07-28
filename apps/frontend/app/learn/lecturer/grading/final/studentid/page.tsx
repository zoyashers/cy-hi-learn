"use client";

import { useState, useEffect } from "react";

export default function ViewSubmission({ params }: any) {
  const { studentId } = params;

  // Mock data — replace with API fetch later
  const [submission, setSubmission] = useState<any>(null);

  useEffect(() => {
    // Simulated fetch
    setSubmission({
      id: studentId,
      name: "Aisha Khan",
      submittedAt: "2026-03-20 14:22",
      answers: {
        part1: "Student answer for part 1...",
        part2: "Student answer for part 2...",
        part3: "Student answer for part 3...",
        part4: "Student answer for part 4...",
        part5: "Student answer for part 5...",
        part6: "Student answer for part 6...",
        part7: "Student answer for part 7...",
        part8: "Student answer for part 8...",
      },
    });
  }, [studentId]);

  if (!submission) {
    return (
      <div style={{ padding: "2rem", color: "#fff" }}>
        Loading submission...
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#020617", color: "#fff", padding: "2rem" }}>
      <a
        href="/learn/lecturer/grading/final"
        style={{ color: "#4f46e5", textDecoration: "underline" }}
      >
        ← Back to Grading Dashboard
      </a>

      <h1 style={{ marginTop: "1rem" }}>Submission: {submission.name}</h1>
      <p style={{ opacity: 0.7 }}>Submitted at: {submission.submittedAt}</p>

      {Object.entries(submission.answers).map(([key, value]) => (
        <div
          key={key}
          style={{
            marginTop: "1.5rem",
            background: "#0f172a",
            padding: "1.5rem",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <h2 style={{ textTransform: "capitalize" }}>{key.replace("part", "Part ")}</h2>
          <p style={{ marginTop: "0.75rem", whiteSpace: "pre-wrap", opacity: 0.9 }}>{value}</p>
        </div>
      ))}
    </div>
  );
}
