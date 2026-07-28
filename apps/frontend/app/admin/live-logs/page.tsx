"use client";

import { useEffect, useRef, useState } from "react";

export default function LiveLogsPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/logs");

    ws.onmessage = (event) => {
      setLogs((prev) => [...prev, event.data]);
    };

    return () => ws.close();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Live SOC Logs</h2>

      <div className="bg-black text-green-400 p-4 rounded-lg h-[600px] overflow-y-scroll font-mono text-sm">
        {logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
