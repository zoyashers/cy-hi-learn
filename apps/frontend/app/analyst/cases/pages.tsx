"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";
import Link from "next/link";

export default function AnalystCases() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    apiGet("/analyst/cases").then((data) => setCases(data.cases));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Assigned Cases</h2>

      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">ID</th>
            <th className="p-3">Title</th>
            <th className="p-3">Status</th>
            <th className="p-3">Open</th>
          </tr>
        </thead>

        <tbody>
          {cases.map((c: any) => (
            <tr key={c.id} className="border-b">
              <td className="p-3">{c.id}</td>
              <td className="p-3">{c.title}</td>
              <td className="p-3">{c.status}</td>
              <td className="p-3">
                <Link
                  href={`/analyst/cases/${c.id}`}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
