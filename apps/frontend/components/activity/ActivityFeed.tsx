"use client";

export default function ActivityFeed({ events }) {
  return (
    <div className="bg-[#0D162B] border border-[#1B2A4A] rounded-xl p-6 shadow-[0_0_20px_rgba(0,229,255,0.15)]">
      <h3 className="text-lg font-semibold text-cyan-200 mb-4">Recent Activity</h3>

      <div className="space-y-4">
        {events.length === 0 && (
          <p className="text-[#6B7A99] text-sm">No recent activity yet.</p>
        )}

        {events.map((e, i) => (
          <div key={i} className="flex items-start space-x-3">
            <div className="w-2 h-2 rounded-full bg-cyan-300 mt-2 shadow-[0_0_10px_rgba(0,255,255,0.6)]" />

            <div>
              <p className="text-cyan-100 text-sm">{e.description}</p>
              <p className="text-[#6B7A99] text-xs mt-1">
                {new Date(e.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
