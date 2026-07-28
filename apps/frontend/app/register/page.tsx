"use client";
import { useState } from "react";
import Image from "next/image";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:8001/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Account created successfully");
      window.location.href = "/login";
    } else {
      alert(data.detail || "Registration failed");
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0f1f",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem"
    }}>
      
      <div style={{
        background: "#111827",
        padding: "3rem",
        borderRadius: "12px",
        width: "100%",
        maxWidth: "420px",
        border: "1px solid rgba(255,255,255,0.1)"
      }}>
        
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Image 
            src="/logo.png" 
            alt="CY-HI Logo" 
            width={100} 
            height={100}
            loading="eager"
          />
          <h2 style={{ marginTop: "1rem" }}>Create Your CY‑HI Account</h2>
        </div>

        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: "0.9rem",
              borderRadius: "6px",
              background: "#1f2937",
              color: "#fff",
              border: "none"
            }}
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "0.9rem",
              borderRadius: "6px",
              background: "#1f2937",
              color: "#fff",
              border: "none"
            }}
          />

          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "0.9rem",
              borderRadius: "6px",
              background: "#1f2937",
              color: "#fff",
              border: "none"
            }}
          />

          <button type="submit" style={{
            padding: "0.9rem",
            background: "#4f46e5",
            borderRadius: "6px",
            color: "#fff",
            fontSize: "1rem",
            border: "none"
          }}>
            Create Account
          </button>
        </form>

        <p style={{ marginTop: "1.5rem", textAlign: "center", opacity: 0.7 }}>
          Already have an account? <a href="/login" style={{ color: "#4f46e5" }}>Login</a>
        </p>
      </div>
    </div>
  );
}
