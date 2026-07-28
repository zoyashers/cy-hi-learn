"use client";

export default function MissionAnalyticsHeatmap() {
  const heatmap = [
    [82, 76, 91, 88],
    [70, 65, 80, 74],
    [92, 89, 95, 90],
  ];

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-10">

      <h1 className="text-4xl font-bold mb-2">Mission Analytics Heatmap</h1>
      <p className="text-gray-400 mb-10">Visualise student performance across missions</p>

      <div className="bg-[#121826] p-8 rounded-xl border border-[#1c2333] shadow-lg inline-block">

        <div className="grid grid-cols-4 gap-4">
          {heatmap.flat().map((score, i) => (
            <div
              key={i}
              className="w-20 h-20 flex items-center justify-center rounded-xl text-white font-semibold"
              style={{
                backgroundColor:
                  score > 85
                    ? "#0ea5e9"
                    : score > 75
                    ? "#3b82f6"
                    : score > 65
                    ? "#6366f1"
                    : "#7c3aed",
              }}
            >
              {score}%
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
