"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      style={{
        padding: "0.6rem 1rem",
        background: "#0f172a",
        borderRadius: "8px",
        border: "1px solid rgba(255,255,255,0.2)",
        color: "#fff",
        marginBottom: "1.5rem"
      }}
    >
      ← Back
    </button>
  );
}
