"use client";

import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <span className="text-[var(--accent)] font-bold text-2xl">CY‑HI</span>
      <span className="text-[var(--text-muted)] text-sm">Platform</span>
    </Link>
  );
}
