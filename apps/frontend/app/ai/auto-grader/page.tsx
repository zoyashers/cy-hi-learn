"use client";

import { useState } from "react";
import Skeleton from "../../../components/ui/Skeleton";

export default function AutoGraderPage() {
  const [submission, setSubmission] = useState("");
  const [loading, setLoading] = useState(false);
  const [grade, setGrade] = useState<any>(null);

  const gradeSubmission = async () => {
    if (!submission.trim()) return;

    setLoading(true);
    setGrade(null);

    const res = await fetch("/api/ai/grade", {
      method: "POST",
      body: JSON.stringify({ submission }),
    });

    const data = await res.json();
    setGrade(data.grade);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-10">
      <h1 className="text-4xl font-bold mb-2">AI Auto‑Grader</h1>
      <p className="text-[var(--text-muted)] mb-10">
        Automatically grade student submissions
      </p>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

        {/* Input */}
        <div className="bg-[var(--bg-card)] p-8 rounded-xl border border-[var(--border)] space-y-6">
          <textarea
            value={submission}
            onChange={(e) => setSubmission(e.target.value)}
            className="w-full h-[300px] p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)]"
            placeholder="Paste student submission here…"
          />

          <button onClick={gradeSubmission} className="button-primary w-full">
            Grade Submission
          </button>
        </div>

        {/* Output */}
        <div className="bg-[var(--bg-card)] p-8 rounded-xl border border-[var(--border)]">
          <h2 className="text-2xl font-semibold mb-4">Grade Result</h2>

          {loading && (
            <div className="space-y-4">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          )}

          {!loading && !grade && (
            <p className="text-[var(--text-muted)]">
              Paste a submission and click <span className="text-[var(--accent)]">Grade</span>.
            </p>
          )}

          {!loading && grade && (
            <div className="space-y-6">
              <div className="mission-card">
                <p className="mission-title">Score: {grade.score}%</p>
              </div>

              <div className="mission-card">
                <p className="mission-title mb-2">Feedback</p>
                <ul className="text-sm text-[var(--text-muted)] space-y-1">
                  {grade.feedback.map((f: string, i: number) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
