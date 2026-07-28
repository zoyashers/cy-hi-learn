import { useEffect, useState } from "react";

export default function XPReward({ amount, onDone }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onDone && onDone();
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-20 right-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce z-50">
      +{amount} XP
    </div>
  );
}
