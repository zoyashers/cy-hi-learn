"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent");
    if (!accepted) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "true");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 bg-gray-900 text-white p-6 rounded-xl shadow-xl border border-gray-700 max-w-xl mx-auto">
      <p className="text-sm mb-4">
        CY‑HI uses cookies to improve your experience, analyse usage, and
        personalise content. By continuing, you accept our{" "}
        <a href="/privacy" className="underline text-indigo-400">
          Privacy Policy
        </a>
        .
      </p>

      <button
        onClick={accept}
        className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 text-sm font-semibold"
      >
        Accept
      </button>
    </div>
  );
}
