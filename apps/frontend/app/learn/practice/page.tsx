export default function PracticePage() {
  return (
    <div style={{ padding: "2rem", color: "#fff" }}>
      <h1>Practice</h1>

      <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <a href="/learn/practice/digital-forensics" style={linkStyle}>Digital Forensics Practice</a>
        <a href="/learn/practice/soc-analyst" style={linkStyle}>SOC Analyst Practice</a>
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
