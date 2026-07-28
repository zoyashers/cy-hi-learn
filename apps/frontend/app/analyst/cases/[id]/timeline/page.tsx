"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";
import Timeline from "@/components/analyst/Timeline";

export default function CaseTimeline({
  params,
}: {
  params: { id: string };
}) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    apiGet(`/analyst/cases/${params.id}/timeline`).then((data) =>
      setEvents(data.events)
    );
  }, [params.id]);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Case Timeline</h2>
      <Timeline events={events} />
    </div>
  );
}
