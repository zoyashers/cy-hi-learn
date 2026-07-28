"use client";

import { useEffect, useState } from "react";
import { apiGet, apiPost } from "@/lib/api";

export default function CaseNotes({ caseId }: { caseId: string }) {
  const [notes, setNotes] = useState<any[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    apiGet(`/analyst/cases/${caseId}/notes`).then((data) =>
      setNotes(data.notes)
    );

    const ws = new WebSocket(`ws://localhost:8000/ws/cases/${caseId}/notes`);

    ws.onmessage = (event) => {
      const note = JSON.parse(event.data);
      setNotes((prev) => [...prev, note]);
    };

    return () => ws.close();
  }, [caseId]);

  const addNote = async () => {
    if (!input.trim()) return;
    await apiPost(`/analyst/cases/${caseId}/notes`, { content: input });
    setInput("");
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <h3 className="text-xl font-semibold">Case Notes</h3>

      <div className="space-y-3 max-h-64 overflow-y-scroll">
        {notes.map((n) => (
          <div key={n.id} className="border p-3 rounded bg-gray-50">
            <p className="text-gray-800">{n.content}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(n.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="flex space-x-2">
        <input
          className="flex-1 border p-2 rounded"
          placeholder="Add a note…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={addNote}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}
