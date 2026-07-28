import React from "react";
import Sidebar from "@/app/components/Sidebar";
import AIChat from "@/app/components/AIChat";

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: "2rem",
          overflowY: "auto",
          marginLeft: "180px", // ensures content never hides behind sidebar
          transition: "margin-left 0.3s ease",
        }}
      >
        {children}
      </main>

      <AIChat />
    </div>
  );
}
