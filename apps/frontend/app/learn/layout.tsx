import React from "react";
import Sidebar from "@/app/components/Sidebar";
import AIChat from "@/app/components/AIChat";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#070b14] text-white">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-y-auto p-8">
        {children}
      </main>

      <AIChat />
    </div>
  );
}