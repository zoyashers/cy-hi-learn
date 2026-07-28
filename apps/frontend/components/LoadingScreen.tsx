"use client";
import Image from "next/image";

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050816] text-white">
      <Image src="/cyhi-logo.png" alt="CY‑HI" width={64} height={64} className="animate-pulse mb-4" />
      <p className="text-gray-400">Loading CY‑HI...</p>
    </div>
  );
}
