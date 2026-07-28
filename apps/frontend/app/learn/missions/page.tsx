export default function MissionsOverview() {
  return (
    <div style={{ padding: "2rem", color: "#fff" }}>
      <h1>Your Missions</h1>

      <p style={{ opacity: 0.7 }}>
        Track your progress across all missions.
      </p>

      <div style={{ marginTop: "2rem" }}>
        <h2>Current Path: Digital Forensics</h2>

        <p>Current Mission: Mission 3</p>
        <p>Next Mission: Mission 4</p>

        <a href="/learn/missions/digital-forensics/3" style={btn}>
          Continue Mission
        </a>
      </div>
    </div>
  );
}

const btn = {
  display: "inline-block",
  marginTop: "1rem",
  padding: "1rem",
  background: "#0f172a",
  borderRadius: "8px",
  color: "#fff",
  textDecoration: "none",
};
