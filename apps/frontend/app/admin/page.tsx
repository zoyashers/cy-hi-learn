"use client";

export default function InstitutionAdminPanel() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-10">

      {/* Header */}
      <h1 className="text-4xl font-bold mb-2">Institution Admin Panel</h1>
      <p className="text-gray-400 mb-10">Manage lecturers, students, modules, and system settings</p>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">

        <div className="bg-[#121826] p-6 rounded-xl border border-[#1c2333] shadow-lg">
          <p className="text-gray-400 text-sm">Total Students</p>
          <p className="text-3xl font-bold text-cyan-400 mt-1">312</p>
        </div>

        <div className="bg-[#121826] p-6 rounded-xl border border-[#1c2333] shadow-lg">
          <p className="text-gray-400 text-sm">Total Lecturers</p>
          <p className="text-3xl font-bold text-blue-400 mt-1">18</p>
        </div>

        <div className="bg-[#121826] p-6 rounded-xl border border-[#1c2333] shadow-lg">
          <p className="text-gray-400 text-sm">Active Modules</p>
          <p className="text-3xl font-bold text-purple-400 mt-1">12</p>
        </div>

        <div className="bg-[#121826] p-6 rounded-xl border border-[#1c2333] shadow-lg">
          <p className="text-gray-400 text-sm">System Health</p>
          <p className="text-3xl font-bold text-green-400 mt-1">Stable</p>
        </div>

      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">

        {/* User Management */}
        <div className="xl:col-span-4 bg-[#121826] p-8 rounded-xl border border-[#1c2333] shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">User Management</h2>

          <div className="space-y-4">

            <button className="w-full py-3 rounded-xl bg-[#0f1522] border border-[#1c2333] hover:bg-[#1a2235] transition">
              Add Student
            </button>

            <button className="w-full py-3 rounded-xl bg-[#0f1522] border border-[#1c2333] hover:bg-[#1a2235] transition">
              Add Lecturer
            </button>

            <button className="w-full py-3 rounded-xl bg-[#0f1522] border border-[#1c2333] hover:bg-[#1a2235] transition">
              Manage Accounts
            </button>

          </div>
        </div>

        {/* Module Control */}
        <div className="xl:col-span-4 bg-[#121826] p-8 rounded-xl border border-[#1c2333] shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Module Control</h2>

          <div className="space-y-4">

            <button className="w-full py-3 rounded-xl bg-[#0f1522] border border-[#1c2333] hover:bg-[#1a2235] transition">
              Create New Module
            </button>

            <button className="w-full py-3 rounded-xl bg-[#0f1522] border border-[#1c2333] hover:bg-[#1a2235] transition">
              Edit Existing Modules
            </button>

            <button className="w-full py-3 rounded-xl bg-[#0f1522] border border-[#1c2333] hover:bg-[#1a2235] transition">
              Assign Lecturers
            </button>

          </div>
        </div>

        {/* System Analytics */}
        <div className="xl:col-span-4 bg-[#121826] p-8 rounded-xl border border-[#1c2333] shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">System Analytics</h2>

          <div className="bg-[#0f1522] h-[250px] rounded-lg border border-[#1c2333] flex items-center justify-center text-gray-500">
            System Usage Graph Placeholder
          </div>
        </div>

      </div>

      {/* Tables Section */}
      <div className="mt-16 grid grid-cols-1 xl:grid-cols-2 gap-10">

        {/* Lecturer List */}
        <div className="bg-[#121826] p-8 rounded-xl border border-[#1c2333] shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Lecturers</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-400 border-b border-[#1c2333]">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Modules</th>
                </tr>
              </thead>

              <tbody className="text-gray-300">

                <tr className="border-b border-[#1c2333]">
                  <td className="py-3">Dr. Sarah Malik</td>
                  <td>s.malik@cyhi.edu</td>
                  <td>Digital Forensics</td>
                </tr>

                <tr className="border-b border-[#1c2333]">
                  <td className="py-3">James Carter</td>
                  <td>j.carter@cyhi.edu</td>
                  <td>SOC Analyst</td>
                </tr>

                <tr className="border-b border-[#1c2333]">
                  <td className="py-3">Emily Zhang</td>
                  <td>e.zhang@cyhi.edu</td>
                  <td>Incident Response</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

        {/* Student List */}
        <div className="bg-[#121826] p-8 rounded-xl border border-[#1c2333] shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Students</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-400 border-b border-[#1c2333]">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Progress</th>
                </tr>
              </thead>

              <tbody className="text-gray-300">

                <tr className="border-b border-[#1c2333]">
                  <td className="py-3">Aisha Khan</td>
                  <td>a.khan@cyhi.edu</td>
                  <td className="text-cyan-400">82%</td>
                </tr>

                <tr className="border-b border-[#1c2333]">
                  <td className="py-3">Liam Patel</td>
                  <td>l.patel@cyhi.edu</td>
                  <td className="text-blue-400">74%</td>
                </tr>

                <tr className="border-b border-[#1c2333]">
                  <td className="py-3">Emily Chen</td>
                  <td>e.chen@cyhi.edu</td>
                  <td className="text-green-400">91%</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
