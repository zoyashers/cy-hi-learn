import { createContext, useContext, useState } from "react";
import Toast from "./Toast";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  function show(message, type = "success") {
    setToast({ message, type });
  }

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
