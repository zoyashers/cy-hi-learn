
"use client";
import Image from "next/image";

export default function WelcomePage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#020617",
      color: "#fff",
      display: "flex",
      flexDirection: "column"
    }}>
      
      {/* MAIN CONTENT */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "2rem"
      }}>
        
        <Image 
          src="/logo.png" 
          alt="CY-HI Logo" 
          width={140} 
          height={140}
          loading="eager"
        />

        <h1 style={{ marginTop: "1.5rem", fontSize: "2.8rem", fontWeight: "bold" }}>
          Welcome to CY‑HI.learn
        </h1>

        <p style={{
          marginTop: "1rem",
          fontSize: "1.2rem",
          opacity: 0.8,
          maxWidth: "600px",
          lineHeight: "1.6"
        }}>
          Learn Cyber. Practice Skills. Fly High with CY‑HI.
        </p>

        <a href="/login" style={{
          marginTop: "2.5rem",
          padding: "1rem 2rem",
          background: "#4f46e5",
          borderRadius: "8px",
          fontSize: "1.1rem",
          color: "#fff"
        }}>
          Continue to Login
        </a>
      </div>

      {/* FOOTER */}
      <footer style={{
        padding: "1rem",
        textAlign: "center",
        opacity: 0.6
      }}>
        © CY‑HI 2026
      </footer>
    </div>
  );
}
