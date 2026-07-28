"use client";

import { useState } from "react";

export default function ModuleCreationWizard() {
  const [step, setStep] = useState(1);

  // Form state
  const [moduleInfo, setModuleInfo] = useState({
    title: "",
    description: "",
    difficulty: "Beginner",
  });

  const [lessons, setLessons] = useState([{ title: "", content: "" }]);
  const [missions, setMissions] = useState([]);

  const addLesson = () => {
    setLessons([...lessons, { title: "", content: "" }]);
  };

  const toggleMission = (mission) => {
    if (missions.includes(mission)) {
      setMissions(missions.filter((m) => m !== mission));
    } else {
      setMissions([...missions, mission]);
    }
  };

  const finishWizard = () => {
    alert("Module created successfully.");
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-10">

      {/* Header */}
      <h1 className="text-4xl font-bold mb-2">Module Creation Wizard</h1>
      <p className="text-gray-400 mb-10">Create a new learning module step‑by‑step</p>

      {/* Step Indicator */}
      <div className="flex items-center space-x-6 mb-12">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`
              px-6 py-3 rounded-xl font-semibold border 
              ${step === s ? "bg-cyan-500 border-cyan-400" : "bg-[#121826] border-[#1c2333]"}
            `}
          >
            Step {s}
          </div>
        ))}
      </div>

      {/* Step 1 — Module Info */}
      {step === 1 && (
        <div className="bg-[#121826] p-8 rounded-xl border border-[#1c2333] shadow-lg max-w-3xl">

          <h2 className="text-2xl font-semibold mb-6">Module Information</h2>

          <label className="text-gray-300 text-sm">Module Title</label>
          <input
            type="text"
            value={moduleInfo.title}
            onChange={(e) => setModuleInfo({ ...moduleInfo, title: e.target.value })}
            className="w-full mt-2 mb-6 p-3 rounded-xl bg-[#0f1522] border border-[#1c2333] text-white"
          />

          <label className="text-gray-300 text-sm">Description</label>
          <textarea
            value={moduleInfo.description}
            onChange={(e) => setModuleInfo({ ...moduleInfo, description: e.target.value })}
            className="w-full mt-2 mb-6 p-3 rounded-xl bg-[#0f1522] border border-[#1c2333] text-white"
            rows={5}
          />

          <label className="text-gray-300 text-sm">Difficulty</label>
          <select
            value={moduleInfo.difficulty}
            onChange={(e) => setModuleInfo({ ...moduleInfo, difficulty: e.target.value })}
            className="w-full mt-2 mb-6 p-3 rounded-xl bg-[#0f1522] border border-[#1c2333] text-white"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <button
            onClick={() => setStep(2)}
            className="px-10 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 font-semibold hover:opacity-90"
          >
            Next
          </button>
        </div>
      )}

      {/* Step 2 — Lessons */}
      {step === 2 && (
        <div className="bg-[#121826] p-8 rounded-xl border border-[#1c2333] shadow-lg">

          <h2 className="text-2xl font-semibold mb-6">Add Lessons</h2>

          <div className="space-y-8">
            {lessons.map((lesson, i) => (
              <div key={i} className="bg-[#0f1522] p-6 rounded-xl border border-[#1c2333]">
                <label className="text-gray-300 text-sm">Lesson Title</label>
                <input
                  type="text"
                  value={lesson.title}
                  onChange={(e) => {
                    const updated = [...lessons];
                    updated[i].title = e.target.value;
                    setLessons(updated);
                  }}
                  className="w-full mt-2 mb-4 p-3 rounded-xl bg-[#121826] border border-[#1c2333] text-white"
                />

                <label className="text-gray-300 text-sm">Content</label>
                <textarea
                  value={lesson.content}
                  onChange={(e) => {
                    const updated = [...lessons];
                    updated[i].content = e.target.value;
                    setLessons(updated);
                  }}
                  className="w-full mt-2 p-3 rounded-xl bg-[#121826] border border-[#1c2333] text-white"
                  rows={5}
                />
              </div>
            ))}
          </div>

          <button
            onClick={addLesson}
            className="mt-6 px-8 py-3 rounded-xl bg-[#0f1522] border border-[#1c2333] hover:bg-[#1a2235]"
          >
            + Add Another Lesson
          </button>

          <div className="mt-10 flex space-x-4">
            <button
              onClick={() => setStep(1)}
              className="px-8 py-3 rounded-xl bg-[#1c2333] border border-[#2a3248]"
            >
              Back
            </button>

            <button
              onClick={() => setStep(3)}
              className="px-10 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 font-semibold hover:opacity-90"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 3 — Link Missions */}
      {step === 3 && (
        <div className="bg-[#121826] p-8 rounded-xl border border-[#1c2333] shadow-lg max-w-4xl">

          <h2 className="text-2xl font-semibold mb-6">Link Missions</h2>

          <p className="text-gray-400 mb-6">Select missions to attach to this module</p>

          <div className="space-y-4">
            {["Suspicious USB Device", "Windows Registry", "Browser Artifacts", "Network Traffic Analysis"].map(
              (mission) => (
                <label key={mission} className="flex items-center space-x-3 bg-[#0f1522] p-4 rounded-xl border border-[#1c2333]">
                  <input
                    type="checkbox"
                    checked={missions.includes(mission)}
                    onChange={() => toggleMission(mission)}
                    className="w-5 h-5 accent-cyan-400"
                  />
                  <span>{mission}</span>
                </label>
              )
            )}
          </div>

          <div className="mt-10 flex space-x-4">
            <button
              onClick={() => setStep(2)}
              className="px-8 py-3 rounded-xl bg-[#1c2333] border border-[#2a3248]"
            >
              Back
            </button>

            <button
              onClick={() => setStep(4)}
              className="px-10 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 font-semibold hover:opacity-90"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 4 — Review & Create */}
      {step === 4 && (
        <div className="bg-[#121826] p-8 rounded-xl border border-[#1c2333] shadow-lg max-w-4xl">

          <h2 className="text-2xl font-semibold mb-6">Review & Create Module</h2>

          <div className="space-y-6">

            <div className="bg-[#0f1522] p-4 rounded-xl border border-[#1c2333]">
              <h3 className="text-lg font-semibold mb-2">Module Info</h3>
              <p><strong>Title:</strong> {moduleInfo.title}</p>
              <p><strong>Description:</strong> {moduleInfo.description}</p>
              <p><strong>Difficulty:</strong> {moduleInfo.difficulty}</p>
            </div>

            <div className="bg-[#0f1522] p-4 rounded-xl border border-[#1c2333]">
              <h3 className="text-lg font-semibold mb-2">Lessons</h3>
              <ul className="text-gray-300 space-y-2">
                {lessons.map((l, i) => (
                  <li key={i}>• {l.title || "Untitled Lesson"}</li>
                ))}
              </ul>
            </div>

            <div className="bg-[#0f1522] p-4 rounded-xl border border-[#1c2333]">
              <h3 className="text-lg font-semibold mb-2">Linked Missions</h3>
              <ul className="text-gray-300 space-y-2">
                {missions.length > 0 ? missions.map((m, i) => <li key={i}>• {m}</li>) : <li>No missions selected</li>}
              </ul>
            </div>

          </div>

          <div className="mt-10 flex space-x-4">
            <button
              onClick={() => setStep(3)}
              className="px-8 py-3 rounded-xl bg-[#1c2333] border border-[#2a3248]"
            >
              Back
            </button>

            <button
              onClick={finishWizard}
              className="px-10 py-3 rounded-xl bg-gradient-to-r from-green-400 to-green-600 font-semibold hover:opacity-90"
            >
              Create Module
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
