"use client";

import { useState } from "react";

export default function AICaseGenerator() {
  const [prompt, setPrompt] = useState("");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [artefacts, setArtefacts] = useState({
    usb: true,
    registry: false,
    browser: false,
    network: false,
  });
  const [length, setLength] = useState("Single mission");
  const [generatedCase, setGeneratedCase] = useState(null);

  const toggleArtefact = (key: keyof typeof artefacts) => {
    setArtefacts({ ...artefacts, [key]: !artefacts[key] });
  };

  const generateCase = () => {
    if (!prompt.trim()) return;

    // Placeholder AI‑generated case
    setGeneratedCase({
      title: "Suspicious USB in Shared Workstation",
      summary:
        "A USB device is discovered plugged into a shared workstation in the SOC. The analyst must determine whether the device is malicious, identify key artefacts, and produce a short report.",
      missions: [
        {
          name: "Identify Device",
          tasks: [
            "Determine the type of USB device",
            "Extract and review filesystem metadata",
          ],
        },
        {
          name: "Analyse Artefacts",
          tasks: [
            "Identify suspicious files and directories",
            "Correlate timestamps with user activity",
          ],
        },
        {
          name: "Produce Findings",
          tasks: [
            "Assess risk level",
            "Write a concise incident summary",
          ],
        },
      ],
      evidence: [
        "USB metadata (vendor, serial, format)",
        "File listing with hidden directories",
        "Witness statement from workstation user",
      ],
    });
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-10">

      {/* Header */}
      <h1 className="text-4xl font-bold mb-2">AI Case Generator</h1>
      <p className="text-gray-400 mb-10">
        Auto‑create DFIR missions from a scenario description
      </p>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">

        {/* Left: Case Parameters */}
        <div className="xl:col-span-5 bg-[#121826] p-8 rounded-xl border border-[#1c2333] shadow-lg">

          <h2 className="text-2xl font-semibold mb-6">Case Parameters</h2>

          {/* Scenario Prompt */}
          <div className="mb-6">
            <label className="text-gray-300 text-sm">Scenario Description</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="
                w-full mt-2 p-4 rounded-xl bg-[#0f1522] text-white 
                border border-[#1c2333] focus:outline-none 
                focus:ring-2 focus:ring-cyan-400
              "
              rows={6}
              placeholder="Example: A suspicious USB device is found plugged into a shared workstation in the SOC..."
            />
          </div>

          {/* Difficulty */}
          <div className="mb-6">
            <label className="text-gray-300 text-sm">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="
                w-full mt-2 p-3 rounded-xl bg-[#0f1522] text-white 
                border border-[#1c2333] focus:outline-none 
                focus:ring-2 focus:ring-cyan-400
              "
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          {/* Artefact Types */}
          <div className="mb-6">
            <label className="text-gray-300 text-sm">Artefact Types</label>
            <div className="mt-3 space-y-2">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={artefacts.usb}
                  onChange={() => toggleArtefact("usb")}
                  className="w-5 h-5 accent-cyan-400"
                />
                <span>USB / removable media</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={artefacts.registry}
                  onChange={() => toggleArtefact("registry")}
                  className="w-5 h-5 accent-cyan-400"
                />
                <span>Windows registry</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={artefacts.browser}
                  onChange={() => toggleArtefact("browser")}
                  className="w-5 h-5 accent-cyan-400"
                />
                <span>Browser artefacts</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={artefacts.network}
                  onChange={() => toggleArtefact("network")}
                  className="w-5 h-5 accent-cyan-400"
                />
                <span>Network traffic</span>
              </label>
            </div>
          </div>

          {/* Length */}
          <div className="mb-6">
            <label className="text-gray-300 text-sm">Case Length</label>
            <select
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="
                w-full mt-2 p-3 rounded-xl bg-[#0f1522] text-white 
                border border-[#1c2333] focus:outline-none 
                focus:ring-2 focus:ring-cyan-400
              "
            >
              <option>Single mission</option>
              <option>Short multi‑mission case</option>
              <option>Full semester case</option>
            </select>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateCase}
            className="
              mt-4 w-full py-3 rounded-xl font-semibold 
              bg-gradient-to-r from-cyan-400 to-blue-600 
              hover:opacity-90 transition-all duration-300
            "
          >
            Generate Case
          </button>
        </div>

        {/* Right: Generated Case Preview */}
        <div className="xl:col-span-7 bg-[#121826] p-8 rounded-xl border border-[#1c2333] shadow-lg">

          <h2 className="text-2xl font-semibold mb-6">Generated Case Preview</h2>

          {!generatedCase && (
            <div className="h-full flex items-center justify-center text-gray-500">
              Fill in the parameters and click <span className="ml-1 text-cyan-400 font-semibold">Generate Case</span>.
            </div>
          )}

          {generatedCase && (
            <div className="space-y-8">

              {/* Case Summary */}
              <div className="bg-[#0f1522] p-6 rounded-xl border border-[#1c2333]">
                <h3 className="text-xl font-semibold mb-2 text-cyan-400">
                  {generatedCase.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {generatedCase.summary}
                </p>
              </div>

              {/* Missions & Tasks */}
              <div className="bg-[#0f1522] p-6 rounded-xl border border-[#1c2333]">
                <h3 className="text-xl font-semibold mb-3">Missions & Tasks</h3>
                <div className="space-y-4">
                  {generatedCase.missions.map((mission, i) => (
                    <div key={i} className="bg-[#121826] p-4 rounded-lg border border-[#1c2333]">
                      <p className="font-semibold text-blue-400 mb-2">{mission.name}</p>
                      <ul className="text-gray-300 text-sm space-y-1">
                        {mission.tasks.map((task, j) => (
                          <li key={j}>• {task}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evidence */}
              <div className="bg-[#0f1522] p-6 rounded-xl border border-[#1c2333]">
                <h3 className="text-xl font-semibold mb-3">Evidence Pack</h3>
                <ul className="text-gray-300 space-y-2">
                  {generatedCase.evidence.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-400 to-green-600 font-semibold hover:opacity-90">
                  Save as Module Case
                </button>
                <button className="px-8 py-3 rounded-xl bg-[#1c2333] border border-[#2a3248]">
                  Export as JSON
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
