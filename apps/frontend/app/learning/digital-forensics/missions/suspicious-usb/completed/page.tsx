"use client";

export default function MissionComplete() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white flex flex-col items-center justify-center p-10">

      {/* Title */}
      <h1 className="text-5xl font-extrabold text-cyan-400 mb-4 tracking-wide">
        MISSION COMPLETE
      </h1>

      {/* XP Animation */}
      <div className="mt-4 mb-10 flex flex-col items-center">
        <div className="w-40 h-40 rounded-full border-4 border-cyan-400 flex items-center justify-center animate-pulse">
          <p className="text-4xl font-bold text-cyan-300">+150</p>
        </div>
        <p className="text-xl text-gray-300 mt-3">XP Earned</p>
      </div>

      {/* Badge Earned */}
      <div className="bg-[#121826] p-6 rounded-xl shadow-lg border border-[#1c2333] mb-10 text-center w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-2">Badge Earned</h2>
        <p className="text-cyan-400 text-xl font-bold">USB Investigator</p>
      </div>

      {/* What You Learned */}
      <div className="bg-[#121826] p-8 rounded-xl shadow-lg border border-[#1c2333] mb-10 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">What You Learned</h2>
        <ul className="text-gray-300 space-y-2">
          <li>• How to analyse USB metadata</li>
          <li>• Identifying suspicious file structures</li>
          <li>• Understanding FAT32 forensic artefacts</li>
          <li>• Assessing risk from removable media</li>
        </ul>
      </div>

      {/* Strengths & Areas to Improve */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mb-12">

        <div className="bg-[#121826] p-6 rounded-xl border border-[#1c2333] shadow-lg">
          <h3 className="text-xl font-semibold mb-3">Strengths</h3>
          <ul className="text-gray-300 space-y-2">
            <li>• Strong evidence interpretation</li>
            <li>• Good pattern recognition</li>
            <li>• Accurate risk assessment</li>
          </ul>
        </div>

        <div className="bg-[#121826] p-6 rounded-xl border border-[#1c2333] shadow-lg">
          <h3 className="text-xl font-semibold mb-3">Areas to Improve</h3>
          <ul className="text-gray-300 space-y-2">
            <li>• Deep registry analysis</li>
            <li>• Memory forensics fundamentals</li>
            <li>• Timeline reconstruction</li>
          </ul>
        </div>

      </div>

      {/* Continue Button */}
      <button
        className="
          px-12 py-4 
          bg-gradient-to-r from-cyan-400 to-blue-600 
          text-white text-xl font-semibold 
          rounded-xl shadow-lg 
          hover:opacity-90 
          transition-all duration-300
        "
      >
        CONTINUE LEARNING
      </button>

    </div>
  );
}
