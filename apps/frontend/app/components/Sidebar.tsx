"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/learn" },
    { name: "Lessons", href: "/learn/lessons" },
    { name: "Missions", href: "/learn/missions" },
    { name: "Achievements", href: "/learn/achievements" },
    { name: "Profile", href: "/learn/profile" },
    { name: "CY-HI Mentor", href: "/learn/mentor" },
  ];

  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-[#1c2333] bg-[#121826] p-6">
      <Link href="/learn" className="mb-8">
        <h1 className="text-xl font-semibold text-white">
          CY-HI
        </h1>

        <p className="mt-1 text-xs text-slate-500">
          Cyber Human Intelligence
        </p>
      </Link>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/learn" &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative rounded-lg px-4 py-3 transition ${
                active
                  ? "bg-[#1c2333] text-cyan-400 shadow-[0_0_10px_rgba(59,130,246,0.25)]"
                  : "text-gray-300 hover:bg-[#1c2333] hover:text-white"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-gradient-to-b from-cyan-400 to-blue-600" />
              )}

              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}