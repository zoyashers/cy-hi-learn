"use client";

import Table from "../../../components/ui/Table";

export default function ClassOverviewPage() {
  const students = [
    { name: "Zoya", xp: 12450, missions: 34, progress: "78%" },
    { name: "Aiden", xp: 9800, missions: 28, progress: "65%" },
    { name: "Maya", xp: 15200, missions: 41, progress: "92%" },
  ];

  const columns = [
    { key: "name", label: "Student" },
    { key: "xp", label: "XP" },
    { key: "missions", label: "Missions Completed" },
    { key: "progress", label: "Progress" },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-10">

      <h1 className="text-4xl font-bold mb-2">Class Overview</h1>
      <p className="text-[var(--text-muted)] mb-10">
        View student progress, XP, and mission completion
      </p>

      <div className="bg-[var(--bg-card)] p-8 rounded-xl border border-[var(--border)]">
        <Table columns={columns} data={students} />
      </div>
    </div>
  );
}
