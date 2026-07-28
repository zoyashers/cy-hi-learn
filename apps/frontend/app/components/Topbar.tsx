"use client";

import { useState } from "react";

export default function Topbar() {
  const [focus, setFocus] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        background: "rgba(17, 24, 39, 0.6)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          background: "rgba(255,255,255,0.05)",
          border: focus
            ? "1px solid rgba(99,102,241,0.6)"
            : "1px solid rgba(255,255,255,0.1)",
          padding: "0.6rem 1rem",
          borderRadius: "0.75rem",
          width: "260px",
          color: "white",
          outline: "none",
          transition: "all 0.25s ease",
          boxShadow: focus ? "0 0 12px rgba(99,102,241,0.4)" : "none",
        }}
      />

      {/* Right icons */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <span style={{ fontSize: "1.3rem" }}>🔔</span>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "gray",
          }}
        ></div>
      </div>
    </div>
  );
}
