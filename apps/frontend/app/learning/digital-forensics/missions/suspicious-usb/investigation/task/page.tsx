"use client";

import { useState } from "react";

export default function TaskSubmissionPage() {
  const [answer, setAnswer] = useState("");

  const submitTask = () => {
    if (!answer.trim()) return;
    alert("Task submitted successfully.");
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">

      {/* Task Area */}
      <div className="lg:col-span-8 bg-[#121826] p-8 rounded-xl border border-[#1c2333] shadow-lg">

        {/* Task Question */}
        <h1 className="text-3xl font-bold mb-4">Task: Identify Device</h1>
        <p className="text-gray-300 mb-8 leading-relaxed">
          Based on the evidence provided, identify the type of USB device found
          in the workstation and explain why it may be considered suspicious.
        </p>

        {/* Response Box */}
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Write your findings here..."
          className="
            w-full h-64 p-4 rounded-xl bg-[#0f1522] text-white 
            border border-[#1c2333] focus:outline-none 
            focus:ring-2 focus:ring-cyan-400
          "
        />

        {/* Submit Button */}
        <button
          onClick={submitTask}
          className="
            mt-6 px-10 py-3 rounded-xl font-semibold 
            bg-gradient-to-r from-cyan-400 to-blue-600 
            hover:opacity-90 transition-all duration-300
          "
        >
          Submit
        </button>
      </div>

      {/* Evidence Panel */}
      <div className="lg:col-span-4 bg-[#121826] p-8 rounded-xl border border-[#1c2333] shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold mb-2">Relevant Evidence</h2>

        <div className="bg-[#0f1522] p-4 rounded-lg border border-[#1c2333]">
          <h3 className="text-lg font-semibold mb-1">USB Metadata</h3>
          <p className="text-gray-400 text-sm">Vendor: Kingston</p>
          <p className="text-gray-400 text-sm">Serial: 8F29-AC11</p>
          <p className="text-gray-400 text-sm">Format: FAT32</p>
        </div>

        <div className="bg-[#0f1522] p-4 rounded-lg border border-[#1c2333]">
          <h3 className="text-lg font-semibold mb-1">File Listing</h3>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>• report.docx</li>
            <li>• passwords.txt</li>
            <li>• system32_dump.bin</li>
            <li>• hidden/.cache</li>
          </ul>
        </div>

        <div className="bg-[#0f1522] p-4 rounded-lg border border-[#1c2333]">
          <h3 className="text-lg font-semibold mb-1">Witness Statement</h3>
          <p className="text-gray-400 text-sm">
            “I found the USB already plugged into my workstation when I arrived.”
          </p>
        </div>
      </div>

    </div>
  );
}
