"use client";

import { useState } from "react";

export default function StudentMessagingInbox() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");

  const chats = [
    {
      id: 1,
      name: "Lecturer: Dr. Sarah Malik",
      lastMessage: "Please review the feedback I left on your mission.",
      messages: [
        { sender: "lecturer", text: "Please review the feedback I left on your mission." },
        { sender: "student", text: "Thank you, I will check it now." },
      ],
    },
    {
      id: 2,
      name: "System Notifications",
      lastMessage: "Your mission has been graded.",
      messages: [
        { sender: "system", text: "Your mission has been graded." },
      ],
    },
    {
      id: 3,
      name: "Lecturer: James Carter",
      lastMessage: "Good work on the registry task.",
      messages: [
        { sender: "lecturer", text: "Good work on the registry task." },
      ],
    },
  ];

  const activeChat = chats.find((c) => c.id === selectedChat);

  const sendMessage = () => {
    if (!message.trim()) return;

    activeChat.messages.push({ sender: "student", text: message });
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white grid grid-cols-1 lg:grid-cols-4">

      {/* Sidebar */}
      <div className="bg-[#121826] border-r border-[#1c2333] p-6 space-y-4 lg:col-span-1">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>

        <div className="space-y-3">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`
                p-4 rounded-lg border cursor-pointer transition
                ${selectedChat === chat.id
                  ? "bg-cyan-500/20 border-cyan-400"
                  : "bg-[#0f1522] border-[#1c2333] hover:bg-[#1a2235]"
                }
              `}
            >
              <p className="font-semibold">{chat.name}</p>
              <p className="text-gray-400 text-sm truncate">{chat.lastMessage}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="lg:col-span-3 flex flex-col h-screen p-8">

        {!activeChat && (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to begin.
          </div>
        )}

        {activeChat && (
          <>
            {/* Header */}
            <h1 className="text-2xl font-bold mb-6">{activeChat.name}</h1>

            {/* Messages */}
            <div className="flex-1 bg-[#121826] rounded-xl border border-[#1c2333] p-6 overflow-y-auto space-y-6 shadow-lg">
              {activeChat.messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === "student" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`
                      max-w-[75%] p-4 rounded-xl 
                      ${msg.sender === "student"
                        ? "bg-gradient-to-r from-cyan-400 to-blue-600 text-white"
                        : msg.sender === "lecturer"
                        ? "bg-[#0f1522] border border-[#1c2333] text-gray-300"
                        : "bg-[#1a1f2e] border border-[#2a3248] text-gray-400 italic"
                      }
                    `}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="mt-6 flex items-center space-x-4">
              <input
                type="text"
                placeholder="Type your message…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="
                  flex-1 p-4 rounded-xl bg-[#121826] text-white 
                  border border-[#1c2333] focus:outline-none 
                  focus:ring-2 focus:ring-cyan-400
                "
              />

              <button
                onClick={sendMessage}
                className="
                  px-6 py-4 rounded-xl font-semibold 
                  bg-gradient-to-r from-cyan-400 to-blue-600 
                  hover:opacity-90 transition
                "
              >
                Send
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
