"use client";

import { useState } from "react";
import Skeleton from "../../../components/ui/Skeleton";
import Modal from "../../../components/ui/Modal";

export default function AIQuizBuilderPage() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const generateQuiz = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setQuiz(null);

    const res = await fetch("/api/ai/quiz", {
      method: "POST",
      body: JSON.stringify({ topic, difficulty }),
    });

    const data = await res.json();
    setQuiz(data.quiz);
    setLoading(false);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-10">
      <h1 className="text-4xl font-bold mb-2">AI Quiz Builder</h1>
      <p className="text-[var(--text-muted)] mb-10">
        Auto‑generate quizzes from a topic
      </p>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

        {/* Input */}
        <div className="bg-[var(--bg-card)] p-8 rounded-xl border border-[var(--border)] space-y-6">
          <div>
            <label className="block mb-2 text-[var(--text-muted)]">Topic</label>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)]"
              placeholder="e.g., Prefetch, USB forensics…"
            />
          </div>

          <div>
            <label className="block mb-2 text-[var(--text-muted)]">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)]"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <button onClick={generateQuiz} className="button-primary w-full">
            Generate Quiz
          </button>
        </div>

        {/* Preview */}
        <div className="bg-[var(--bg-card)] p-8 rounded-xl border border-[var(--border)]">
          <h2 className="text-2xl font-semibold mb-4">Quiz Preview</h2>

          {loading && (
            <div className="space-y-4">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          )}

          {!loading && !quiz && (
            <p className="text-[var(--text-muted)]">
              Enter a topic and click <span className="text-[var(--accent)]">Generate Quiz</span>.
            </p>
          )}

          {!loading && quiz && (
            <div className="space-y-6">
              <div className="mission-card">
                <p className="mission-title">{quiz.title}</p>
              </div>

              {quiz.questions.map((q: any, i: number) => (
                <div key={i} className="mission-card">
                  <p className="font-semibold mb-2">{q.q}</p>
                  <ul className="text-sm text-[var(--text-muted)] space-y-1">
                    {q.a.map((opt: string, j: number) => (
                      <li key={j}>• {opt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal open={showModal} title="Quiz Generated" onClose={() => setShowModal(false)}>
        <p className="text-sm text-[var(--text-muted)]">
          Your quiz is ready to save or export.
        </p>
      </Modal>
    </div>
  );
}
