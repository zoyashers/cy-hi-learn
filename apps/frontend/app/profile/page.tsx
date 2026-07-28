"use client";

import XPRing from "../components/XPRing";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-10">

      {/* Header */}
      <h1 className="text-4xl font-bold mb-10">Your Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left: Profile Info */}
        <div className="bg-[#121826] p-8 rounded-xl border border-[#1c2333] shadow-lg flex flex-col items-center">

          {/* Profile Picture */}
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center text-4xl font-bold mb-4">
            Z
          </div>

          {/* Name */}
          <h2 className="text-2xl font-semibold">Zoya</h2>

          {/* Rank */}
          <p className="text-cyan-400 text-lg mt-1">Cyber Investigator</p>

          {/* XP Ring */}
          <div className="mt-6">
            <XPRing level={18} xp={24580} next={30000} />
          </div>

        </div>

        {/* Middle: Activity + Stats */}
        <div className="lg:col-span-2 space-y-10">

          {/* Weekly Activity */}
          <div className="bg-[#121826] p-8 rounded-xl border border-[#1c2333] shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Weekly Activity</h3>

            <div className="bg-[#0f1522] h-40 rounded-lg border border-[#1c2333] flex items-center justify-center text-gray-500">
              Activity Graph Placeholder
            </div>
          </div>

          {/* Mission Completion */}
          <div className="bg-[#121826] p-8 rounded-xl border border-[#1c2333] shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Mission Completion</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

              <div className="bg-[#0f1522] p-6 rounded-lg border border-[#1c2333] text-center">
                <p className="text-gray-400 text-sm">Completed</p>
                <p className="text-3xl font-bold text-cyan-400 mt-1">14</p>
              </div>

              <div className="bg-[#0f1522] p-6 rounded-lg border border-[#1c2333] text-center">
                <p className="text-gray-400 text-sm">In Progress</p>
                <p className="text-3xl font-bold text-blue-400 mt-1">3</p>
              </div>

              <div className="bg-[#0f1522] p-6 rounded-lg border border-[#1c2333] text-center">
                <p className="text-gray-400 text-sm">Locked</p>
                <p className="text-3xl font-bold text-gray-500 mt-1">8</p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Badges */}
      <div className="mt-16">
        <h2 className="text-3xl font-semibold mb-6">Badges</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Earned Badges */}
          <div className="bg-[#121826] p-6 rounded-xl border border-[#1c2333] shadow-lg text-center hover:shadow-cyan-500/20 transition-all duration-300">
            <div className="text-5xl mb-3">🏅</div>
            <p className="text-lg font-semibold">First Mission</p>
            <p className="text-cyan-400 text-sm mt-1">Unlocked</p>
          </div>

          <div className="bg-[#121826] p-6 rounded-xl border border-[#1c2333] shadow-lg text-center hover:shadow-cyan-500/20 transition-all duration-300">
            <div className="text-5xl mb-3">🔍</div>
            <p className="text-lg font-semibold">Evidence Hunter</p>
            <p className="text-cyan-400 text-sm mt-1">Unlocked</p>
          </div>

          <div className="bg-[#121826] p-6 rounded-xl border border-[#1c2333] shadow-lg text-center hover:shadow-cyan-500/20 transition-all duration-300">
            <div className="text-5xl mb-3">🗂️</div>
            <p className="text-lg font-semibold">Registry Expert</p>
            <p className="text-cyan-400 text-sm mt-1">Unlocked</p>
          </div>

          {/* Locked Badge */}
          <div className="bg-[#121826] p-6 rounded-xl border border-[#1c2333] shadow-lg text-center opacity-40 cursor-not-allowed">
            <div className="text-5xl mb-3">🔒</div>
            <p className="text-lg font-semibold">Memory Analyst</p>
            <p className="text-gray-500 text-sm mt-1">Locked</p>
          </div>

        </div>
      </div>

    </div>
  );
}
