"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";

export default function ReportPage({ params }: { params: { id: string } }) {
  const [report, setReport] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiGet(`/analyst/cases/${params.id}/report`)
      .then((data) => setReport(data))
      .catch(() => setError("No report found. Generate one from the case page."));
  }, [params.id]);

  if (error) return <div className="text-red-600">{error}</div>;
  if (!report) return <div>Loading report…</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-3xl font-bold mb-2">Incident Report</h2>
      <p className="text-sm text-gray-500">
        Created at: {new Date(report.created_at).toLocaleString()}
      </p>
      <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed">
        {report.content}
      </pre>
    </div>
  );
}
