"use client";

import ThemeToggle from "./ThemeToggle";

export default function FloatingThemeToggle() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="p-3 rounded-full shadow-lg bg-white dark:bg-gray-900 border dark:border-gray-700">
        <ThemeToggle />
      </div>
    </div>
  );
}
