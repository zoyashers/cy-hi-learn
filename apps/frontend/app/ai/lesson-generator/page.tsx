"use client";

import { useState } from "react";
import Modal from "../../../components/ui/Modal";
import Skeleton from "../../../components/ui/Skeleton";

export default function AILessonGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("Intermediate");
  const [loading, setLoading] = useState(false);
  const [lesson, setLesson] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const generateLesson = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setLesson(null);

    const res = await fetch("/api/ai/lesson", {
      method: "POST",
      body: JSON.stringify({ topic, level }),
    });

    const data = await res.json();
    setLesson(data.lesson);
    setLoading(false);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-10">
      <h1 className="text-4xl font-bold mb-2">AI Lesson Generator</h1>
      <p className="text-[var(--text-muted)] mb-10">
        Auto‑generate structured lessons from a topic
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
            <label className="block mb-2 text-[var(--text-muted)]">Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)]"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <button onClick={generateLesson} className="button-primary w-full">
            Generate Lesson
          </button>
        </div>

        {/* Preview */}
        <div className="bg-[var(--bg-card)] p-8 rounded-xl border border-[var(--border)]">
          <h2 className="text-2xl font-semibold mb-4">Lesson Preview</h2>

          {loading && (
            <div className="space-y-4">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          )}

          {!loading && !lesson && (
            <p className="text-[var(--text-muted)]">
              Enter a topic and click <span className="text-[var(--accent)]">Generate Lesson</span>.
            </p>
          )}

          {!loading && lesson && (
            <div className="space-y-6">
              <div className="mission-card">
                <p className="mission-title">{lesson.title}</p>
                <p className="text-[var(--text-muted)] text-sm">
                  Duration: {lesson.duration}
                </p>
              </div>

              <div className="mission-card">
                <p className="mission-title mb-2">Objectives</p>
                <ul className="text-sm text-[var(--text-muted)] space-y-1">
                  {lesson.objectives.map((o: string, i: number) => (
                    <li key={i}>• {o}</li>
                  ))}
                </ul>
              </div>

              <div className="mission-card">
                <p className="mission-title mb-2">Outline</p>
                <ul className="text-sm text-[var(--text-muted)] space-y-1">
                  {lesson.outline.map((o: string, i: number) => (
                    <li key={i}>{o}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal open={showModal} title="Lesson Generated" onClose={() => setShowModal(false)}>
        <p className="text-sm text-[var(--text-muted)] mb-4">
          Your lesson is ready to save or export.
        </p>
      </Modal>
    </div>
  );
}
