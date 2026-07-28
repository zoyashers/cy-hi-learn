
"use client";

export default function MissionCard({
  title,
  difficulty,
  xp,
  progress,
  status,
  completed,
  locked,
}: {
  title: string;
  difficulty?: string;
  xp?: string;
  progress?: number;
  status?: string;
  completed?: boolean;
  locked?: boolean;
}) {
  return (
    <div
      className={`p-5 rounded-xl bg-[#121826] shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-cyan-500/20 ${
        locked ? "opacity-50 cursor-not-allowed" : ""
      }`}
      style={{ transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        card.style.transform = `rotateY(${x / 40}deg) rotateX(${-y / 40}deg)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "rotateY(0deg) rotateX(0deg)";
      }}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {difficulty && <p className="text-sm text-gray-400">{difficulty}</p>}
      {xp && <p className="text-sm text-cyan-400">{xp}</p>}

      {progress !== undefined && (
        <div className="mt-3 w-full h-2 bg-[#1c2333] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {completed && <p className="mt-3 text-green-400 font-medium">✓ Completed</p>}
      {locked && <p className="mt-3 text-gray-500 font-medium">🔒 Locked</p>}
      {status && <p className="mt-3 text-purple-400">{status}</p>}
    </div>
  );
}
