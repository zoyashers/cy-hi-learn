"use client";

import { useEffect, useState } from "react";

type StudentDetail = {
  id: number;
  email: string;
  xp: number;
  level: number;
  rank: string;
};

type StudentMission = {
  mission_id: number;
  mission_title: string;
  score: number;
  completed: boolean;
};

export default function StudentDetailPage({ params }: { params: { studentId: string } }) {
  const { studentId } = params;
  const [student, setStudent] = useState<StudentDetail | null>(null);
  const [missions, setMissions] = useState<StudentMission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL;

    async function load() {
      try {
        const [sRes, mRes] = await Promise.all([
          fetch(`${base}/lecturer/students/${studentId}`),
          fetch(`${base}/lecturer/students/${studentId}/missions`),
        ]);

        const [s, m] = await Promise.all([sRes.json(), mRes.json()]);
        setStudent(s);
        setMissions(m);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [studentId]);

  if (loading || !student) {
    return <div className="p-8 text-white">Loading student…</div>;
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white p-8 space-y-6">
      <button
        onClick={() => history.back()}
        className="text-sm text-gray-300 hover:text-white"
      >
        ← Back to dashboard
      </button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{student.email}</h1>
          <p className="text-gray-400 text-sm">
            Level {student.level} • {student.rank}
          </p>
        </div>
        <div className="bg-[#111827] px-4 py-2 rounded-lg text-sm">
          XP: <span className="font-semibold">{student.xp}</span>
        </div>
      </div>

      <section className="bg-[#111827] p-6 rounded-xl space-y-4">
        <h2 className="text-lg font-semibold">Mission Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-400 border-b border-gray-700">
              <tr>
                <th className="text-left py-2 pr-4">Mission</th>
                <th className="text-left py-2 pr-4">Score</th>
                <th className="text-left py-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {missions.map((m) => (
                <tr key={m.mission_id} className="border-b border-gray-800">
                  <td className="py-2 pr-4">{m.mission_title}</td>
                  <td className="py-2 pr-4">{m.score}</td>
                  <td className="py-2 pr-4">
                    {m.completed ? "Completed" : "In progress"}
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
