export default function AIToolsRow() {
  const tools = [
    { name: "AI Assistant", icon: "🤖" },
    { name: "AI Summaries", icon: "📝" },
    { name: "AI Lab Helper", icon: "🧪" },
    { name: "AI Code Explainer", icon: "💻" },
  ];

  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">AI Tools</h2>

      <div className="grid grid-cols-4 gap-4">
        {tools.map((t) => (
          <div
            key={t.name}
            className="bg-[#111827] border border-white/10 rounded-xl p-4 text-center hover:bg-white/5 transition"
          >
            <div className="text-2xl mb-2">{t.icon}</div>
            <p className="text-sm font-medium">{t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
