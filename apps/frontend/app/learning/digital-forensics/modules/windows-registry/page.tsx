"use client";

import MissionCard from "../../../components/MissionCard";

export default function WindowsRegistryModule() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-10">

      {/* Module Title */}
      <h1 className="text-4xl font-bold mb-4">Windows Registry</h1>

      {/* Module Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

        <div className="bg-[#121826] p-5 rounded-xl shadow-lg">
          <p className="text-gray-400 text-sm">Level Requirement</p>
          <p className="text-2xl font-semibold mt-1">Level 7</p>
        </div>

        <div className="bg-[#121826] p-5 rounded-xl shadow-lg">
          <p className="text-gray-400 text-sm">Missions</p>
          <p className="text-2xl font-semibold mt-1">5</p>
        </div>

        <div className="bg-[#121826] p-5 rounded-xl shadow-lg">
          <p className="text-gray-400 text-sm">Estimated Time</p>
          <p className="text-2xl font-semibold mt-1">2 Hours</p>
        </div>

        <div className="bg-[#121826] p-5 rounded-xl shadow-lg">
          <p className="text-gray-400 text-sm">XP Available</p>
          <p className="text-2xl font-semibold mt-1">500 XP</p>
        </div>

      </div>

      {/* Mission List */}
      <h2 className="text-2xl font-semibold mb-6">Missions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <MissionCard
          title="Mission 1: Registry Basics"
          difficulty="Beginner"
          xp="+100 XP"
          progress={0}
          status="Not Started"
        />

        <MissionCard
          title="Mission 2: Key Structures"
          difficulty="Beginner"
          xp="+100 XP"
          progress={0}
          status="Not Started"
        />

        <MissionCard
          title="Mission 3: User Activity"
          difficulty="Intermediate"
          xp="+100 XP"
          progress={0}
          status="Not Started"
        />

        <MissionCard
          title="Mission 4: Persistence Mechanisms"
          difficulty="Intermediate"
          xp="+100 XP"
          progress={0}
          status="Not Started"
        />

        <MissionCard
          title="Mission 5: Registry Forensics"
          difficulty="Advanced"
          xp="+100 XP"
          progress={0}
          status="Not Started"
        />

      </div>
    </div>
  );
}
