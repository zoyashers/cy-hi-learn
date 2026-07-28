"use client";

export default function AchievementsPage() {
  const earned = [
    { title: "First Mission", icon: "🏅" },
    { title: "Evidence Hunter", icon: "🔍" },
    { title: "Registry Expert", icon: "🗂️" },
    { title: "DFIR Tier 1", icon: "🔥" },
  ];

  const locked = [
    "DFIR Tier 2",
    "Memory Analyst",
    "Mobile Forensics Pro",
    "Incident Responder",
    "Forensic Examiner",
    "Cyber Investigator",
    "Threat Hunter",
    "SOC Level 2",
  ];

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-10">

      {/* Header */}
      <h1 className="text-4xl font-bold mb-8">Achievements</h1>

      {/* Earned Badges */}
      <h2 className="text-2xl font-semibold mb-4">Unlocked</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {earned.map((badge, i) => (
          <div
            key={i}
            className="
              bg-[#121826] p-6 rounded-xl shadow-lg border border-[#1c2333]
              flex flex-col items-center justify-center text-center
              hover:shadow-cyan-500/20 transition-all duration-300
            "
          >
            <div className="text-5xl mb-3">{badge.icon}</div>
            <p className="text-lg font-semibold">{badge.title}</p>
            <p className="text-cyan-400 text-sm mt-1">Unlocked</p>
          </div>
        ))}
      </div>

      {/* Locked Badges */}
      <h2 className="text-2xl font-semibold mb-4">Locked</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {locked.map((title, i) => (
          <div
            key={i}
            className="
              bg-[#121826] p-6 rounded-xl border border-[#1c2333]
              flex flex-col items-center justify-center text-center
              opacity-40 cursor-not-allowed
            "
          >
            <div className="text-5xl mb-3">🔒</div>
            <p className="text-lg font-semibold">{title}</p>
            <p className="text-gray-500 text-sm mt-1">Locked</p>
          </div>
        ))}
      </div>

    </div>
  );
}
