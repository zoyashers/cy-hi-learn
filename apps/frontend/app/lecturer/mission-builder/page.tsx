"use client";

import { useState } from "react";
import Modal from "../../../components/ui/Modal";
import Skeleton from "../../../components/ui/Skeleton";

export default function MissionBuilderPage() {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [xp, setXp] = useState(250);
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState<string[]>([""]);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const updateStep = (i: number, value: string) => {
    const updated = [...steps];
    updated[i] = value;
    setSteps(updated);
  };

  const addStep = () => setSteps([...steps, ""]);

  const saveMission = async () => {
    setSaving(true);

    await fetch("/api/missions/create", {
      method: "POST",
      body: JSON.stringify({
        title,
        difficulty,
        xp,
        description,
        steps,
      }),
    });

    setSaving(false);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-10">

      <h1 className="text-4xl font-bold mb-2">Mission Builder</h1>
      <p className="text-[var(--text-muted)] mb-10">
        Create new missions for your students
      </p>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

        {/* Builder */}
        <div className="bg-[var(--bg-card)] p-8 rounded-xl border border-[var(--border)] space-y-6">

          <div>
            <label className="block mb-2 text-[var(--text-muted)]">Mission Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)]"
              placeholder="e.g., Suspicious USB Investigation"
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

          <div>
            <label className="block mb-2 text-[var(--text-muted)]">XP Reward</label>
            <input
              type="number"
              value={xp}
              onChange={(e) => setXp(parseInt(e.target.value))}
              className="w-full p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)]"
            />
          </div>

          <div>
            <label className="block mb-2 text-[var(--text-muted)]">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-32 p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)]"
              placeholder="Describe the mission scenario…"
            />
          </div>

          <div>
            <label className="block mb-2 text-[var(--text-muted)]">Steps</label>
            <div className="space-y-4">
              {steps.map((s, i) => (
                <input
                  key={i}
                  value={s}
                  onChange={(e) => updateStep(i, e.target.value)}
                  className="w-full p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)]"
                  placeholder={`Step ${i + 1}`}
                />
              ))}
            </div>

            <button onClick={addStep} className="button-secondary w-full mt-4">
              + Add Step
            </button>
          </div>

          <button onClick={saveMission} className="button-primary w-full mt-6">
            {saving ? "Saving..." : "Save Mission"}
          </button>
        </div>

        {/* Preview */}
        <div className="bg-[var(--bg-card)] p-8 rounded-xl border border-[var(--border)]">

          <h2 className="text-2xl font-semibold mb-4">Preview</h2>

          {!title && !description && (
            <p className="text-[var(--text-muted)]">
              Fill in the mission details to preview it.
            </p>
          )}

          {(title || description) && (
            <div className="space-y-6">

              <div className="mission-card">
                <p className="mission-title">{title || "Untitled Mission"}</p>
                <p className="text-[var(--text-muted)] text-sm">
                  Difficulty: {difficulty} • XP: {xp}
                </p>
              </div>

              <div className="mission-card">
                <p className="mission-title mb-2">Description</p>
                <p className="text-[var(--text-muted)]">{description}</p>
              </div>

              <div className="mission-card">
                <p className="mission-title mb-2">Steps</p>
                <ul className="text-sm text-[var(--text-muted)] space-y-1">
                  {steps.map((s, i) => (
                    <li key={i}>• {s || "…"}</li>
                  ))}
                </ul>
              </div>

            </div>
          )}
        </div>
      </div>

      <Modal open={showModal} title="Mission Saved" onClose={() => setShowModal(false)}>
        <p className="text-sm text-[var(--text-muted)]">
          Your mission has been saved successfully.
        </p>
      </Modal>
    </div>
  );
}
