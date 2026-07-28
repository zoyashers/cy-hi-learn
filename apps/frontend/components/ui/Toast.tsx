"use client";

import React, { useEffect } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
};

export default function Toast({
  message,
  type = "info",
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    const id = setTimeout(onClose, duration);
    return () => clearTimeout(id);
  }, [onClose, duration]);

  const bg =
    type === "success"
      ? "from-emerald-400 to-emerald-600"
      : type === "error"
      ? "from-rose-400 to-rose-600"
      : "from-cyan-400 to-blue-600";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className={`px-4 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${bg} shadow-lg`}
      >
        {message}
      </div>
    </div>
  );
}
