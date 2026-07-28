"use client";

import { useEffect, useState } from "react";
import { apiGet, apiPost } from "@/lib/api";
import Link from "next/link";

export default function CasesPage() {
  const [cases, setCases] = useState([]);
  const [users, setUsers] = useState([]);

  const refresh = () => {
    apiGet("/admin/cases").then((data) => setCases(data.cases));
    apiGet("/admin/users").then((data) => setUsers(data.users));
  };

  useEffect(() => {
    refresh();
  }, []);

  const assignAnalyst = async (caseId: number, userId: number) => {
    await apiPost(`/admin/cases/${caseId}/assign`, { user_id: userId });
    refresh();
  };

  const changeStatus = async (caseId: number, status: string) => {
    await apiPost(`/admin/cases/${caseId}/status`, { status });
    refresh();
  };

  const remove = async (caseId: number) => {
    await apiPost(`/admin/cases/${caseId}/delete`);
    refresh();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Case Management</h2>

      <Link
        href="/admin/cases/new"
        className="inline-block mb-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        + New Case
      </Link>

      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">ID</th>
            <th className="p-3">Title</th>
            <th className="p-3">Status</th>
            <th className="p-3">Assigned To
            </th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {cases.map((c: any) => (
            <tr key={c.id} className="border-b">
              <td className="p-3">{c.id}</td>
              <td className="p-3">{c.title}</td>
              <td className="p-3">{c.status}</td>

              <td className="p-3">
                <select
                  className="border p-1 rounded"
                  value={c.assigned_to || ""}
                  onChange={(e) =>
                    assignAnalyst(c.id, Number(e.target.value))
                  }
                >
                  <option value="">Unassigned</option>
                  {users
                    .filter((u: any) => u.role === "analyst")
                    .map((u: any) => (
                      <option key={u.id} value={u.id}>
                        {u.email}
                      </option>
                    ))}
                </select>
              </td>

              <td className="p-3 space-x-2">
                <select
                  className="border p-1 rounded"
                  onChange={(e) => changeStatus(c.id, e.target.value)}
                >
                  <option value="">Change Status</option>
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>

                <button
                  onClick={() => remove(c.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
