export default function CaseTimeline({ events }) {
  return (
    <div className="border-l-4 border-blue-500 pl-6 space-y-6">
      {events.map((e, i) => (
        <div key={i} className="relative">
          <div className="absolute -left-3 top-1 w-4 h-4 bg-blue-500 rounded-full"></div>

          <p className="text-sm text-gray-400">{e.timestamp}</p>
          <p className="text-lg font-semibold">{e.title}</p>
          <p className="text-gray-300">{e.description}</p>
        </div>
      ))}
    </div>
  );
}
