export default function WelcomeBanner({ username }: { username: string }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <h1
        style={{
          fontSize: "2.2rem",
          fontWeight: 700,
          marginBottom: "0.25rem",
        }}
      >
        Welcome back, {username} 👋
      </h1>

      <p style={{ color: "#9ca3af", fontSize: "0.95rem" }}>
        Continue your cybersecurity journey and level up your skills.
      </p>
    </div>
  );
}
