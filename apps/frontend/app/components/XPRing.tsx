
"use client";

export default function XPRing({ level = 7, xp = 1350, next = 2000 }) {
  const percent = (xp / next) * 100;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center text-white">
      <svg width="120" height="120" className="transform -rotate-90">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#1c2333"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="url(#grad)"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>

      <p className="text-lg font-semibold mt-2">Level {level}</p>
      <p className="text-sm text-gray-400">
        {xp} / {next} XP
      </p>
    </div>
  );
}
