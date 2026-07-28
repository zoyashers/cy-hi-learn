"use client";

import { useEffect, useState } from "react";

export default function BadgeUnlockPopup({ badges }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (badges && badges.length > 0) {
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 3500);
      return () => clearTimeout(t);
    }
  }, [badges]);

  if (!visible || badges.length === 0) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="relative pointer-events-auto">
        <div className="absolute -inset-20 bg-cyan-500/10 blur-3xl rounded-full animate-pulse" />

        <div className="relative bg-[#050814] border border-cyan-400/80 rounded-2xl px-10 py-6 shadow-[0_0_40px_rgba(0,229,255,0.7)] flex flex-col items-center space-y-3">
          <h3 className="text-xl font-bold text-cyan-100 tracking-wide">
            Badge Unlocked
          </h3>

          {badges.map((b) => (
            <p key={b.id} className="text-cyan-200 text-sm">
              {b.name} (Tier {b.tier})
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
