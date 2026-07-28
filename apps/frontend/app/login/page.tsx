"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ⭐ Load API URL with fallback
  const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  console.log("Loaded API URL:", API);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!API) {
      console.error("❌ NEXT_PUBLIC_API_URL is NOT defined");
      return;
    }

    const url = `${API}/auth/login`;
    console.log("Request URL:", url);
    console.log("Request body:", { email, password });

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Backend error:", res.status, text);
        throw new Error("Login failed");
      }

      const data = await res.json();
      console.log("Login success:", data);

      router.push("/dashboard");

    } catch (err) {
      console.error("[browser] Failed to connect to backend:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
