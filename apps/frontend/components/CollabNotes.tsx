import { useEffect, useState } from "react";

export default function CollabNotes({ caseId, taskId }) {
  const [socket, setSocket] = useState(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws/collab/${caseId}/${taskId}`);
    setSocket(ws);

    ws.onmessage = (msg) => {
      setNotes(msg.data);
    };

    return () => ws.close();
  }, []);

  function updateNotes(v) {
    setNotes(v);
    socket?.send(v);
  }

  return (
    <textarea
      value={notes}
      onChange={e => updateNotes(e.target.value)}
      className="w-full bg-gray-800 border border-gray-700 rounded-lg p-4 text-gray-100"
      rows={6}
      placeholder="Collaborative notes..."
    />
  );
}
