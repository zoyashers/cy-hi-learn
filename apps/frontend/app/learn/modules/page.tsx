export default function ModulesPage() {
  return (
    <div style={{ padding: "2rem", color: "#fff" }}>
      <h1>Modules</h1>
      <p>Select your learning path.</p>

      <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <a href="/learn/modules/digital-forensics" style={linkStyle}>Digital Forensics Modules</a>
        <a href="/learn/modules/soc-analyst" style={linkStyle}>SOC Analyst Modules</a>
      </div>
    </div>
  );
}

const linkStyle = {
  padding: "1rem",
  background: "#0f172a",
  borderRadius: "8px",
  color: "#fff",
  textDecoration: "none",
};
