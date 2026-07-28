"use client";

export default function LecturerContentPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-white p-8 space-y-6">
      <h1 className="text-3xl font-bold">Content Management</h1>
      <p className="text-gray-400 text-sm max-w-xl">
        Upload PPTs, map them to learning paths, and attach them to missions or modules.
      </p>

      <div className="bg-[#111827] p-6 rounded-xl text-sm text-gray-300">
        <p className="mb-3">Content tools will plug in here.</p>
        <p>
          We’ll add:
          <br />• PPT upload
          <br />• Mapping to modules/missions
          <br />• Preview and versioning
        </p>
      </div>
    </div>
  );
}
