"use client";

import { useState } from "react";

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! I'm your AI tutor. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    // Clear input
    setInput("");

    // Placeholder AI response (replace with API call)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "I'm thinking about that… soon I'll be connected to real AI.",
        },
      ]);
    }, 600);
  };

  return (
    <div style={container}>
      {/* Floating Button */}
      <button onClick={() => setOpen(!open)} style={chatButton}>
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div style={chatWindow}>
          <div style={header}>AI Tutor</div>

          <div style={messagesBox}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  ...message,
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                  background:
                    msg.sender === "user" ? "#0ea5e9" : "rgba(255,255,255,0.1)",
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div style={inputRow}>
            <input
              style={inputBox}
              placeholder="Ask me anything…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} style={sendButton}>
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------- STYLES ---------------------- */

const container = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  zIndex: 9999,
};

const chatButton = {
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  background: "#0f172a",
  color: "#fff",
  fontSize: "24px",
  border: "none",
  cursor: "pointer",
};

const chatWindow = {
  width: "320px",
  height: "420px",
  background: "#1e293b",
  borderRadius: "12px",
  padding: "0",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 0 20px rgba(0,0,0,0.4)",
};

const header = {
  padding: "1rem",
  background: "#0f172a",
  color: "#fff",
  fontWeight: "bold",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
};

const messagesBox = {
  flex: 1,
  padding: "1rem",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const message = {
  padding: "0.6rem 1rem",
  borderRadius: "8px",
  maxWidth: "80%",
  color: "#fff",
};

const inputRow = {
  display: "flex",
  padding: "0.8rem",
  gap: "0.5rem",
  background: "#0f172a",
  borderBottomLeftRadius: "12px",
  borderBottomRightRadius: "12px",
};

const inputBox = {
  flex: 1,
  padding: "0.6rem",
  borderRadius: "6px",
  border: "none",
  outline: "none",
};

const sendButton = {
  padding: "0.6rem 1rem",
  background: "#0ea5e9",
  border: "none",
  borderRadius: "6px",
  color: "#fff",
  cursor: "pointer",
};
