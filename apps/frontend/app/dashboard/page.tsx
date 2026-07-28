"use client";

import Topbar from "@/app/components/Topbar";
import WelcomeBanner from "@/app/components/WelcomeBanner";
import MissionCard from "@/app/components/MissionCard";
import RightSidebar from "@/app/components/RightSidebar";
import XPRing from "@/app/components/XPRing";


export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#0b0f1a] text-white relative">
      
      {/* Sidebar */}
      <RightSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Topbar />

        {/* XP Ring */}
        <div className="absolute top-4 right-6">
          <XPRing level={7} xp={1350} next={2000} />
        </div>

        <div className="p-6 space-y-6">
          <WelcomeBanner />

          {/* Mission Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <MissionCard
              title="Suspicious USB Device"
              difficulty="Beginner"
              xp="+250 XP"
              progress={80}
              status="In Progress"
            />

            <MissionCard
              title="Log File Analysis"
              difficulty="Intermediate"
              xp="+300 XP"
              progress={65}
              status="In Progress"
            />

            <MissionCard
              title="Network Forensics Basics"
              difficulty="Intermediate"
              xp="+400 XP"
              progress={0}
              status="Not Started"
            />

          </div>
        </div>
      </div>
    </div>
  );
}
