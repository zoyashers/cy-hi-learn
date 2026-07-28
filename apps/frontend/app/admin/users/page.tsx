"use client";

import { useState } from "react";

export default function UserManagementConsole() {
  const [search, setSearch] = useState("");

  const users = [
    { name: "Aisha Khan", email: "a.khan@cyhi.edu", role: "Student" },
    { name: "James Carter", email: "j.carter@cyhi.edu", role: "Lecturer" },
    { name: "Emily Chen", email: "e.chen@cyhi.edu", role: "Student" },
    { name: "Dr. Sarah Malik", email: "s.malik@cyhi.edu", role: "Lecturer" },
  ];

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-10">

      <h1 className="text-4xl font-bold mb-2">User Management</h1>
      <p className="text-gray-400 mb-10">Manage all users across the institution</p>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search users…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 rounded-xl bg-[#121826] border border-[#1c2333] text-white focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      {/* Actions */}
      <div className="flex space-x-4 mb-10">
        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 font-semibold">
          + Add User
        </button>
        <button className="px-6 py-3 rounded-xl bg-[#121826] border border-[#1c2333]">
          Manage Roles
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#121826] p-8 rounded-xl border border-[#1c2333] shadow-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-400 border-b border-[#1c2333]">
              <th className="pb-3">Name</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Role</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-300">
            {filtered.map((u, i) => (
              <tr key={i} className="border-b border-[#1c2333]">
                <td className="py-3">{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button className="text-cyan-400 hover:underline mr-4">Edit</button>
                  <button className="text-red-400 hover:underline">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
