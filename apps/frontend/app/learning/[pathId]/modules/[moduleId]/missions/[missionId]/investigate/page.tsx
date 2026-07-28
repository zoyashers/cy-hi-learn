"use client";

import { useEffect, useState } from "react";

export default function Investigate({ params }) {
  const { missionId } = params;

  const [evidence, setEvidence] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/missions/${missionId}/evidence`, {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    })
      .then((res) => res.json())
      .then(setEvidence);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/missions/${missionId}/tasks`, {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    })
      .then((res) => res.json())
      .then(setTasks);
  }, [missionId]);

  async function submitTask() {
    if (!selectedTask) return;

    const token = localStorage.getItem("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/missions/${missionId}/tasks/${selectedTask.id}/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ answer }),
      }
    );

    const data = await res.json();
    alert(data.correct ? "Correct!" : "Incorrect");
  }

  function finishMission() {
    window.location.href = `../${missionId}/complete`;
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white p-8 grid grid-cols-3 gap-6">
      {/* Evidence List */}
      <div className="bg-[#111827] rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-3">Evidence</h2>
        {evidence.map((ev) => (
          <button
            key={ev.id}
            onClick={() => setSelectedEvidence(ev)}
            className="block w-full text-left px-3 py-2 rounded-lg hover:bg-[#1f2937]"
          >
            {ev.title}
          </button>
        ))}
      </div>

      {/* Evidence Viewer */}
      <div className="bg-[#111827] rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-3">Viewer</h2>
        {selectedEvidence ? (
          <pre className="bg-[#020617] p-3 rounded-lg h-[70vh] overflow-auto whitespace-pre-wrap">
            {selectedEvidence.content}
          </pre>
        ) : (
          <p className="text-gray-400">Select evidence to view.</p>
        )}
      </div>

      {/* Tasks */}
      <div className="bg-[#111827] rounded-xl p-4 flex flex-col">
        <h2 className="text-lg font-semibold mb-3">Tasks</h2>

        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => setSelectedTask(task)}
            className="block w-full text-left px-3 py-2 rounded-lg hover:bg-[#1f2937]"
          >
            {task.question}
          </button>
        ))}

        {selectedTask && (
          <div className="mt-4">
            <textarea
              className="w-full h-28 bg-[#020617] rounded-lg p-2 text-sm"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />

            <div className="flex gap-2 mt-3">
              <button
                onClick={submitTask}
                className="px-4 py-2 bg-purple-600 rounded-lg"
              >
                Submit Task
              </button>

              <button
                onClick={finishMission}
                className="px-4 py-2 bg-green-600 rounded-lg"
              >
                Finish Mission
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
