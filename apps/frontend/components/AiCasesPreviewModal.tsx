import { motion } from "framer-motion";

export default function AICasePreviewModal({ data, onClose, onSave }) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900 border border-gray-700 rounded-lg p-8 w-full max-w-3xl shadow-xl"
      >
        <h2 className="text-3xl font-bold mb-4">{data.title}</h2>
        <p className="text-gray-300 mb-6">{data.description}</p>

        <h3 className="text-xl font-semibold mb-2">Evidence</h3>
        <ul className="mb-6 text-gray-300">
          {data.evidence.map((e, i) => (
            <li key={i}>• {e.filename}: {e.description}</li>
          ))}
        </ul>

        <h3 className="text-xl font-semibold mb-2">Tasks</h3>
        <ul className="mb-6 text-gray-300">
          {data.tasks.map((t, i) => (
            <li key={i}>• {t.title}</li>
          ))}
        </ul>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded text-white"
          >
            Close
          </button>

          <button
            onClick={onSave}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded text-white"
          >
            Save Case
          </button>
        </div>
      </motion.div>
    </div>
  );
}
