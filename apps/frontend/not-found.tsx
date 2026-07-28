"use client";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col items-center justify-center text-center">
      <Image src="/cyhi-logo.png" alt="CY‑HI" width={80} height={80} className="mb-6" />
      <h1 className="text-4xl font-bold mb-2">404 — Page Not Found</h1>
      <p className="text-gray-400 mb-6">Looks like this page flew too high 🛸</p>
      <Link href="/" className="px-6 py-3 bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700">
        Back to Home
      </Link>
    </div>
  );
}
