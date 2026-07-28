"use client";

import { useState } from "react";

export default function CYHINotes() {
  const [notes, setNotes] = useState("");
  const [aiNotes, setAiNotes] = useState("");

  const tidyNotes = () => {
    setAiNotes(
      "Here is a cleaned, structured version of your notes with key points highlighted and unnecessary text removed."
    );
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-10">

      <h1 className="text-4xl font-bold mb-2">CY‑HI Notes</h1>
      <p className="text-gray-400 mb-10">Smart note‑taking assistant</p>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

        {/* Note Editor */}
        <div className="bg-[#121826] p-8 rounded-xl border border-[#1c2333] shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Your Notes</h2>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full h-[400px] p-4 rounded-xl bg-[#0f1522] border border-[#1c2333] text-white"
            placeholder="Write or paste your notes here…"
          />

          <button
            onClick={tidyNotes}
            className="mt-6 px-10 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 font-semibold hover:opacity-90"
          >
            Tidy My Notes
          </button>
        </div>

        {/* AI Output */}
        <div className="bg-[#121826] p-8 rounded-xl border border-[#1c2333] shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">AI‑Optimised Notes</h2>

          {!aiNotes && (
            <p className="text-gray-500">AI‑enhanced notes will appear here.</p>
          )}

          {aiNotes && (
            <div className="bg-[#0f1522] p-4 rounded-xl border border-[#1c2333] text-gray-300 h-[400px] overflow-y-auto">
              {aiNotes}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
