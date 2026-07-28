"use client";

import { useState } from "react";
import Image from "next/image";

export default function Tb1FinalAssessment() {
  const [answers, setAnswers] = useState({
    part1: "",
    part2: "",
    part3: "",
    part4: "",
    part5: "",
    part6: "",
    part7: "",
    part8: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [hintShown, setHintShown] = useState(false);

  const handleChange = (key: keyof typeof answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    // Here you would POST to your API for lecturer grading
    // e.g. fetch("/api/submissions/final", { method: "POST", body: JSON.stringify(answers) })
    setSubmitted(true);
  };

  const mission = {
    title: "TB1 Final Assessment: The Multi‑Stage Insider Threat Case",
    xp: 250,
    learningOutcome:
      "Apply TB1 cyber security and digital forensics concepts to a realistic, multi‑stage insider threat scenario.",
  };

  const scenario = `
You are a trainee analyst at CY‑HI Labs. A company, Northbridge Analytics, reports
suspicious activity on an employee workstation belonging to user 'mreeves'.

During triage, the following artifacts were collected:

1) Linux Directory Snapshot
/home/mreeves/
├── Documents/
│   ├── client_data.xlsx
│   ├── notes.txt
│   └── enc_message.txt
├── Downloads/
│   ├── updater.bin
│   ├── chrome_history.db
│   └── passwords_hashes.txt
├── .config/
│   └── chrome/
│       ├── Cookies
│       ├── History
│       └── Login Data
└── usb_logs/
    └── usb_events.log

2) Encrypted Message (enc_message.txt)
"Gur synt vf va gur qrpbqr."

3) Hash List (passwords_hashes.txt)
5f4dcc3b5aa765d61d8327deb882cf99
098f6bcd4621d373cade4e832627b4f6

4) Browser History Snippet
2026‑03‑14 09:12:44  https://fileshare‑x.io/upload        (Large upload)
2026‑03‑14 09:14:02  https://temp‑mail.org               (Disposable email)
2026‑03‑14 09:15:33  https://northbridge‑portal.com/login (Failed login)
2026‑03‑14 09:16:10  chrome://history                    (User viewed history)

5) USB Event Log (usb_events.log)
2026‑03‑14 09:10:12 - USB device connected: Kingston_32GB
2026‑03‑14 09:10:13 - Mounted at /media/usb0
2026‑03‑14 09:15:55 - USB device disconnected

6) System Time Change
2026‑03‑14 09:17:02 - System time manually changed by user 'mreeves'
New time set: 2026‑03‑14 08:17:02

7) Suspicious Executable (updater.bin)
SHA‑256: d2c7f8a1b9e4c3f0a1d2b3c4e5f60718293a4b5c6d7e8f90123456789abcdef0
`;

  const hint = `
Answer in full sentences. For each part, explain your reasoning, not just the final answer.
Think: evidence → interpretation → justification.
`;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#020617", color: "#fff" }}>
      {/* SIDEBAR */}
      <aside
        style={{
          width: "260px",
          background: "#020617",
          padding: "2rem 1rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          borderRight: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Image src="/logo.png" alt="CY-HI Logo" width={120} height={120} loading="eager" />
          <h2 style={{ marginTop: "1rem" }}>CY‑HI Learn</h2>
          <p style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "0.25rem" }}>
            TB1 Final Assessment
          </p>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <a href="/learn/dashboard" style={{ color: "#fff" }}>
            Dashboard
          </a>
          <a href="/learn/paths" style={{ color: "#fff" }}>
            Learning Paths
          </a>
          <a href="/learn/modules/digital-forensics" style={{ color: "#fff" }}>
            Back to Digital Forensics
          </a>
        </nav>

        <div
          style={{
            marginTop: "auto",
            fontSize: "0.8rem",
            opacity: 0.7,
          }}
        >
          <p>Summative assessment</p>
          <p>Manual grading by lecturer</p>
          <p>Estimated time: 2–3 hours</p>
          <p>© CY‑HI 2026</p>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: "2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h1>{mission.title}</h1>
        <p style={{ marginTop: "0.5rem", opacity: 0.8 }}>
          This is a summative assessment designed to test your understanding of all TB1 topics.
          Answers will be reviewed and graded by your lecturer.
        </p>

        {/* LEARNING OUTCOME + META */}
        <div
          style={{
            marginTop: "1.5rem",
            background: "#020617",
            padding: "1.25rem 1.5rem",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.15)",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <p style={{ opacity: 0.9 }}>
            <strong>Learning outcome:</strong> {mission.learningOutcome}
          </p>
          <p style={{ opacity: 0.8 }}>
            <strong>Difficulty:</strong> High &nbsp;|&nbsp; <strong>XP:</strong> {mission.xp}
          </p>
          <p style={{ opacity: 0.8 }}>
            <strong>Important:</strong> Use your own words. Explain your reasoning. This assessment
            is designed to evaluate your thinking, not just final answers.
          </p>
        </div>

        {/* SCENARIO */}
        <div
          style={{
            marginTop: "1.5rem",
            background: "#020617",
            padding: "1.5rem",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <h2>Case Scenario</h2>
          <p
            style={{
              marginTop: "0.75rem",
              whiteSpace: "pre-wrap",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
              fontSize: "0.9rem",
              lineHeight: 1.5,
              opacity: 0.9,
            }}
          >
            {scenario}
          </p>
        </div>

        {/* HINT */}
        <button
          onClick={() => setHintShown(true)}
          style={{
            marginTop: "1rem",
            padding: "0.6rem 1rem",
            background: "#4f46e5",
            borderRadius: "8px",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
        >
          Show Assessment Guidance
        </button>
        {hintShown && (
          <p style={{ marginTop: "0.5rem", opacity: 0.75, fontSize: "0.9rem", maxWidth: "800px" }}>
            {hint}
          </p>
        )}

        {/* PARTS */}
        <Section
          title="Part 1 — Evidence Identification (≈ 6–10 sentences)"
          description="Identify six key artifacts from the scenario. For each, explain what it is, why it is forensically relevant, and what it could reveal."
          value={answers.part1}
          onChange={(v) => handleChange("part1", v)}
        />

        <Section
          title="Part 2 — Cryptography Analysis (≈ 5–8 sentences)"
          description="Decrypt the message in enc_message.txt, identify the cipher used, explain how you decrypted it, and discuss why this cipher is insecure in modern contexts."
          value={answers.part2}
          onChange={(v) => handleChange("part2", v)}
        />

        <Section
          title="Part 3 — Password Hash Analysis (≈ 6–10 sentences)"
          description="For each hash in passwords_hashes.txt, identify the hashing algorithm, determine the plaintext if possible, explain how an attacker could crack it, and describe one mitigation."
          value={answers.part3}
          onChange={(v) => handleChange("part3", v)}
        />

        <Section
          title="Part 4 — Browser Forensics (≈ 6–10 sentences)"
          description="Using the browser history snippet, reconstruct the user’s likely actions, identify suspicious behaviour, and explain how this supports an insider‑threat hypothesis."
          value={answers.part4}
          onChange={(v) => handleChange("part4", v)}
        />

        <Section
          title="Part 5 — USB Activity (≈ 5–8 sentences)"
          description="Explain what the USB activity suggests, how it correlates with other artifacts, and what forensic risks USB devices introduce."
          value={answers.part5}
          onChange={(v) => handleChange("part5", v)}
        />

        <Section
          title="Part 6 — Timeline Reconstruction (≈ 8–12 sentences)"
          description="Using all artifacts, reconstruct a clear, chronological timeline of events. Describe what likely happened step‑by‑step, in your own words."
          value={answers.part6}
          onChange={(v) => handleChange("part6", v)}
        />

        <Section
          title="Part 7 — Professional Judgement (≈ 6–10 sentences)"
          description="Summarise whether this appears to be malicious insider activity, what evidence supports your conclusion, what uncertainties remain, and what you would investigate next."
          value={answers.part7}
          onChange={(v) => handleChange("part7", v)}
        />

        <Section
          title="Part 8 — Reflection (≈ 5–8 sentences)"
          description="Reflect on which TB1 skills you used, what you found most challenging, and what you would improve in future investigations."
          value={answers.part8}
          onChange={(v) => handleChange("part8", v)}
        />

        {/* SUBMIT */}
        <div
          style={{
            marginTop: "2rem",
            background: "#020617",
            padding: "1.5rem",
            borderRadius: "12px",
            border: "1px solid rgba(34,197,94,0.4)",
          }}
        >
          <h3>Submit Assessment</h3>
          <p style={{ marginTop: "0.5rem", opacity: 0.8, fontSize: "0.9rem" }}>
            When you submit, your answers will be locked for this attempt and sent to your lecturer
            for manual grading.
          </p>

          <button
            onClick={handleSubmit}
            style={{
              marginTop: "1rem",
              padding: "0.9rem 1.4rem",
              background: "#22c55e",
              borderRadius: "8px",
              border: "none",
              color: "#020617",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Submit Final Assessment
          </button>

          {submitted && (
            <p style={{ marginTop: "0.75rem", color: "#22c55e", fontWeight: 500 }}>
              Assessment submitted. Your lecturer will review and assign a grade. +{mission.xp} XP
              (pending approval).
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

type SectionProps = {
  title: string;
  description: string;
  value: string;
  onChange: (v: string) => void;
};

function Section({ title, description, value, onChange }: SectionProps) {
  return (
    <section
      style={{
        marginTop: "1.75rem",
        background: "#020617",
        padding: "1.5rem",
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <h2 style={{ fontSize: "1.1rem" }}>{title}</h2>
      <p style={{ marginTop: "0.5rem", opacity: 0.8, fontSize: "0.9rem" }}>{description}</p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your answer here in full sentences. Explain your reasoning, not just the final result."
        style={{
          width: "100%",
          minHeight: "140px",
          marginTop: "1rem",
          padding: "1rem",
          borderRadius: "8px",
          background: "#020617",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.25)",
          fontSize: "0.95rem",
          lineHeight: 1.5,
          resize: "vertical",
        }}
      />
    </section>
  );
}
