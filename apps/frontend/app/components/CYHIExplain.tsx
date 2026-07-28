"use client";

import { useState } from "react";

export default function CYHIExplain({ text }) {
  const [explanation, setExplanation] = useState("");

  const runExplain = () => {
    setExplanation(
      "This is where the AI will break down the concept into simple, medium, and advanced explanations using your lesson context."
    );
  };

  return (
    <div className="bg-[#121826] p-6 rounded-xl border border-[#1c2333] mt-6">

      <h3 className="text-xl font-semibold mb-3">CY‑HI Explain</h3>

      <p className="text-gray-300 mb-4">{text}</p>

      <button
        onClick={runExplain}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 font-semibold hover:opacity-90"
      >
        Explain This
      </button>

      {explanation && (
        <div className="mt-6 bg-[#0f1522] p-4 rounded-xl border border-[#1c2333] text-gray-300">
          {explanation}
        </div>
      )}

    </div>
  );
}
