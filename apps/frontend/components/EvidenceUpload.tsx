import { useState } from "react";
import { apiFetch } from "../lib/api";

export default function EvidenceUpload({ caseId, onUploaded }) {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  async function upload() {
    if (!file) return alert("Select a file first");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    formData.append("case_id", caseId);

    const res = await fetch("http://localhost:8000/api/lecturer/evidence/upload", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();
    alert(json.message);
    onUploaded();
  }

  return (
    <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow max-w-xl">
      <input
        type="file"
        onChange={e => setFile(e.target.files[0])}
        className="mb-4 text-gray-300"
      />

      <textarea
        placeholder="Evidence description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={3}
        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 mb-4"
      />

      <button
        onClick={upload}
        className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-white"
      >
        Upload Evidence
      </button>
    </div>
  );
}
