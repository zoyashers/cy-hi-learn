"use client";

export default function MissionBriefing() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-10">

      {/* Mission Header */}
      <h1 className="text-4xl font-bold mb-2">MISSION:</h1>
      <h2 className="text-3xl font-semibold text-cyan-400 mb-10">
        Suspicious USB Device
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Story Briefing */}
        <div className="lg:col-span-2 bg-[#121826] p-8 rounded-xl shadow-lg border border-[#1c2333]">
          <h3 className="text-2xl font-semibold mb-4">Story Briefing</h3>

          <p className="text-gray-300 leading-relaxed">
            A USB device was discovered plugged into a workstation inside the
            Finance Department. The employee claims they have never seen it
            before. Security logs show unusual activity shortly after the device
            was connected.
          </p>

          <p className="text-gray-300 mt-4 leading-relaxed">
            Your task is to investigate the USB, determine its origin, identify
            any malicious activity, and assess the potential impact on the
            organisation.
          </p>

          <p className="text-gray-300 mt-4 leading-relaxed">
            Treat this as a live incident. Your findings will be used in the
            official report to the Cyber Response Team.
          </p>
        </div>

        {/* Mission Stats */}
        <div className="space-y-6">

          <div className="bg-[#121826] p-6 rounded-xl shadow-lg border border-[#1c2333]">
            <p className="text-gray-400 text-sm">Difficulty</p>
            <p className="text-xl font-semibold mt-1 text-cyan-400">Beginner</p>
          </div>

          <div className="bg-[#121826] p-6 rounded-xl shadow-lg border border-[#1c2333]">
            <p className="text-gray-400 text-sm">XP Reward</p>
            <p className="text-xl font-semibold mt-1 text-cyan-400">250 XP</p>
          </div>

          <div className="bg-[#121826] p-6 rounded-xl shadow-lg border border-[#1c2333]">
            <p className="text-gray-400 text-sm">Estimated Time</p>
            <p className="text-xl font-semibold mt-1 text-cyan-400">45 Minutes</p>
          </div>

        </div>
      </div>

      {/* Begin Investigation Button */}
      <div className="mt-16 flex justify-center">
        <button
          className="
            px-12 py-4 
            bg-gradient-to-r from-cyan-400 to-blue-600 
            text-white text-xl font-semibold 
            rounded-xl shadow-lg 
            hover:opacity-90 
            transition-all duration-300
          "
        >
          BEGIN INVESTIGATION
        </button>
      </div>

    </div>
  );
}
