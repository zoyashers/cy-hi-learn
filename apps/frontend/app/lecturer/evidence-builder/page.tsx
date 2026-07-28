"use client";

import { useState } from "react";

export default function EvidencePackBuilder() {
  const [prompt, setPrompt] = useState("");
  const [generated, setGenerated] = useState(null);

  const generateEvidence = () => {
    setGenerated({
      files: [
        "usb_metadata.json",
        "file_listing.txt",
        "witness_statement.txt",
        "timestamps.csv",
      ],
      preview:
        "This evidence pack includes metadata, file listings, timestamps, and a witness statement relevant to the scenario.",
    });
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-10">

      <h1 className="text-4xl font-bold mb-2">AI Evidence Pack Builder</h1>
      <p className="text-gray-400 mb-10">Generate evidence files for missions</p>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

        {/* Input */}
        <div className="bg-[#121826] p-8 rounded-xl border border-[#1c2333] shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Scenario Prompt</h2>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-[300px] p-4 rounded-xl bg-[#0f1522] border border-[#1c2333] text-white"
            placeholder="Describe the scenario for which evidence should be generated…"
          />

          <button
            onClick={generateEvidence}
            className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 font-semibold hover:opacity-90"
          >
            Generate Evidence Pack
          </button>
        </div>

        {/* Output */}
        <div className="bg-[#121826] p-8 rounded-xl border border-[#1c2333] shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Generated Evidence</h2>

          {!generated && (
            <p className="text-gray-500">AI evidence will appear here.</p>
          )}

          {generated && (
            <div className="space-y-6">
              <div className="bg-[#0f1522] p-4 rounded-xl border border-[#1c2333]">
                <h3 className="text-lg font-semibold mb-2">Files</h3>
                <ul className="text-gray-300 space-y-1">
                  {generated.files.map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#0f1522] p-4 rounded-xl border border-[#1c2333]">
                <h3 className="text-lg font-semibold mb-2">Preview</h3>
                <p className="text-gray-300">{generated.preview}</p>
              </div>

              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-green-400 to-green-600 font-semibold hover:opacity-90">
                Download Evidence Pack
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
