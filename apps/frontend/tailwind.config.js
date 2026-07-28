
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0b0f19",
          elevated: "#0f172a",
          card: "#111827",
        },
        border: {
          subtle: "rgba(255,255,255,0.06)",
          strong: "rgba(255,255,255,0.10)",
        },
        brand: {
          primary: "#6366f1",
          primarySoft: "rgba(99,102,241,0.15)",
          cyan: "#38bdf8",
          purple: "#a855f7",
        },
        semantic: {
          success: "#22c55e",
          warning: "#eab308",
          danger: "#ef4444",
        },
        text: {
          primary: "#ffffff",
          secondary: "#9ca3af",
        },
      },
      boxShadow: {
        card: "0 4px 14px rgba(0,0,0,0.35)",
        glow: "0 0 20px rgba(99,102,241,0.4)",
      },
      borderRadius: {
        card: "0.75rem",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
