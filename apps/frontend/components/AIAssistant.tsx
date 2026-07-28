import { useState } from "react";
import { useToast } from "./ToastProvider";

export default function AIAssistant({ caseId, onGenerated }) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function generate() {
    setLoading(true);

    const res = await fetch("http://localhost:8000/api/lecturer/ai/generate-tasks", {
      method: "POST",
      body: JSON.stringify({ case_id: caseId }),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();
    setLoading(false);

    if (json.tasks) {
      toast.show("AI generated tasks!", "success");
      onGenerated(json.tasks);
    } else {
      toast.show("AI failed to generate tasks", "error");
    }
  }

  return (
    <button
      onClick={generate}
      disabled={loading}
      className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded text-white"
    >
      {loading ? "Generating..." : "AI Generate Tasks"}
    </button>
  );
}
