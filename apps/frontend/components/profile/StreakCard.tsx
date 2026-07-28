"use client";

type Props = {
  streak: number;
  longest: number;
};

export default function StreakCard({ streak, longest }: Props) {
  return (
    <div className="bg-[#0D162B] border border-[#1B2A4A] rounded-xl p-5 shadow-[0_0_20px_rgba(0,229,255,0.15)] flex flex-col items-center">
      <div className="text-4xl mb-2">🔥</div>

      <p className="text-xs text-[#A8B2D1] tracking-wide">Current Streak</p>
      <p className="text-2xl font-bold text-cyan-200">{streak} days</p>

      <p className="text-xs text-[#A8B2D1] mt-3 tracking-wide">Longest Streak</p>
      <p className="text-lg font-semibold text-cyan-300">{longest} days</p>
    </div>
  );
}
