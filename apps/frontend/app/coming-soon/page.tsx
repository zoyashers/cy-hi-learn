"use client";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "CY‑HI — Coming Soon",
  description: "CY‑HI is launching soon — Cyber learning. Human impact."
};

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col justify-between">
      <NavBar />

      <main className="flex flex-col items-center justify-center flex-grow text-center px-6">
        <Image src="/logo.png" alt="CY‑HI Logo" width={200} height={200} className="mb-8" />
        <h1 className="text-4xl font-bold mb-4">CY‑HI is Launching Soon 🚀</h1>
        <p className="text-gray-400 max-w-md mb-8">
          The next generation of cybersecurity learning is almost here.  
          Follow our journey on LinkedIn and TikTok.
        </p>

        <div className="flex gap-4">
          <a href="https://linkedin.com" className="px-6 py-3 bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700">
            LinkedIn
          </a>
          <a href="https://tiktok.com" className="px-6 py-3 bg-gray-800 rounded-lg font-semibold hover:bg-gray-700">
            TikTok
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
