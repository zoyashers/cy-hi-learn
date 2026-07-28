"use client";

import { useState } from "react";

export default function RightSidebar() {
  const [hover, setHover] = useState(false);

  const smooth = { transition: "all 0.25s ease" };
  const glow = { boxShadow: "0 0 12px rgba(255,255,255,0.08)" };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "rgba(17, 24, 39, 0.6)",
        backdropFilter: "blur(12px)",
        borderRadius: "1rem",
        border: "1px solid rgba(255,255,255,0.05)",
        padding: "1.5rem",
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        opacity: 0,
        animation: "fadeIn 0.8s forwards",
        ...smooth,
        ...(hover ? glow : {}),
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div>
        <h3 style={{ fontSize: "1.25rem", fontWeight: 600 }}>Daily Goal</h3>
        <p style={{ color: "#9ca3af", marginTop: "0.25rem" }}>
          Complete 1 mission
        </p>
      </div>

      <div>
        <h3 style={{ fontSize: "1.25rem", fontWeight: 600 }}>Upcoming Events</h3>
        <p style={{ color: "#9ca3af", marginTop: "0.25rem" }}>
          Cyber Drill — Friday
        </p>
      </div>

      <div>
        <h3 style={{ fontSize: "1.25rem", fontWeight: 600 }}>Leaderboard</h3>
        <p style={{ color: "#9ca3af", marginTop: "0.25rem" }}>
          You are #4 this week
        </p>
      </div>
    </div>
  );
}
