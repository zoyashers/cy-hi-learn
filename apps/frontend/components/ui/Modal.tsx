"use client";

import React from "react";

type ModalProps = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ open, title, children, onClose }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 w-full max-w-lg shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-[var(--text-muted)] hover:text-[var(--text)]"
          >
            ✕
          </button>
        </div>
        <div className="mb-6">{children}</div>
        <div className="flex justify-end">
          <button onClick={onClose} className="button-secondary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
