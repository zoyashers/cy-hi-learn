import { useEffect } from "react";

export default function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed top-6 right-6 px-6 py-3 rounded shadow-lg text-white
      ${type === "success" ? "bg-green-600" : "bg-red-600"}
    `}>
      {message}
    </div>
  );
}
