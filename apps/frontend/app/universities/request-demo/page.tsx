"use client";

import NavBar from "@/components/NavBar";
import CookieConsent from "@/components/CookieConsent";

export const metadata = {
  title: "CY‑HI for Universities — Request a Demo",
  description:
    "Institution dashboards, lecturer analytics, LMS integration, AI insights, and student progress tracking. Request a demo for your university.",
  openGraph: {
    title: "CY‑HI for Universities",
    description:
      "Institution dashboards, lecturer analytics, LMS integration, and AI insights.",
    url: "https://yourdomain.com/universities/request-demo",
    siteName: "CY‑HI",
    type: "website",
  },
};

export default function UniversityDemoPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <NavBar />
      <CookieConsent />

      <div className="p-10">
        <h1 className="text-4xl font-bold text-center mb-6">
          CY‑HI for Universities
        </h1>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Unlock institution dashboards, lecturer analytics, LMS integration,
          AI‑powered insights, and custom learning paths.
        </p>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-16">
          <UniFeature title="Institution Dashboards" />
          <UniFeature title="Lecturer Analytics" />
          <UniFeature title="Canvas / Moodle Integration" />
          <UniFeature title="AI Learning Insights" />
        </div>

        <div className="text-center">
          <a
            href="mailto:sales@cy-hi.com"
            className="px-8 py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-900"
          >
            Contact Sales
          </a>
        </div>
      </div>
    </div>
  );
}

function UniFeature({ title }: any) {
  return (
    <div className="p-6 bg-gray-100 rounded-xl shadow text-center">
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
  );
}
