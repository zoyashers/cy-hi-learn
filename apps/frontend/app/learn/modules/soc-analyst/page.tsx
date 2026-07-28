export default function SOCModulesPage() {
  return (
    <div style={{ padding: "2rem", color: "#fff" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
        SOC Analyst Modules
      </h1>

      <p style={{ opacity: 0.7, marginTop: "0.5rem" }}>
        Select a module to begin learning.
      </p>

      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <a href="/learn/lessons/soc-analyst" style={linkStyle}>
          Lessons
        </a>

        <a href="/learn/practice/soc-analyst" style={linkStyle}>
          Practice
        </a>

        <a href="/learn/missions/soc-analyst" style={linkStyle}>
          Missions
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
