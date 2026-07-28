"use client";

import Topbar from "@/components/dashboard/Topbar";
import LearningPaths from "@/components/dashboard/LearningPaths";
import ContinueLearning from "@/components/dashboard/ContinueLearning";
import RecentMissions from "@/components/dashboard/RecentMissions";
import AIToolsRow from "@/components/dashboard/AIToolsRow";
import Announcements from "@/components/dashboard/Announcements";
import RightSidebar from "@/components/dashboard/RightSidebar";
import StatsGrid from "@/components/dashboard/StatsGrid";

export default function LearnDashboardPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0f172a] border-r border-white/10 flex flex-col p-4">
        <div className="flex items-center gap-3 mb-6">
          <img
            src="/cyhi-logo.png"
            className="w-10 h-10 rounded-lg shadow-[0_0_12px_rgba(99,102,241,0.4)]"
          />
          <span className="font-semibold text-lg bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">
            CY‑HI
          </span>
        </div>

        <nav className="flex flex-col gap-2 text-sm">
          <a className="px-3 py-2 rounded-md bg-white/10 font-medium">Dashboard</a>

          <p className="text-xs text-gray-400 mt-4 mb-1">LEARNING</p>
          <a className="px-3 py-2 rounded-md hover:bg-white/5">Digital Forensics</a>
          <a className="px-3 py-2 rounded-md hover:bg-white/5">SOC Analyst</a>
          <a className="px-3 py-2 rounded-md hover:bg-white/5">Incident Response</a>
          <a className="px-3 py-2 rounded-md hover:bg-white/5">Malware Analysis</a>
          <a className="px-3 py-2 rounded-md hover:bg-white/5">Threat Intelligence</a>
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10 text-xs text-gray-400">
          CY‑HI Platform
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 space-y-8">
        <Topbar />

        <StatsGrid />

        <ContinueLearning />

        <AIToolsRow />

        <LearningPaths />

        <RecentMissions />

        <Announcements />
      </main>

      {/* RIGHT SIDEBAR */}
      <RightSidebar />
    </div>
  );
}
