import { useEffect, useRef, useState } from "react";

export default function SOCTerminal() {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState([
    "SOC Terminal v2 — Connected",
    "Type 'help' to see available commands"
  ]);

  const terminalRef = useRef(null);

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [lines]);

  function runCommand(cmd) {
    const lower = cmd.toLowerCase();

    if (lower === "help") {
      return [
        "Available commands:",
        "help — show commands",
        "events — show recent alerts",
        "clear — clear terminal"
      ];
    }

    if (lower === "events") {
      return [
        "[ALERT] Suspicious login from 185.23.91.10",
        "[ALERT] PowerShell script executed",
        "[INFO] User 'student' authenticated successfully"
      ];
    }

    if (lower === "clear") {
      setLines([]);
      return [];
    }

    return [`Unknown command: ${cmd}`];
  }

  function handleSubmit(e) {
    e.preventDefault();

    const output = runCommand(input);
    setLines(prev => [...prev, `> ${input}`, ...output]);
    setInput("");
  }

  return (
    <div className="bg-black text-green-400 font-mono p-4 rounded-lg border border-green-700 h-96 flex flex-col">
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto whitespace-pre-wrap"
      >
        {lines.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-2 flex">
        <span className="mr-2">&gt;</span>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 bg-black text-green-400 outline-none"
        />
      </form>
    </div>
  );
}
