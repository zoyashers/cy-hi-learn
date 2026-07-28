"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Users", href: "/admin/users" },
  { name: "Cases", href: "/admin/cases" },
  { name: "Logs", href: "/admin/logs" },
  { name: "Anomalies", href: "/admin/anomalies" },
  { name: "Analytics", href: "/admin/analytics" },
  { name: "Live Logs", href: "/admin/live-logs" },

];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <h1 className="text-xl font-bold mb-6">Admin Dashboard</h1>

      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-3 py-2 rounded-md ${
              pathname === link.href
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
