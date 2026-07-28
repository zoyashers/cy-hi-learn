"use client";

import { apiPost } from "@/lib/api";
import { useState } from "react";

const TAGS = ["unclassified", "malicious", "benign", "suspicious", "needs_review"];

export default function EvidenceViewer({
  evidence,
  caseId,
}: {
  evidence: any[];
  caseId: string;
}) {
  const [items, setItems] = useState(evidence);

  const updateTag = async (evidenceId: number, tag: string) => {
    await apiPost(`/analyst/cases/${caseId}/evidence/${evidenceId}/tag`, { tag });
    setItems((prev: any[]) =>
      prev.map((ev) => (ev.id === evidenceId ? { ...ev, tag } : ev))
    );
  };

  return (
    <div className="space-y-4">
      {items.map((ev) => (
        <div key={ev.id} className="bg-white p-4 rounded shadow space-y-2">
          <div className="flex items-center justify-between">
            <p className="font-semibold">{ev.filename}</p>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={ev.tag || "unclassified"}
              onChange={(e) => updateTag(ev.id, e.target.value)}
            >
              {TAGS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {ev.type?.startsWith("image") && <img src={ev.url} className="mt-2 rounded" />}
          {ev.type === "application/pdf" && <iframe src={ev.url} className="w-full h-96 mt-2" />}
          {ev.type?.startsWith("text") && (
            <pre className="bg-gray-900 text-green-400 p-3 rounded mt-2 overflow-x-auto">
              {ev.content}
            </pre>
          )}
        </div>
      ))}
    </div>
  );
}
