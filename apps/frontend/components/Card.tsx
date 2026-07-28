kexport default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="border dark:border-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white dark:bg-gray-900">
      {children}
    </div>
  );
}

