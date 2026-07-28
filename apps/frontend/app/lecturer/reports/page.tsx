"use client";

import { useEffect, useState } from "react";

export default function LecturerReportsPage() {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL;

    fetch(`${base}/lecturer/reports/term`)
      .then((r) => r.json())
      .then((data) => {
        setReport(data);
        setLoading(false);
      });
  }, []);

  if (loading || !report) {
    return <div className="p-8 text-white">Loading report data…</div>;
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white p-8 space-y-10">
      <button
        onClick={() => history.back()}
        className="text-sm text-gray-300 hover:text-white"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold">Term Report</h1>
      <p className="text-gray-400 max-w-xl">
        Full academic performance summary for this cohort.
      </p>

      {/* Students */}
      <section className="bg-[#111827] p-6 rounded-xl space-y-4">
        <h2 className="text-xl font-semibold">Students</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-400 border-b border-gray-700">
              <tr>
                <th className="text-left py-2 pr-4">Email</th>
                <th className="text-left py-2 pr-4">XP</th>
                <th className="text-left py-2 pr-4">Level</th>
                <th className="text-left py-2 pr-4">Rank</th>
                <th className="text-left py-2 pr-4">Completed</th>
              </tr>
            </thead>
            <tbody>
              {report.students.map((s: any) => (
                <tr key={s.id} className="border-b border-gray-800">
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

      {/* Weakest Concepts */}
      <section className="bg-[#111827] p-6 rounded-xl space-y-4">
        <h2 className="text-xl font-semibold">Weakest Concepts</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-400 border-b border-gray-700">
              <tr>
                <th className="text-left py-2 pr-4">Mission</th>
                <th className="text-left py-2 pr-4">Question</th>
                <th className="text-left py-2 pr-4">Fail Rate</th>
              </tr>
            </thead>
            <tbody>
              {report.weakest_concepts.map((c: any) => (
                <tr key={c.task_id} className="border-b border-gray-800">
                  <td className="py-2 pr-4">{c.mission_title}</td>
                  <td className="py-2 pr-4">{c.question}</td>
                  <td className="py-2 pr-4 text-red-400">
                    {c.fail_rate.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* At-Risk Students */}
      <section className="bg-[#111827] p-6 rounded-xl space-y-4">
        <h2 className="text-xl font-semibold">At‑Risk Students</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-400 border-b border-gray-700">
              <tr>
                <th className="text-left py-2 pr-4">Email</th>
                <th className="text-left py-2 pr-4">XP</th>
                <th className="text-left py-2 pr-4">Completed</th>
                <th className="text-left py-2 pr-4">Inactive</th>
              </tr>
            </thead>
            <tbody>
              {report.at_risk_students.map((s: any) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
