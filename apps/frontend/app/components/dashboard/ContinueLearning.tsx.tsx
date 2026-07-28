export default function ContinueLearning() {
  return (
    <section className="bg-[#111827] rounded-xl p-6 border border-white/10">
      <h2 className="text-lg font-semibold mb-4">Continue Learning</h2>

      <div className="flex items-center gap-6">
        <img
          src="/mission-placeholder.png"
          className="w-40 h-28 rounded-lg"
        />

        <div className="flex-1">
          <p className="text-sm text-gray-400 mb-1">Digital Forensics</p>
          <h3 className="font-semibold text-lg mb-2">The Stolen Secrets</h3>

          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-3">
            <div className="h-full w-[65%] bg-indigo-500 rounded-full"></div>
          </div>

          <button className="bg-indigo-600 hover:bg-indigo-500 text-sm font-medium px-4 py-2 rounded-md">
            Continue Mission →
          </button>
        </div>
      </div>
    </section>
  );
}
