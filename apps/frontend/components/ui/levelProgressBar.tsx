"use client";

type Props = {
  level: number;
  xp: number;
  progressPercent: number;
  nextLevelXp?: number | null;
};

export function LevelProgressBar({
  level,
  xp,
  progressPercent,
  nextLevelXp,
}: Props) {
  const clamped = Math.min(100, Math.max(0, progressPercent));

  return (
    <div className="space-y-3 bg-[#0D162B] border border-cyan-500/40 rounded-xl p-5 shadow-[0_0_24px_rgba(0,229,255,0.18)]">
      <div className="flex items-center justify-between">
        <div className="relative inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-cyan-400/80 bg-[#050814] shadow-[0_0_18px_rgba(0,229,255,0.5)]">
          <span className="text-xs font-semibold text-cyan-100 tracking-[0.12em]">
            LEVEL {level}
          </span>
        </div>
        <div className="text-xs text-[#A8B2D1]">
          XP: <span className="text-cyan-200 font-semibold">{xp}</span>
        </div>
      </div>

      <div className="w-full h-3 bg-[#050814] rounded-full overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-200 shadow-[0_0_22px_rgba(0,229,255,0.8)] transition-all duration-500 ease-out"
          style={{ width: `${clamped}%` }}
        />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(0,229,255,0.25),_transparent_60%)]" />
      </div>

      <div className="flex items-center justify-between text-xs text-[#A8B2D1]">
        <span>Progress to next level</span>
        {nextLevelXp ? (
          <span>
            Next level at{" "}
            <span className="text-cyan-200 font-semibold">{nextLevelXp}</span> XP
          </span>
        ) : (
          <span className="text-cyan-300 font-semibold">Max level reached</span>
        )}
      </div>
    </div>
  );
}
