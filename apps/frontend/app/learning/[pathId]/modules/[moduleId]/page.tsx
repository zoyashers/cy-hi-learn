"use client";

import { useEffect, useState } from "react";

export default function ModulePage({ params }) {
  const { pathId, moduleId } = params;
  const [module, setModule] = useState(null);
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/learning/modules/${moduleId}`)
      .then((res) => res.json())
      .then((data) => {
        setModule(data.module);
        setMissions(data.missions);
      });
  }, [moduleId]);

  if (!module) return <div className="p-8 text-white">Loading module…</div>;

  return (
    <div className="min-h-screen bg-[#050816] text-white p-8">
      <h1 className="text-3xl font-bold">{module.title}</h1>
      <p className="text-gray-400 mt-2">{module.description}</p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {missions.map((mission) => (
          <div
            key={mission.id}
            onClick={() =>
              (window.location.href = `/learning/${pathId}/modules/${moduleId}/missions/${mission.id}`)
            }
            className="bg-[#111827] p-6 rounded-xl hover:bg-[#1f2937] cursor-pointer"
          >
            <h3 className="text-lg font-semibold">{mission.title}</h3>
            <p className="text-gray-400 mt-2">{mission.description}</p>

            <div className="mt-4 text-sm text-gray-300">
              <p>Difficulty: {mission.difficulty}</p>
              <p>XP: {mission.xp_reward}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
