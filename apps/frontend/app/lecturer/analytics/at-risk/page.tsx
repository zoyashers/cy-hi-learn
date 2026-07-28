"use client";

import { useEffect, useState } from "react";

export default function AtRiskStudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL;

    fetch(`${base}/lecturer/analytics/at-risk`)
      .then((r) => r.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8 text-white">Loading at-risk students…</div>;
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white p-8 space-y-6">
      <button
        onClick={() => history.back()}
        className="text-sm text-gray-300 hover:text-white"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold">At‑Risk Students</h1>
      <p className="text-gray-400 max-w-xl">
        Students flagged due to low XP, low completion, or inactivity.
      </p>

      <div className="bg-[#111827] p-6 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-400 border-b border-gray-700">
            <tr>
              <th className="text-left py-2 pr-4">Email</th>
              <th className="text-left py-2 pr-4">XP</th>
              <th className="text-left py-2 pr-4">Completed</th>
              <th className="text-left py-2 pr-4">Inactive</th>
              <th className="text-left py-2 pr-4">Risk Score</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-b border-gray-800">
                <td className="py-2 pr-4">{s.email}</td>
                <td className="py-2 pr-4">{s.xp}</td>
                <td className="py-2 pr-4">{s.completed_missions}</td>
                <td className="py-2 pr-4">
                  {s.inactive ? (
                    <span className="text-red-400">Yes</span>
                  ) : (
                    <span className="text-green-400">No</span>
                  )}
                </td>
                <td className="py-2 pr-4 text-red-400">{s.risk_score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
