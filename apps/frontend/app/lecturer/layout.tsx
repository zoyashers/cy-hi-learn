"use client";

import { useEffect, useState } from "react";

export default function LecturerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tenants, setTenants] = useState<any[]>([]);
  const [currentTenant, setCurrentTenant] = useState<any | null>(null);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL;

    async function loadTenants() {
      const res = await fetch(`${base}/lecturer/tenants`, {
        credentials: "include",
      });
      const data = await res.json();
      setTenants(data.tenants || []);
      setCurrentTenant(data.current || null);
    }

    loadTenants();
  }, []);

  async function switchTenant(id: number) {
    const base = process.env.NEXT_PUBLIC_API_URL;

    await fetch(`${base}/lecturer/tenants/switch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ tenant_id: id }),
    });

    const chosen = tenants.find((t) => t.id === id);
    setCurrentTenant(chosen || null);
    window.location.reload();
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {/* Tenant bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-800 bg-[#020617]">
        <div className="text-sm text-gray-300">
          Institution:{" "}
          <span className="font-semibold">
            {currentTenant ? currentTenant.name : "Loading…"}
          </span>
        </div>

        <div className="flex gap-2 text-xs">
          {tenants.map((t) => (
            <button
              key={t.id}
              onClick={() => switchTenant(t.id)}
              className={`px-3 py-1 rounded-lg border ${
                currentTenant && currentTenant.id === t.id
                  ? "bg-[#111827] border-[#1f2937]"
                  : "bg-transparent border-gray-700 hover:bg-[#111827]"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <main>{children}</main>
    </div>
  );
}
