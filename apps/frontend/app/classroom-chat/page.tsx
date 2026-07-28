"use client";

import { useState } from "react";

export default function ClassroomChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "lecturer", text: "Welcome to the class chat." },
    { sender: "student", text: "Thank you!" },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages([...messages, { sender: "student", text: message }]);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white grid grid-cols-1 lg:grid-cols-4">

      {/* Sidebar */}
      <div className="bg-[#121826] border-r border-[#1c2333] p-6 lg:col-span-1">
        <h2 className="text-xl font-semibold mb-4">Classroom Chat</h2>
        <p className="text-gray-400 text-sm">Digital Forensics — Cohort A</p>
      </div>

      {/* Chat */}
      <div className="lg:col-span-3 flex flex-col h-screen p-8">

        <div className="flex-1 bg-[#121826] rounded-xl border border-[#1c2333] p-6 overflow-y-auto space-y-6 shadow-lg">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === "student" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`
                  max-w-[75%] p-4 rounded-xl 
                  ${msg.sender === "student"
                    ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white"
                    : "bg-[#0f1522] border border-[#1c2333] text-gray-300"
                  }
                `}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center space-x-4">
          <input
            type="text"
            placeholder="Type your message…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-4 rounded-xl bg-[#121826] border border-[#1c2333] text-white focus:ring-2 focus:ring-cyan-400"
          />

          <button
            onClick={sendMessage}
            className="px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 font-semibold hover:opacity-90"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

