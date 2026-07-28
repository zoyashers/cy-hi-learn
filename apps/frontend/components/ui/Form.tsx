"use client";

import React from "react";

type FieldProps = {
  label: string;
  children: React.ReactNode;
};

export function FormField({ label, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm text-[var(--text-muted)]">{label}</label>
      {children}
    </div>
  );
}

type FormSectionProps = {
  title: string;
  children: React.ReactNode;
};

export function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="bg-[var(--bg-card)] p-6 rounded-xl border border-[var(--border)] space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  );
}
