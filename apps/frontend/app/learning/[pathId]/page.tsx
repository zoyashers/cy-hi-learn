"use client";

import { useEffect, useState } from "react";

export default function PathOverview({ params }) {
  const { pathId } = params;
  const [path, setPath] = useState(null);
  const [tiers, setTiers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/learning/paths/${pathId}`)
      .then((res) => res.json())
      .then((data) => {
        setPath(data.path);
        setTiers(data.tiers);
      });
  }, [pathId]);

  if (!path) return <div className="p-8 text-white">Loading path…</div>;

  return (
    <div className="min-h-screen bg-[#050816] text-white p-8">
      <h1 className="text-4xl font-bold">{path.title}</h1>
      <p className="text-gray-400 mt-2 max-w-2xl">{path.description}</p>

      <div className="mt-10 space-y-10">
        {tiers.map((tier) => (
          <div key={tier.tier} className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Tier {tier.tier}{" "}
              {!tier.unlocked && (
                <span className="text-red-400 text-sm">(Locked)</span>
              )}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tier.modules.map((module) => (
                <div
                  key={module.id}
                  className={`p-6 rounded-xl ${
                    tier.unlocked
                      ? "bg-[#111827] hover:bg-[#1f2937] cursor-pointer"
                      : "bg-[#1f2937] opacity-40 cursor-not-allowed"
                  }`}
                  onClick={() =>
                    tier.unlocked &&
                    (window.location.href = `/learning/${pathId}/modules/${module.id}`)
                  }
                >
                  <h3 className="text-lg font-semibold">{module.title}</h3>
                  <p className="text-gray-400 mt-2">{module.description}</p>

                  {!tier.unlocked && (
                    <p className="text-red-400 text-sm mt-3">
                      Complete Tier {tier.tier - 1} to unlock
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
