
"use client";

import Sidebar from "@/app/components/Sidebar"; // ✅ this line is crucial

export default function WithSidebar({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "2rem" }}>
        {children}
      </div>
    </div>
  );
}
