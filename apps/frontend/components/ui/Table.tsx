"use client";

import React from "react";

type Column<T> = {
  key: keyof T;
  label: string;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

export default function Table<T extends { [key: string]: any }>({
  columns,
  data,
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--bg-card)]">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-[var(--text-muted)] border-b border-[var(--border)]">
            {columns.map((col) => (
              <th key={String(col.key)} className="px-4 py-3 text-sm font-semibold">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-[var(--text)] text-sm">
          {data.map((row, i) => (
            <tr key={i} className="border-b border-[var(--border)] hover:bg-[var(--bg-subtle)]">
              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-3">
                  {String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-6 text-center text-[var(--text-muted)]"
              >
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
