"use client";

export default function InvestigationWorkspace() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">

      {/* Evidence Panel */}
      <div className="lg:col-span-3 bg-[#121826] p-6 rounded-xl border border-[#1c2333] shadow-lg space-y-6">
        <h2 className="text-xl font-semibold mb-2">Evidence Panel</h2>

        <div className="bg-[#0f1522] p-4 rounded-lg border border-[#1c2333]">
          <h3 className="text-lg font-semibold mb-1">Witness Statement</h3>
          <p className="text-gray-400 text-sm">
            “I found the USB already plugged into my workstation when I arrived.
            I didn’t touch it.”
          </p>
        </div>

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
          <h3 className="text-lg font-semibold mb-1">Image Evidence</h3>
          <p className="text-gray-400 text-sm">USB photo, workstation photo.</p>
        </div>
      </div>

      {/* Evidence Viewer */}
      <div className="lg:col-span-6 bg-[#121826] p-6 rounded-xl border border-[#1c2333] shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Evidence Viewer</h2>

        <div className="bg-[#0f1522] h-[500px] rounded-lg border border-[#1c2333] flex items-center justify-center text-gray-500">
          <p>Select evidence from the left panel to view details.</p>
        </div>
      </div>

      {/* Task Checklist */}
      <div className="lg:col-span-3 bg-[#121826] p-6 rounded-xl border border-[#1c2333] shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Task Checklist</h2>

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
            mt-10 w-full py-3 
            bg-gradient-to-r from-cyan-400 to-blue-600 
            text-white font-semibold rounded-lg 
            hover:opacity-90 transition-all duration-300
          "
        >
          SUBMIT TASK
        </button>
      </div>

    </div>
  );
}
