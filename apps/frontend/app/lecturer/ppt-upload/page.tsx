"use client";

import { useState } from "react";

export default function PPTUploadPage() {
  const [file, setFile] = useState(null);
  const [uploadHistory, setUploadHistory] = useState([]);

  const handleUpload = () => {
    if (!file) return;

    const newEntry = {
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + " MB",
      date: new Date().toLocaleString(),
    };

    setUploadHistory([newEntry, ...uploadHistory]);
    setFile(null);
    alert("PPT uploaded successfully.");
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-10">

      {/* Header */}
      <h1 className="text-4xl font-bold mb-2">PPT Upload</h1>
      <p className="text-gray-400 mb-10">Upload lesson slides for your modules</p>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">

        {/* Upload Panel */}
        <div className="xl:col-span-5 bg-[#121826] p-8 rounded-xl border border-[#1c2333] shadow-lg">

          <h2 className="text-2xl font-semibold mb-6">Upload Slides</h2>

          {/* File Input */}
          <div className="border-2 border-dashed border-[#1c2333] rounded-xl p-10 text-center bg-[#0f1522]">
            <input
              type="file"
              accept=".ppt,.pptx"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
              id="pptInput"
            />

            <label
              htmlFor="pptInput"
              className="cursor-pointer text-gray-300 hover:text-cyan-400 transition"
            >
              {file ? (
                <span className="text-lg">{file.name}</span>
              ) : (
                <span className="text-lg">Click to upload PPT or PPTX file</span>
              )}
            </label>
          </div>

          {/* Module Assignment */}
          <div className="mt-6">
            <label className="text-gray-300 text-sm">Assign to Module</label>
            <select
              className="
                w-full mt-2 p-3 rounded-xl bg-[#0f1522] text-white 
                border border-[#1c2333] focus:outline-none focus:ring-2 focus:ring-cyan-400
              "
            >
              <option>Digital Forensics</option>
              <option>SOC Analyst</option>
              <option>Incident Response</option>
              <option>Network Forensics</option>
            </select>
          </div>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            className="
              mt-8 w-full py-3 rounded-xl font-semibold 
              bg-gradient-to-r from-cyan-400 to-blue-600 
              hover:opacity-90 transition-all duration-300
            "
          >
            Upload PPT
          </button>
        </div>

        {/* Upload History */}
        <div className="xl:col-span-7 bg-[#121826] p-8 rounded-xl border border-[#1c2333] shadow-lg">

          <h2 className="text-2xl font-semibold mb-6">Upload History</h2>

          {uploadHistory.length === 0 && (
            <p className="text-gray-500">No uploads yet.</p>
          )}

          <div className="space-y-4">
            {uploadHistory.map((entry, i) => (
              <div
                key={i}
                className="bg-[#0f1522] p-4 rounded-lg border border-[#1c2333] flex justify-between items-center"
              >
                <div>
                  <p className="text-lg font-semibold">{entry.name}</p>
                  <p className="text-gray-400 text-sm">
                    {entry.size} • {entry.date}
                  </p>
                </div>

                <button className="text-cyan-400 hover:underline">
                  View
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
