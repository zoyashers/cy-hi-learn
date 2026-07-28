export default function StatsGrid() {
  return (
    <div className="grid grid-cols-4 gap-6">
      <Stat title="Level" value="18" subtitle="Cyber Investigator" />
      <Stat title="Total XP" value="24,580" subtitle="XP Earned" />
      <Stat title="Missions Completed" value="47" subtitle="Total Missions" />
      <Stat title="Current Streak" value="14" subtitle="Days in a row" />
    </div>
  );
}

function Stat({ title, value, subtitle }) {
  return (
    <div className="bg-[#111827] rounded-xl p-4 border border-white/10">
      <h4 className="text-sm text-gray-400">{title}</h4>
      <p className="text-2xl font-semibold mt-1">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}
