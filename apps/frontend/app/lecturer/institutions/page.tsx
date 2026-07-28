"use client";

import { useEffect, useState } from "react";

export default function InstitutionsPage() {
  const [tenants, setTenants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL;

    fetch(`${base}/lecturer/tenants`, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        setTenants(data.tenants || []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-8 text-white">Loading institutions…</div>;
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white p-8 space-y-6">
      <button
        onClick={() => history.back()}
        className="text-sm text-gray-300 hover:text-white"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold">Institutions</h1>
      <p className="text-gray-400 max-w-xl">
        Tenants (universities) available for your lecturer account.
      </p>

      <div className="bg-[#111827] p-6 rounded-xl space-y-3">
        {tenants.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between border-b border-gray-800 pb-3 last:border-b-0"
          >
            <div>
              <p className="font-semibold">{t.name}</p>
              <p className="text-xs text-gray-400">Tenant ID: {t.id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
