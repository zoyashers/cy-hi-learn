"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";

export default function AnomaliesPage() {
  const [anomalies, setAnomalies] = useState([]);

  useEffect(() => {
    apiGet("/admin/anomalies").then((data) => setAnomalies(data.anomalies));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Flagged Anomalies</h2>

      <ul className="space-y-3">
        {anomalies.map((a: any) => (
          <li key={a.id} className="bg-white p-4 shadow rounded-lg">
            <p className="font-semibold">{a.type}</p>
            <p className="text-gray-600">{a.description}</p>
            <p className="text-xs text-gray-400 mt-1">{a.created_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
