"use client";

import NavBar from "@/components/NavBar";
import CookieConsent from "@/components/CookieConsent";

export const metadata = {
  title: "CY‑HI — Compare Free, Pro, and Premium Plans",
  description:
    "Compare CY‑HI plans: Free, Pro, and Premium. See features, AI mentor access, missions, certificates, and more.",
  openGraph: {
    title: "CY‑HI Plan Comparison",
    description:
      "Compare Free, Pro, and Premium cybersecurity learning plans.",
    url: "https://yourdomain.com/compare",
    siteName: "CY‑HI",
    type: "website",
  },
};

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <NavBar />
      <CookieConsent />

      <div className="p-10">
        <h1 className="text-4xl font-bold text-center mb-10">
          Compare Plans
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 font-semibold">Feature</th>
                <th className="p-4 font-semibold">Free</th>
                <th className="p-4 font-semibold">Pro</th>
                <th className="p-4 font-semibold">Premium</th>
              </tr>
            </thead>

            <tbody>
              {[
                ["Digital Forensics TB1", "✔", "✔", "✔"],
                ["Full DF Pathway", "✖", "✔", "✔"],
                ["SOC Analyst Pathway", "✖", "✔", "✔"],
                ["Unlimited Missions", "✖", "✔", "✔"],
                ["Certificates", "✖", "✔", "✔"],
                ["Portfolio Export", "✖", "✖", "✔"],
                ["CV Builder", "✖", "✖", "✔"],
                ["Interview Prep", "✖", "✖", "✔"],
                ["AI Mentor Usage", "Limited", "More", "Priority"],
              ].map(([feature, free, pro, premium], i) => (
                <tr key={i} className="border-b">
                  <td className="p-4">{feature}</td>
                  <td className="p-4">{free}</td>
                  <td className="p-4">{pro}</td>
                  <td className="p-4">{premium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
