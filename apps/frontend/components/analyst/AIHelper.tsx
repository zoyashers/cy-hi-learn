"use client";

import { useState } from "react";
import { apiPost } from "@/lib/api";

export default function AIHelper({ caseId }: { caseId: string }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const askAI = async () => {
    if (!input.trim()) return;
    const res = await apiPost(`/analyst/ai`, {
      case_id: Number(caseId),
      question: input,
    });

    setMessages((prev) => [...prev, `You: ${input}`, `AI: ${res.answer}`]);
    setInput("");
  };

  return (
    <div className="bg-white p-4 rounded shadow space-y-4">
      <div className="h-64 overflow-y-scroll bg-gray-100 p-3 rounded">
        {messages.map((m, i) => (
          <div key={i} className="mb-2">
            {m}
          </div>
        ))}
      </div>

      <div className="flex space-x-2">
        <input
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the AI about this case…"
        />
        <button
          onClick={askAI}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
