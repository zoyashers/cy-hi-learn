
"use client";

import MissionCard from "../../components/MissionCard";

export default function DigitalForensicsPath() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-8">

      {/* Title */}
      <h1 className="text-3xl font-semibold mb-2">Digital Forensics Path</h1>
      <p className="text-gray-400 mb-6">Level 18 • 80% Complete</p>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-[#1c2333] rounded-full overflow-hidden mb-10">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 transition-all duration-700"
          style={{ width: "80%" }}
        ></div>
      </div>

      {/* Continue Mission */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Continue Current Mission</h2>
        <MissionCard
          title="Suspicious USB Device"
          difficulty="Beginner"
          xp="+250 XP"
          progress={80}
          status="In Progress"
        />
      </div>

      {/* Tier 1 */}
      <h2 className="text-2xl font-semibold mb-4">Tier 1</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <MissionCard title="Intro to Evidence" completed />
        <MissionCard title="Chain of Custody" completed />
        <MissionCard title="File Systems" completed />
      </div>

      {/* Tier 2 */}
      <h2 className="text-2xl font-semibold mb-4">Tier 2</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <MissionCard title="Windows Registry" difficulty="Intermediate" xp="+300 XP" progress={0} />
        <MissionCard title="Browser Artifacts" difficulty="Intermediate" xp="+300 XP" progress={0} />
      </div>

      {/* Tier 3 */}
      <h2 className="text-2xl font-semibold mb-4">Tier 3</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MissionCard title="Memory Analysis" locked />
        <MissionCard title="Mobile Forensics" locked />
      </div>

    </div>
  );
}
