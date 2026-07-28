export default function LearningPathsPage() {
  return (
    <div style={{ padding: "2rem", color: "#fff" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Learning Paths</h1>
      <p style={{ opacity: 0.7 }}>Choose a path to begin.</p>

      <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <a href="/learn/paths/digital-forensics" style={linkStyle}>
          Digital Forensics Path
        </a>

        <a href="/learn/paths/soc-analyst" style={linkStyle}>
          SOC Analyst Path
        </a>
      </div>
    </div>
  );
}

const linkStyle = {
  padding: "1rem",
  background: "#0f172a",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff",
  textDecoration: "none",
};
