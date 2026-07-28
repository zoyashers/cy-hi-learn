"use client";

import { useEffect, useState } from "react";

export default function MissionBriefing({ params }) {
  const { missionId } = params;
  const [mission, setMission] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/missions/${missionId}/briefing`, {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    })
      .then((res) => res.json())
      .then(setMission)
      .catch(console.error);
  }, [missionId]);

  if (!mission) return <div className="p-8 text-white">Loading mission…</div>;

  return (
    <div className="min-h-screen bg-[#050816] text-white p-8">
      <h1 className="text-4xl font-bold">{mission.title}</h1>
      <p className="mt-4 text-gray-300 max-w-2xl">{mission.description}</p>

      <div className="mt-6 flex gap-6 text-sm text-gray-300">
        <span>Difficulty: {mission.difficulty}</span>
        <span>XP: {mission.xp_reward}</span>
        <span>Estimated: {mission.estimated_minutes} mins</span>
      </div>

      <button
        onClick={() => (window.location.href = `./${missionId}/investigate`)}
        className="mt-10 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 font-semibold"
      >
        Begin Investigation
      </button>
    </div>
  );
}
