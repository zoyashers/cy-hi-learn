"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";

type LevelData = {
  xp: number;
  level: number;
  progress_percent: number;
};

export default function AnalystSidebar() {
  const [levelData, setLevelData] = useState<LevelData | null>(null);

  useEffect(() => {
    apiGet("/analyst/level").then((data) => setLevelData(data));
  }, []);

  const level = levelData?.level ?? 1;
  const xp = levelData?.xp ?? 0;
  const progress = levelData?.progress_percent ?? 0;

  return (
    <div className="w-64 min-h-screen bg-[#0A0F1F] text-white p-6 space-y-6 border-r border-[#1B2A4A]">
      <h2 className="text-2xl font-bold tracking-wide">Analyst Panel</h2>

      <div className="bg-[#0D162B] rounded-lg p-4 shadow-md border border-cyan-500/40">
        <div className="flex items-center justify-between mb-2">
          <div className="relative inline-flex items-center justify-center px-3 py-1 rounded-full border border-cyan-400/70 bg-[#0A0F1F] shadow-[0_0_12px_rgba(0,229,255,0.35)]">
            <span className="text-xs font-semibold text-cyan-200 tracking-wide">
              LEVEL {level}
            </span>
          </div>
          <span className="text-xs text-[#A8B2D1]">XP: {xp}</span>
        </div>

        <div className="w-full h-2.5 bg-[#050814] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-cyan-300 shadow-[0_0_16px_rgba(0,229,255,0.7)] transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      </div>

      <nav className="space-y-2">
        <Link href="/analyst">Dashboard</Link>
        <Link href="/analyst/cases">My Cases</Link>
        <Link href="/analyst/xp">My XP</Link>
        <Link href="/analyst/level">My Level</Link>
      </nav>
    </div>
  );
}
