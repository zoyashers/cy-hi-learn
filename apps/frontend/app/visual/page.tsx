"use client";

import { useState } from "react";

export default function CYHIVisual() {
  const [prompt, setPrompt] = useState("");
  const [generated, setGenerated] = useState(null);

  const generateVisual = () => {
    if (!prompt.trim()) return;

    // Placeholder for AI-generated diagram
    setGenerated({
      title: prompt,
      description: "This is where the AI-generated diagram will appear.",
    });
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white grid grid-cols-1 lg:grid-cols-4">

      {/* Sidebar History */}
      <div className="bg-[#121826] border-r border-[#1c2333] p-6 space-y-4 lg:col-span-1">
        <h2 className="text-xl font-semibold mb-4">Visual History</h2>

        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-[#0f1522] border border-[#1c2333] cursor-pointer hover:bg-[#1a2235] transition">
            DNS Poisoning
          </div>
          <div className="p-3 rounded-lg bg-[#0f1522] border border-[#1c2333] cursor-pointer hover:bg-[#1a2235] transition">
            TCP 3-Way Handshake
          </div>
          <div className="p-3 rounded-lg bg-[#0f1522] border border-[#1c2333] cursor-pointer hover:bg-[#1a2235] transition">
            Phishing Attack Flow
          </div>
        </div>
      </div>

      {/* Main Visual Generator */}
      <div className="lg:col-span-3 flex flex-col h-screen p-8">

        {/* Header */}
        <h1 className="text-3xl font-bold mb-6">CY‑HI Visual</h1>

        {/* Input Box */}
        <div className="flex items-center space-x-4 mb-8">
          <input
            type="text"
            placeholder="Explain DNS Poisoning…"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="
              flex-1 p-4 rounded-xl bg-[#121826] text-white 
              border border-[#1c2333] focus:outline-none 
              focus:ring-2 focus:ring-cyan-400
            "
          />

          <button
            onClick={generateVisual}
            className="
              px-6 py-4 rounded-xl font-semibold 
              bg-gradient-to-r from-cyan-400 to-blue-600 
              hover:opacity-90 transition
            "
          >
            Generate
          </button>
        </div>

        {/* Visual Output */}
        <div className="flex-1 bg-[#121826] rounded-xl border border-[#1c2333] p-6 shadow-lg overflow-y-auto">

          {!generated && (
            <div className="h-full flex items-center justify-center text-gray-500">
              Enter a concept above to generate a visual diagram.
            </div>
          )}

          {generated && (
            <div className="space-y-6">

              <h2 className="text-2xl font-semibold text-cyan-400">
                {generated.title}
              </h2>

              <div className="bg-[#0f1522] h-[500px] rounded-lg border border-[#1c2333] flex items-center justify-center text-gray-500">
                AI‑Generated Diagram Placeholder
              </div>

              <p className="text-gray-300 leading-relaxed">
                {generated.description}
              </p>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
