"use client";

import { useEffect, useState } from "react";

export default function LearningHome() {
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/learning/paths`)
      .then((res) => res.json())
      .then(setPaths);
  }, []);

  return (
    <div className="min-h-screen bg-[#050816] text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Learning Paths</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paths.map((path) => (
          <div
            key={path.id}
            onClick={() => (window.location.href = `/learning/${path.id}`)}
            className="bg-[#111827] p-6 rounded-xl cursor-pointer hover:bg-[#1f2937] transition"
          >
            <h2 className="text-xl font-semibold">{path.title}</h2>
            <p className="text-gray-400 mt-2">{path.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
