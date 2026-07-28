"use client";

import { useState } from "react";

export default function GlobalLeaderboard() {
  const [filter, setFilter] = useState("global");

  const leaderboard = [
    { name: "Aisha Khan", xp: 12450, badge: "Diamond" },
    { name: "Liam Patel", xp: 11800, badge: "Platinum" },
    { name: "Emily Chen", xp: 11220, badge: "Gold" },
    { name: "Marcus Lee", xp: 10900, badge: "Gold" },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-10">

      <h1 className="text-4xl font-bold mb-2">Global Leaderboard</h1>
      <p className="text-gray-400 mb-10">Top performers across CY‑HI</p>

      {/* Filters */}
      <div className="flex space-x-4 mb-10">
        {["global", "institution", "module"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`
              px-6 py-3 rounded-xl font-semibold border transition
              ${filter === f
                ? "bg-cyan-500/20 border-cyan-400"
                : "bg-[#121826] border-[#1c2333] hover:bg-[#1a2235]"
              }
            `}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Leaderboard Table */}
      <div className="bg-[#121826] p-8 rounded-xl border border-[#1c2333] shadow-lg">

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 border-b border-[#1c2333]">
              <th className="pb-3">Rank</th>
              <th className="pb-3">Name</th>
              <th className="pb-3">XP</th>
              <th className="pb-3">Badge</th>
            </tr>
          </thead>

          <tbody className="text-gray-300">
            {leaderboard.map((user, i) => (
              <tr key={i} className="border-b border-[#1c2333]">
                <td className="py-3 text-cyan-400 font-bold">{i + 1}</td>
                <td>{user.name}</td>
                <td className="text-blue-400">{user.xp.toLocaleString()}</td>
                <td className="text-purple-400">{user.badge}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}
