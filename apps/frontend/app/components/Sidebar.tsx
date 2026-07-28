"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Digital Forensics", href: "/learning/digital-forensics" },
    { name: "SOC Analyst", href: "/learning/soc-analyst" },
    { name: "Achievements", href: "/achievements" },
    { name: "Profile", href: "/profile" },
    { name: "CY-HI Mentor", href: "/mentor" },
  ];

  return (
    <div className="w-64 bg-[#121826] border-r border-[#1c2333] p-6 flex flex-col space-y-4">
      <h1 className="text-xl font-semibold text-white mb-4">CY‑HI</h1>

      {navItems.map((item) => {
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`
              relative px-4 py-2 rounded-md transition-all duration-300
              ${active 
                ? "bg-[#1c2333] shadow-[0_0_10px_#3b82f6] text-cyan-400" 
                : "text-gray-300 hover:bg-[#1c2333] hover:text-white"
              }
            `}
          >
            {active && (
              <span className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-r-md animate-pulse"></span>
            )}
            {item.name}
          </Link>
        );
      })}
    </div>
  );
}
