"use client";

import { useState } from "react";

export default function SOCTerminalPage() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const runCommand = async () => {
    if (!input.trim()) return;

    const res = await fetch("/api/ai/terminal", {
      method: "POST",
      body: JSON.stringify({ command: input }),
    });

    const data = await res.json();

    setHistory([...history, `> ${input}`, data.output]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-10 font-mono">

      <h1 className="text-4xl font-bold mb-6">CY‑HI SOC Terminal</h1>

      <div className="bg-black/40 border border-[var(--border)] rounded-xl p-6 h-[70vh] overflow-y-auto space-y-2">
        {history.map((line, i) => (
          <pre key={i} className="text-sm whitespace-pre-wrap">
            {line}
          </pre>
        ))}
      </div>

      <div className="mt-6 flex space-x-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && runCommand()}
          className="flex-1 p-4 rounded-xl bg-black/40 border border-[var(--border)] text-white"
          placeholder="Type a command…"
        />
        <button onClick={runCommand} className="button-primary">
          Run
        </button>
      </div>
    </div>
  );
}
