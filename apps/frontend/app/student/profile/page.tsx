"use client";

import { useState } from "react";

export default function StudentProfilePage() {
  const [tab, setTab] = useState("overview");

  const badges = [
    { name: "Fast Analyst", color: "cyan" },
    { name: "Registry Expert", color: "blue" },
    { name: "USB Hunter", color: "purple" },
  ];

  const achievements = [
    "Completed 10 missions",
    "Achieved 90%+ on 3 missions",
    "First to finish a weekly challenge",
  ];

  const progress = [
    { module: "Digital Forensics Basics", percent: 92 },
    { module: "Windows Artefacts", percent: 78 },
    { module: "Network Forensics", percent: 64 },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-10">

      <h1 className="text-4xl font-bold mb-2">Your Profile</h1>
      <p className="text-[var(--text-muted)] mb-10">
        View your XP, badges, achievements, and progress
      </p>

      {/* Tabs */}
      <div className="flex space-x-4 mb-10">
        {["overview", "badges", "achievements", "progress"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`
              px-6 py-3 rounded-xl font-semibold border transition
              ${tab === t
                ? "bg-[var(--accent-2)] border-[var(--accent-2)] text-white"
                : "bg-[var(--bg-card)] border-[var(--border)] hover:bg-[var(--bg-subtle)]"
              }
            `}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-[var(--bg-card)] p-8 rounded-xl border border-[var(--border)] shadow-lg">

        {/* OVERVIEW */}
        {tab === "overview" && (
          <div className="space-y-6">

            <div className="mission-card">
              <h2 className="text-2xl font-semibold mb-2">Account Info</h2>
              <p><strong>Name:</strong> Zoya</p>
              <p><strong>Email:</strong> zoya@student.cyhi.edu</p>
              <p><strong>XP:</strong> <span className="mission-xp">12,450 XP</span></p>
            </div>

            <div className="mission-card">
              <h2 className="text-2xl font-semibold mb-2">Quick Stats</h2>
              <p><strong>Missions Completed:</strong> 34</p>
              <p><strong>Modules Completed:</strong> 3</p>
              <p><strong>Badges Earned:</strong> {badges.length}</p>
            </div>

          </div>
        )}

        {/* BADGES */}
        {tab === "badges" &&