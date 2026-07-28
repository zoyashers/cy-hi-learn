"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useAuth();

  useEffect(() => {
    if (user === null) return; // still loading or no token

    if (user.role !== "admin") {
      router.replace("/"); // redirect to home or login
    }
  }, [user, router]);

  if (!user) {
    return <div className="p-6">Checking permissions…</div>;
  }

  return <>{children}</>;
}
