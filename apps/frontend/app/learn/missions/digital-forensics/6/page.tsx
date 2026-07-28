"use client";
import { useState } from "react";
import Image from "next/image";

export default function Mission5() {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hintShown, setHintShown] = useState(false);

  const mission = {
    title: "Mission 5: The Compromised Credentials Case",
    story: `
CY‑HI Labs has received a report from a small business claiming that several 
employee accounts were accessed without permission. During the investigation, 
a text file was recovered from the suspect’s workstation containing a list of 
hashed passwords.

Your supervisor wants to know whether these passwords were weak, reused, or 
easily crackable — and whether the attacker could have gained access using 
common password attack methods.

You have been given a simulated hash sample to analyse:

"5f4dcc3b5aa765d61d8327deb882cf99"

Your task is to identify the hash type, determine the plaintext password, and 
explain how an attacker could have cracked it.
    `,
    learningOutcome: "Understand password hashing, weaknesses, and common attack methods.",
    tasks: [
      "Identify the hashing algorithm used for the provided hash.",
      "Determine the plaintext password associated with the hash.",
      "Explain how an attacker could crack this hash using real-world techniques.",
      "Describe one method organisations use to protect passwords from cracking."
    ],
    xp: 80,
    hint: "This hash is extremely common. Think about MD5 and weak default passwords."
  };

  const handleSubmit = () => setSubmitted(true);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0f1f", color: "#fff" }}>
      
      {/* SIDEBAR */}
      <aside style={{
        width: "260px",
        background: "#0a0f1f",
        padding: "2rem 1rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        borderRight: "1px solid rgba(255,255,255,0.1)"
      }}>
        
        <div style={{ textAlign: "center" }}>
          <Image 
            src="/logo.png" 
            alt="CY-HI Logo" 
            width={120} 
            height={120}
            loading="eager"
          />
          <h2 style={{ marginTop: "1rem" }}>CY‑HI Learn</h2>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <a href="/learn/dashboard" style={{ color: "#fff" }}>Dashboard</a>
          <a href="/learn/paths" style={{ color: "#fff" }}>Learning Paths</a>
          <a href="/learn/modules/digital-forensics" style={{ color: "#fff" }}>Back to Modules</a>
        </nav>

        <div style={{ marginTop: "auto", opacity: 0.6 }}>
          <p>© CY‑HI 2026</p>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: "2rem" }}>
        
        <h1>{mission.title}</h1>

        {/* STORY */}
        <div style={{
          marginTop: "1.5rem",
          background: "#111827",
          padding: "1.5rem",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.1)"
        }}>
          <h3>Mission Story</h3>
          <p style={{ opacity: 0.8, marginTop: "0.5rem", whiteSpace: "pre-line" }}>
            {mission.story}
          </p>
        </div>

        {/* LEARNING OUTCOME */}
        <div style={{
          marginTop: "1.5rem",
          background: "#111827",
          padding: "1.5rem",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.1)"
        }}>
          <h3>Learning Outcome</h3>
          <p style={{ opacity: 0.8 }}>{mission.learningOutcome}</p>
        </div>

        {/* TASKS */}
        <div style={{
          marginTop: "1.5rem",
          background: "#111827",
          padding: "1.5rem",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.1)"
        }}>
          <h3>Tasks</h3>
          <ul style={{ marginTop: "0.5rem", opacity: 0.8 }}>
            {mission.tasks.map((task, i) => (
              <li key={i}>{task}</li>
            ))}
          </ul>
        </div>

        {/* HINT */}
        <button
          onClick={() => setHintShown(true)}
          style={{
            marginTop: "1rem",
            padding: "0.7rem 1rem",
            background: "#4f46e5",
            borderRadius: "8px",
            border: "none",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Show Hint
        </button>

        {hintShown && (
          <p style={{ marginTop: "0.5rem", opacity: 0.7 }}>{mission.hint}</p>
        )}

        {/* SUBMISSION */}
        <div style={{
          marginTop: "2rem",
          background: "#111827",
          padding: "1.5rem",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.1)"
        }}>
          <h3>Your Answer</h3>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your password analysis here..."
            style={{
              width: "100%",
              height: "150px",
              marginTop: "1rem",
              padding: "1rem",
              borderRadius: "8px",
              background: "#0f172a",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.2)"
            }}
          />

          <button
            onClick={handleSubmit}
            style={{
              marginTop: "1rem",
              padding: "0.8rem 1.2rem",
              background: "#22c55e",
              borderRadius: "8px",
              border: "none",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            Submit Mission
          </button>

          {submitted && (
            <p style={{ marginTop: "1rem", color: "#22c55e" }}>
              Mission submitted! +{mission.xp} XP earned.
            </p>
          )}
        </div>

      </main>
    </div>
  );
}
