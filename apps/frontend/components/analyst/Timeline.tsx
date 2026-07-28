"use client";

import { format } from "date-fns";

const eventColors: any = {
  assignment: "bg-blue-600",
  status_change: "bg-yellow-500",
  evidence_upload: "bg-green-600",
  findings_submitted: "bg-red-600",
  ai_interaction: "bg-purple-600",
  case_deleted: "bg-gray-700",
  note_added: "bg-indigo-600",
};

const eventIcons: any = {
  assignment: "👤",
  status_change: "🔄",
  evidence_upload: "📁",
  findings_submitted: "📝",
  ai_interaction: "🤖",
  case_deleted: "🗑️",
  note_added: "🗒️",
};

export default function Timeline({ events }: { events: any[] }) {
  return (
    <div className="relative border-l-4 border-gray-300 ml-6 space-y-8">
      {events.map((ev) => (
        <div key={ev.id} className="relative pl-10">
          <div
            className={`absolute -left-6 top-1 w-10 h-10 flex items-center justify-center text-white rounded-full shadow ${
              eventColors[ev.event_type] || "bg-gray-500"
            }`}
          >
            {eventIcons[ev.event_type] || "📌"}
          </div>

          <div className="bg-white p-4 rounded shadow">
            <p className="font-semibold capitalize">
              {ev.event_type.replace("_", " ")}
            </p>
            <p className="text-gray-700 mt-1">{ev.description}</p>
            <p className="text-xs text-gray-500 mt-2">
              {format(new Date(ev.timestamp), "dd MMM yyyy • HH:mm")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
