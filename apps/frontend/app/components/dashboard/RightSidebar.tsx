export default function RightSidebar() {
  return (
    <aside className="w-80 bg-[#0f172a] border-l border-white/10 p-6 space-y-6">
      {/* Upgrade */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-4 text-center">
        <h3 className="font-semibold mb-1">Upgrade to Pro</h3>
        <p className="text-sm text-gray-200 mb-3">
          Unlock advanced labs and exclusive content.
        </p>
        <button className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded-md text-sm">
          Upgrade Now
        </button>
      </div>

      {/* Daily Goal */}
      <div className="bg-[#111827] rounded-xl p-4 border border-white/10">
        <h3 className="font-semibold mb-2">Daily Goal</h3>
        <p className="text-sm text-gray-400 mb-2">Just 2 missions left!</p>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full w-[86%] bg-yellow-400 rounded-full"></div>
        </div>
      </div>

      {/* Events */}
      <div className="bg-[#111827] rounded-xl p-4 border border-white/10">
        <h3 className="font-semibold mb-2">Upcoming Events</h3>
        <ul className="text-sm text-gray-400 space-y-1">
          <li>Live Forensics Workshop — May 18</li>
          <li>Malware Analysis Q&A — May 20</li>
        </ul>
      </div>

      {/* Leaderboard */}
      <div className="bg-[#111827] rounded-xl p-4 border border-white/10">
        <h3 className="font-semibold mb-3">Leaderboard</h3>
        <ol className="space-y-1 text-sm">
          <li>1. Sarah Chen — 8,920 XP</li>
          <li>2. Zoya — 7,450 XP</li>
          <li>3. James Patel — 6,230 XP</li>
          <li>4. Olivia Brown — 5,820 XP</li>
          <li>5. Muhammad Ali — 5,310 XP</li>
        </ol>
      </div>
    </aside>
  );
}
