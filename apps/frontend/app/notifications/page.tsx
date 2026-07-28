"use client";

import { useState } from "react";

export default function NotificationsCentre() {
  const [filter, setFilter] = useState("all");

  const notifications = [
    { type: "mission", text: "Your mission 'Suspicious USB Device' has been graded.", time: "2 hours ago" },
    { type: "system", text: "New module 'Network Forensics' is now available.", time: "1 day ago" },
    { type: "message", text: "You received a message from Dr. Sarah Malik.", time: "3 days ago" },
    { type: "achievement", text: "You earned the 'Fast Analyst' badge.", time: "5 days ago" },
  ];

  const filtered =
    filter === "all" ? notifications : notifications.filter((n) => n.type === filter);

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-10">
      <h1 className="text-4xl font-bold mb-2">Notifications</h1>
      <p className="text-gray-400 mb-10">Stay updated with your activity</p>

      {/* Filters */}
      <div className="flex space-x-4 mb-10">
        {["all", "mission", "system", "message", "achievement"].map((f) => (
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

      {/* Notification List */}
      <div className="space-y-4 max-w-3xl">
        {filtered.map((n, i) => (
          <div
            key={i}
            className="bg-[#121826] p-6 rounded-xl border border-[#1c2333] shadow-lg"
          >
            <p className="text-gray-300">{n.text}</p>
            <p className="text-gray-500 text-sm mt-2">{n.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
