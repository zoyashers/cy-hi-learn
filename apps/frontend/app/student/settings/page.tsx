"use client";

import { useState } from "react";

export default function StudentSettingsPage() {
  const [email, setEmail] = useState("zoya@student.cyhi.edu");
  const [name, setName] = useState("Zoya");
  const [notifications, setNotifications] = useState({
    missions: true,
    messages: true,
    system: true,
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const updateProfile = () => {
    alert("Profile updated successfully.");
  };

  const updateNotifications = () => {
    alert("Notification settings saved.");
  };

  const updatePassword = () => {
    if (passwords.newPass !== passwords.confirm) {
      alert("New passwords do not match.");
      return;
    }
    alert("Password updated.");
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-10">

      <h1 className="text-4xl font-bold mb-2">Settings</h1>
      <p className="text-[var(--text-muted)] mb-10">
        Manage your account, notifications, and security
      </p>

      <div className="space-y-10">

        {/* ACCOUNT SETTINGS */}
        <div className="bg-[var(--bg-card)] p-8 rounded-xl border border-[var(--border)] shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Account Information</h2>

          <div className="space-y-6">

            {/* Name */}
            <div>
              <label className="block mb-2 text-[var(--text-muted)]">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
                  w-full p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)]
                  text-[var(--text)] focus:ring-2 focus:ring-[var(--accent)]
                "
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-[var(--text-muted)]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)]
                  text-[var(--text)] focus:ring-2 focus:ring-[var(--accent)]
                "
              />
            </div>

            <button
              onClick={updateProfile}
              className="button-primary w-full mt-4"
            >
              Save Changes
            </button>

          </div>
        </div>

        {/* NOTIFICATION SETTINGS */}
        <div className="bg-[var(--bg-card)] p-8 rounded-xl border border-[var(--border)] shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Notifications</h2>

          <div className="space-y-4">

            {/* Missions */}
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={notifications.missions}
                onChange={() =>
                  setNotifications({ ...notifications, missions: !notifications.missions })
                }
                className="w-5 h-5 accent-[var(--accent)]"
              />
              <span>Mission updates</span>
            </label>

            {/* Messages */}
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={notifications.messages}
                onChange={() =>
                  setNotifications({ ...notifications, messages: !notifications.messages })
                }
                className="w-5 h-5 accent-[var(--accent)]"
              />
              <span>Messages from lecturers</span>
            </label>

            {/* System */}
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={notifications.system}
                onChange={() =>
                  setNotifications({ ...notifications, system: !notifications.system })
                }
                className="w-5 h-5 accent-[var(--accent)]"
              />
              <span>System notifications</span>
            </label>

            <button
              onClick={updateNotifications}
              className="button-secondary w-full mt-6"
            >
              Save Notification Settings
            </button>

          </div>
        </div>

        {/* PASSWORD SETTINGS */}
        <div className="bg-[var(--bg-card)] p-8 rounded-xl border border-[var(--border)] shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Security</h2>

          <div className="space-y-6">

            {/* Current Password */}
            <div>
              <label className="block mb-2 text-[var(--text-muted)]">Current Password</label>
              <input
                type="password"
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                className="
                  w-full p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)]
                  text-[var(--text)] focus:ring-2 focus:ring-[var(--accent)]
                "
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block mb-2 text-[var(--text-muted)]">New Password</label>
              <input
                type="password"
                value={passwords.newPass}
                onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                className="
                  w-full p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)]
                  text-[var(--text)] focus:ring-2 focus:ring-[var(--accent)]
                "
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-2 text-[var(--text-muted)]">Confirm New Password</label>
              <input
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                className="
                  w-full p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)]
                  text-[var(--text)] focus:ring-2 focus:ring-[var(--accent)]
                "
              />
            </div>

            <button
              onClick={updatePassword}
              className="button-primary w-full mt-4"
            >
              Update Password
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
