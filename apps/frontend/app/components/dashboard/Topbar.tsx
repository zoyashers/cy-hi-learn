export default function Topbar() {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-semibold">Welcome back, Zoya 👋</h1>
        <p className="text-gray-400 text-sm">
          Continue your cybersecurity journey and level up your skills.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-400">🔥 14‑day streak</div>
        <img
          src="/profile-avatar.png"
          className="w-10 h-10 rounded-full border border-white/10"
        />
      </div>
    </div>
  );
}
