"use client";

import NavBar from "@/components/NavBar";
import CookieConsent from "@/components/CookieConsent";

export const metadata = {
  title: "CY‑HI Demo — Preview the Cybersecurity Learning Platform",
  description:
    "Preview CY‑HI’s dashboard, missions, analytics, and AI mentor before creating an account.",
  openGraph: {
    title: "CY‑HI Demo Preview",
    description:
      "Explore CY‑HI’s dashboard, missions, analytics, and AI mentor.",
    url: "https://yourdomain.com/preview",
    siteName: "CY‑HI",
    type: "website",
  },
};

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <NavBar />
      <CookieConsent />

      <div className="p-10">
        <h1 className="text-4xl font-bold text-center mb-10">
          CY‑HI Demo Preview
        </h1>

        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">
          Explore what CY‑HI looks like before creating an account.
        </p>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <DemoCard title="Dashboard" />
          <DemoCard title="Missions" />
          <DemoCard title="Analytics" />
          <DemoCard title="AI Mentor" />
        </div>

        <div className="text-center mt-12">
          <a
            href="/register"
            className="px-6 py-3 bg-indigo-600 rounded-lg font-semibold hover:bg-indigo-700"
          >
            Start Free
          </a>
        </div>
      </div>
    </div>
  );
}

function DemoCard({ title }: any) {
  return (
    <div className="bg-[#111827] p-6 rounded-xl text-center">
      <div className="h-40 bg-gray-700 rounded mb-4" />
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
  );
}
