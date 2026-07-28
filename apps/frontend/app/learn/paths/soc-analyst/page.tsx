export default function SOCPathPage() {
  return (
    <div style={{ padding: "2rem", color: "#fff" }}>
      <h1>SOC Analyst Path</h1>

      <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <a href="/learn/modules/soc-analyst" style={linkStyle}>Modules</a>
        <a href="/learn/lessons/soc-analyst" style={linkStyle}>Lessons</a>
        <a href="/learn/practice/soc-analyst" style={linkStyle}>Practice</a>
        <a href="/learn/missions/soc-analyst" style={linkStyle}>Missions</a>
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
