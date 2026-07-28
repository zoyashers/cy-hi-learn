"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";
import { LevelProgressBar } from "@/components/ui/LevelProgressBar";
import { LevelUpPopup } from "@/components/ui/LevelUpPopup";

export default function LevelPage() {
  const [data, setData] = useState<any | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    apiGet("/analyst/level").then((d) => {
      setData(d);
    });
  }, []);

  const level = data?.level ?? 1;
  const xp = data?.xp ?? 0;
  const progress = data?.progress_percent ?? 0;
  const nextLevelXp = data?.next_level_xp ?? null;
  const history = data?.history ?? [];

  return (
    <div className="min-h-screen bg-[#050814] text-white py-10 px-4 relative">
      <LevelUpPopup level={level} trigger={showPopup} onClose={() => setShowPopup(false)} />

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-wide mb-1">My Level</h2>
            <p className="text-sm text-[#A8B2D1]">
              Your analyst level reflects your accumulated experience across all cases.
            </p>
          </div>
          <div className="relative inline-flex items-center justify-center">
            <div className="w-20 h-24 bg-gradient-to-b from-[#0F1E3A] to-[#050814] border border-cyan-400/80 rounded-t-xl rounded-b-3xl shadow-[0_0_30px_rgba(0,229,255,0.8)] flex items-center justify-center">
              <span className="text-cyan-100 font-bold text-xl">Lv {level}</span>
            </div>
          </div>
        </div>

        <LevelProgressBar
          level={level}
          xp={xp}
          progressPercent={progress}
          nextLevelXp={nextLevelXp}
        />

        <div className="bg-[#0D162B] border border-[#1B2A4A] rounded-xl p-5 space-y-3">
          <h3 className="text-lg font-semibold text-cyan-100">Level-Up History</h3>
          <p className="text-xs text-[#A8B2D1]">
            Every time you reach a new level, it&apos;s recorded here.
          </p>

          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {history.length === 0 && (
              <p className="text-xs text-[#A8B2D1]">No level-up events yet.</p>
            )}
            {history.map((h: any) => (
              <div
                key={h.id}
                className="border border-[#1B2A4A] bg-[#050814] rounded-lg p-3 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-cyan-100">
                    Reached Level {h.new_level}
                  </p>
                  <p className="text-xs text-[#A8B2D1]">
                    {new Date(h.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
