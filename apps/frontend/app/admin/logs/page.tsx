"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    apiGet("/admin/logs").then((data) => setLogs(data.logs));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">System Logs</h2>

      <div className="bg-black text-green-400 p-4 rounded-lg h-[500px] overflow-y-scroll font-mono text-sm">
        {logs.map((log: any) => (
          <div key={log.id} className="mb-1">
            [{log.timestamp}] {log.message}
          </div>
        ))}
      </div>
    </div>
  );
}
