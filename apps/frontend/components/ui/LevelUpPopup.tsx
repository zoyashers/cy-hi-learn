"use client";

import { useEffect, useState } from "react";

type Props = {
  level: number | null;
  trigger: boolean;
  onClose?: () => void;
};

export function LevelUpPopup({ level, trigger, onClose }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (trigger && level) {
      setVisible(true);
      const t = setTimeout(() => {
        setVisible(false);
        onClose && onClose();
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [trigger, level, onClose]);

  if (!visible || !level) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="relative pointer-events-auto">
        <div className="absolute -inset-10 bg-cyan-500/10 blur-3xl rounded-full animate-pulse" />
        <div className="relative bg-[#050814] border border-cyan-400/80 rounded-2xl px-8 py-6 shadow-[0_0_40px_rgba(0,229,255,0.7)] flex flex-col items-center space-y-3">
          <div className="relative inline-flex items-center justify-center">
            <div className="w-20 h-24 bg-gradient-to-b from-[#0F1E3A] to-[#050814] border border-cyan-400/80 rounded-t-xl rounded-b-3xl shadow-[0_0_30px_rgba(0,229,255,0.8)] flex items-center justify-center">
              <span className="text-cyan-100 font-bold text-xl">Lv {level}</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-cyan-100 tracking-wide">
            LEVEL UP!
          </h3>
          <p className="text-xs text-[#A8B2D1] text-center max-w-xs">
            You&apos;ve advanced to <span className="text-cyan-200">Level {level}</span>.
            Your analyst profile just got stronger.
          </p>
        </div>
      </div>
    </div>
  );
}
