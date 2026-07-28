"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";
import { LevelProgressBar } from "@/components/ui/LevelProgressBar";

export default function XPPage() {
  const [xp, setXp] = useState(0);
  const [events, setEvents] = useState<any[]>([]);
  const [levelData, setLevelData] = useState<any | null>(null);

  useEffect(() => {
    apiGet("/analyst/xp").then((data) => {
      setXp(data.xp);
      setEvents(data.events || []);
    });
    apiGet("/analyst/level").then((data) => setLevelData(data));
  }, []);

  const level = levelData?.level ?? 1;
  const progress = levelData?.progress_percent ?? 0;
  const nextLevelXp = levelData?.next_level_xp ?? null;

  return (
    <div className="min-h-screen bg-[#050814] text-white py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold tracking-wide mb-2">My XP & Progression</h2>
        <p className="text-sm text-[#A8B2D1]">
          Track your experience, level, and how your actions build your analyst profile.
        </p>

        <LevelProgressBar
          level={level}
          xp={xp}
          progressPercent={progress}
          nextLevelXp={nextLevelXp}
        />

        <div className="bg-[#0D162B] border border-[#1B2A4A] rounded-xl p-5 space-y-3">
          <h3 className="text-lg font-semibold text-cyan-100">XP Event History</h3>
          <p className="text-xs text-[#A8B2D1]">
            Every action you take in a case contributes to your XP and level.
          </p>

          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {events.length === 0 && (
              <p className="text-xs text-[#A8B2D1]">No XP events yet.</p>
            )}
            {events.map((e: any) => (
              <div
                key={e.id}
                className="border border-[#1B2A4A] bg-[#050814] rounded-lg p-3 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-cyan-100">{e.reason}</p>
                  <p className="text-xs text-[#A8B2D1]">
                    {new Date(e.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="text-sm font-semibold text-cyan-300">
                  +{e.amount} XP
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
