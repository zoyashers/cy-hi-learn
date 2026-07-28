"use client";

import { useEffect, useState } from "react";

export default function WeakestConceptsPage() {
  const [concepts, setConcepts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL;

    fetch(`${base}/lecturer/analytics/weakest-concepts`)
      .then((r) => r.json())
      .then((data) => {
        setConcepts(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8 text-white">Loading weakest concepts…</div>;
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white p-8 space-y-6">
      <button
        onClick={() => history.back()}
        className="text-sm text-gray-300 hover:text-white"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold">Weakest Concepts</h1>
      <p className="text-gray-400 max-w-xl">
        Tasks students fail the most across all missions.
      </p>

      <div className="bg-[#111827] p-6 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-400 border-b border-gray-700">
            <tr>
              <th className="text-left py-2 pr-4">Mission</th>
              <th className="text-left py-2 pr-4">Question</th>
              <th className="text-left py-2 pr-4">Attempts</th>
              <th className="text-left py-2 pr-4">Fails</th>
              <th className="text-left py-2 pr-4">Fail Rate</th>
            </tr>
          </thead>
          <tbody>
            {concepts.map((c) => (
              <tr key={c.task_id} className="border-b border-gray-800">
                <td className="py-2 pr-4">{c.mission_title}</td>
                <td className="py-2 pr-4">{c.question}</td>
                <td className="py-2 pr-4">{c.attempts}</td>
                <td className="py-2 pr-4">{c.fails}</td>
                <td className="py-2 pr-4 text-red-400">
                  {c.fail_rate.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
