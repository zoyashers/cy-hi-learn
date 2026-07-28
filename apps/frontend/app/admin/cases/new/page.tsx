"use client";

import { useState } from "react";
import { apiPost } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function NewCasePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [answerKey, setAnswerKey] = useState("");
  const router = useRouter();

  const create = async () => {
    await apiPost("/admin/cases", {
      title,
      description,
      answer_key: answerKey || null,
    });
    router.push("/admin/cases");
  };

  return (
    <div className="max-w-2xl bg-white p-6 rounded shadow space-y-4">
      <h2 className="text-2xl font-bold mb-2">Create New Case</h2>

      <input
        className="w-full border p-2 rounded"
        placeholder="Case title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full border p-2 rounded h-32"
        placeholder="Case description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <textarea
        className="w-full border p-2 rounded h-32 text-sm"
        placeholder="Answer key (keywords for scoring)"
        value={answerKey}
        onChange={(e) => setAnswerKey(e.target.value)}
      />

      <button
        onClick={create}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Create Case
      </button>
    </div>
  );
}
