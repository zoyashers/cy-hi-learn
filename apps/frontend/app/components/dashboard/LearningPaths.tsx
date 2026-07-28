export default function LearningPaths() {
  const paths = [
    "Digital Forensics",
    "SOC Analyst",
    "Incident Response",
    "Malware Analysis",
    "Threat Intelligence",
  ];

  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">Learning Paths</h2>

      <div className="grid grid-cols-5 gap-4">
        {paths.map((p) => (
          <div
            key={p}
            className="bg-[#111827] border border-white/10 rounded-xl p-4 hover:bg-white/5 transition"
          >
            <p className="font-medium">{p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
