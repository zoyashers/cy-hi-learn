"use client";

import { useEffect, useState } from "react";

export default function MissionComplete({ params }) {
  const { missionId } = params;
  const [result, setResult] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/missions/${missionId}/complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({ score: 100 }),
    })
      .then((res) => res.json())
      .then(setResult);
  }, [missionId]);

  if (!result) return <div className="p-8 text-white">Finalising mission…</div>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">MISSION COMPLETE</h1>
        <p className="text-2xl text-green-400">+{result.xp_awarded} XP</p>
        <p className="text-lg">
          Level {result.level} • {result.rank}
        </p>

        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg"
        >
          Continue Learning
        </button>
      </div>
    </div>
  );
}
