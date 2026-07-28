"use client";

import { useEffect, useState } from "react";
import { apiGet, apiPost } from "@/lib/api";
import EvidenceViewer from "@/components/analyst/EvidenceViewer";
import AIHelper from "@/components/analyst/AIHelper";
import CaseNotes from "@/components/analyst/CaseNotes";
import Link from "next/link";

export default function CaseView({ params }: { params: { id: string } }) {
  const [caseData, setCaseData] = useState<any>(null);
  const [findings, setFindings] = useState("");
  const [scoreResult, setScoreResult] = useState<any>(null);

  useEffect(() => {
    apiGet(`/analyst/cases/${params.id}`).then((data) => setCaseData(data));
  }, [params.id]);

  const submitFindings = async () => {
    const res = await apiPost(`/analyst/cases/${params.id}/submit`, {
      case_id: Number(params.id),
      findings,
    });
    setScoreResult(res);
  };

  const generateReport = async () => {
    const res = await apiPost(`/analyst/cases/${params.id}/report`);
    // You can route to a report viewer later
    alert("Report generated in backend (check console).");
    console.log(res.content);
  };

  if (!caseData) return <div>Loading case…</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">{caseData.title}</h2>

	<Link
  	  href={`/analyst/cases/${params.id}/report`}
  	  className="px-4 py-2 bg-slate-700 text-white rounded"
	>
  	  View Report
	</Link>

        <Link
          href={`/analyst/cases/${params.id}/timeline`}
          className="px-4 py-2 bg-purple-600 text-white rounded shadow"
        >
          View Timeline
        </Link>
      </div>

      <p className="text-gray-700">{caseData.description}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-xl font-semibold mt-6 mb-2">Evidence</h3>
            <EvidenceViewer evidence={caseData.evidence} />
          </div>

          <div className="bg-white p-4 rounded shadow space-y-3">
            <h3 className="text-xl font-semibold">Submit Findings</h3>
            <textarea
              className="w-full border rounded p-2 h-32"
              value={findings}
              onChange={(e) => setFindings(e.target.value)}
              placeholder="Write your investigation findings here…"
            />
            <button
              onClick={submitFindings}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Submit & Score
            </button>

            {scoreResult && (
              <div className="mt-3 text-sm text-gray-800">
                <p>
                  <span className="font-semibold">Score:</span>{" "}
                  {scoreResult.score}%
                </p>
                <p>{scoreResult.feedback}</p>
              </div>
            )}
          </div>

          <button
            onClick={generateReport}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Generate Report
          </button>
        </div>

        <div className="space-y-6">
          <AIHelper caseId={params.id} />
          <CaseNotes caseId={params.id} />
        </div>
      </div>
    </div>
  );
}
