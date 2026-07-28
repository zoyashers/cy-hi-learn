"use client";

import { useState } from "react";

export default function MissionCommandCentre() {
  const [notes, setNotes] = useState("");

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-10">

      {/* Header */}
      <h1 className="text-4xl font-bold mb-2">Mission Command Centre</h1>
      <p className="text-gray-400 mb-10">Suspicious USB Device</p>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

        {/* Evidence Board */}
        <div className="xl:col-span-5 bg-[#121826] p-8 rounded-xl border border-[#1c2333] shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Evidence Board</h2>

          <div className="space-y-4">

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

        {/* Case Notes */}
        <div className="xl:col-span-4 bg-[#121826] p-8 rounded-xl border border-[#1c2333] shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Case Notes</h2>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your investigation notes here..."
            className="
              w-full h-[400px] p-4 rounded-xl bg-[#0f1522] text-white 
              border border-[#1c2333] focus:outline-none 
              focus:ring-2 focus:ring-cyan-400
            "
          />

          <button
            className="
              mt-6 px-8 py-3 rounded-xl font-semibold 
              bg-gradient-to-r from-cyan-400 to-blue-600 
              hover:opacity-90 transition-all duration-300
            "
          >
            Save Notes
          </button>
        </div>

        {/* Timeline + Tasks */}
        <div className="xl:col-span-3 space-y-8">

          {/* Timeline */}
          <div className="bg-[#121826] p-8 rounded-xl border border-[#1c2333] shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Mission Timeline</h2>

            <div className="space-y-4">

              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-cyan-400 rounded-full mt-1"></div>
                <p className="text-gray-300">USB discovered in workstation</p>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full mt-1"></div>
                <p className="text-gray-300">Initial scan performed</p>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-purple-400 rounded-full mt-1"></div>
                <p className="text-gray-300">Suspicious files identified</p>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 bg-gray-500 rounded-full mt-1"></div>
                <p className="text-gray-300">Pending: Final report</p>
              </div>

            </div>
          </div>

          {/* Task List */}
          <div className="bg-[#121826] p-8 rounded-xl border border-[#1c2333] shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Task List</h2>

            <div className="space-y-4">

              <label className="flex items-center space-x-3">
                <input type="checkbox" className="w-5 h-5 accent-cyan-400" />
                <span>Identify Device</span>
              </label>

              <label className="flex items-center space-x-3">
                <input type="checkbox" className="w-5 h-5 accent-cyan-400" />
                <span>Determine Last User</span>
              </label>

              <label className="flex items-center space-x-3">
                <input type="checkbox" className="w-5 h-5 accent-cyan-400" />
                <span>Assess Risk</span>
              </label>

              <label className="flex items-center space-x-3">
                <input type="checkbox" className="w-5 h-5 accent-cyan-400" />
                <span>Produce Findings</span>
              </label>

            </div>

            <button
              className="
                mt-8 w-full py-3 rounded-xl font-semibold 
                bg-gradient-to-r from-cyan-400 to-blue-600 
                hover:opacity-90 transition-all duration-300
              "
            >
              Submit Mission
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
