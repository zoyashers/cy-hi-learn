export default function LessonsPage() {
  return (
    <div style={{ padding: "2rem", color: "#fff" }}>
      <h1>Lessons</h1>

      <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <a href="/learn/lessons/digital-forensics" style={linkStyle}>Digital Forensics Lessons</a>
        <a href="/learn/lessons/soc-analyst" style={linkStyle}>SOC Analyst Lessons</a>
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
