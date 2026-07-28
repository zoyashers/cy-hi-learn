"use client";

import React from "react";
import clsx from "clsx";

type BadgeProps = {
  name: string;
  tier: number;
  icon: string;
  unlocked: boolean;
};

export default function BadgeCard({ name, tier, icon, unlocked }: BadgeProps) {
  const tierColor =
    tier === 1
      ? "from-teal-400 to-teal-300"
      : tier === 2
      ? "from-cyan-400 to-cyan-300"
      : "from-fuchsia-400 to-cyan-300";

  return (
    <div
      className={clsx(
        "relative w-32 h-36 rounded-xl border p-3 flex flex-col items-center justify-center transition-all duration-300",
        unlocked
          ? "border-cyan-400/60 bg-[#0A0F1F] shadow-[0_0_20px_rgba(0,255,255,0.25)]"
          : "border-[#1B2A4A] bg-[#050814] opacity-40"
      )}
    >
      {/* Shield */}
      <div
        className={clsx(
          "w-16 h-20 rounded-b-2xl rounded-t-lg border flex items-center justify-center text-2xl font-bold",
          unlocked
            ? `bg-gradient-to-b ${tierColor} border-cyan-300 shadow-[0_0_20px_rgba(0,255,255,0.4)]`
            : "border-[#1B2A4A]"
        )}
      >
        {icon}
      </div>

      {/* Name */}
      <p
        className={clsx(
          "mt-2 text-sm text-center font-semibold tracking-wide",
          unlocked ? "text-cyan-200" : "text-[#6B7A99]"
        )}
      >
        {name}
      </p>

      {/* Tier */}
      <p
        className={clsx(
          "text-xs",
          unlocked ? "text-cyan-300" : "text-[#4A5670]"
        )}
      >
        Tier {tier}
      </p>
    </div>
  );
}
