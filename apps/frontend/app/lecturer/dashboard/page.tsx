"use client";

import { useEffect, useState } from "react";

export default function LecturerDashboard() {
  const [overview, setOverview] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [missions, setMissions] = useState<any[]>([]);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL;

    fetch(`${base}/lecturer/overview`)
      .then((r) => r.json())
      .then(setOverview);

    fetch(`${base}/lecturer/students`)
      .then((r) => r.json())
      .then(setStudents);

    fetch(`${base}/lecturer/missions`)
      .then((r) => r.json())
      .then(setMissions);
  }, []);

  if (!overview) {
    return <div className="p-8 text-white">Loading lecturer dashboard…</div>;
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white p-8 space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Lecturer Dashboard</h1>

        <div className="flex gap-3 text-sm text-gray-300">
          <button
            onClick={() => (window.location.href = "/lecturer/analytics/weakest")}
            className="px-4 py-2 rounded-lg bg-[#111827] hover:bg-[#1f2937]"
          >
            Weakest Concepts
          </button>

          <button
            onClick={() => (window.location.href = "/lecturer/analytics/at-risk")}
            className="px-4 py-2 rounded-lg bg-[#111827] hover:bg-[#1f2937]"
          >
            At‑Risk Students
          </button>

          <button
            onClick={() => (window.location.href = "/lecturer/reports")}
            className="px-4 py-2 rounded-lg bg-[#111827] hover:bg-[#1f2937]"
          >
            Reports
          </button>

          <button
            onClick={() => (window.location.href = "/lecturer/content")}
            className="px-4 py-2 rounded-lg bg-[#111827] hover:bg-[#1f2937]"
          >
            Content
          </button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Students" value={overview.students} />
        <StatCard label="Average XP" value={overview.average_xp} />
        <StatCard
          label="Total Mission Completions"
          value={overview.total_completions}
        />
      </div>

      {/* Mission Analytics */}
      <section className="bg-[#111827] p-6 rounded-xl space-y-4">
        <h2 className="text-xl font-semibold">Mission Analytics</h2>
        <p className="text-sm text-gray-400">
          Overview of mission performance across all students.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-400 border-b border-gray-700">
              <tr>
                <th className="text-left py-2 pr-4">Mission</th>
                <th className="text-left py-2 pr-4">Completion Rate</th>
                <th className="text-left py-2 pr-4">Average Score</th>
              </tr>
            </thead>
            <tbody>
              {missions.map((m) => (
                <tr key={m.id} className="border-b border-gray-800">
                  <td className="py-2 pr-4">{m.title}</td>
                  <td className="py-2 pr-4">{m.completion_rate.toFixed(1)}%</td>
                  <td className="py-2 pr-4">{m.average_score.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Students Table */}
      <section className="bg-[#111827] p-6 rounded-xl space-y-4">
        <h2 className="text-xl font-semibold">Students</h2>
        <p className="text-sm text-gray-400">
          Click a student to view their full learning journey.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-400 border-b border-gray-700">
              <tr>
                <th className="text-left py-2 pr-4">Email</th>
                <th className="text-left py-2 pr-4">XP</th>
                <th className="text-left py-2 pr-4">Level</th>
                <th className="text-left py-2 pr-4">Rank</th>
                <th className="text-left py-2 pr-4">Completed Missions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-gray-800 hover:bg-[#1f2937] cursor-pointer"
                  onClick={() =>
                    (window.location.href = `/lecturer/students/${s.id}`)
                  }
                >
                  <td className="py-2 pr-4">{s.email}</td>
                  <td className="py-2 pr-4">{s.xp}</td>
                  <td className="py-2 pr-4">{s.level}</td>
                  <td className="py-2 pr-4">{s.rank}</td>
                  <td className="py-2 pr-4">{s.completed_missions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-[#111827] p-6 rounded-xl">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
