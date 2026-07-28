"use client";

import { useState } from "react";

export default function InstitutionSettingsPage() {
  const [institutionName, setInstitutionName] = useState("CY-HI Academy");
  const [brandingColor, setBrandingColor] = useState("#06b6d4");
  const [theme, setTheme] = useState("system");

  const [xpScale, setXpScale] = useState(1.0);
  const [difficultyPreset, setDifficultyPreset] = useState("balanced");

  const [modules, setModules] = useState([
    { name: "Digital Forensics Basics", enabled: true },
    { name: "Windows Artefacts", enabled: true },
    { name: "Network Forensics", enabled: false },
    { name: "Incident Response", enabled: false },
  ]);

  const toggleModule = (index: number) => {
    const updated = [...modules];
    updated[index].enabled = !updated[index].enabled;
    setModules(updated);
  };

  const saveInstitution = () => alert("Institution settings saved.");
  const saveModules = () => alert("Modules updated.");
  const saveDefaults = () => alert("Global defaults saved.");

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-10">

      <h1 className="text-4xl font-bold mb-2">Institution Settings</h1>
      <p className="text-[var(--text-muted)] mb-10">
        Manage branding, modules, defaults, and permissions
      </p>

      <div className="space-y-10">

        {/* INSTITUTION BRANDING */}
        <div className="bg-[var(--bg-card)] p-8 rounded-xl border border-[var(--border)] shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Branding</h2>

          <div className="space-y-6">

            {/* Institution Name */}
            <div>
              <label className="block mb-2 text-[var(--text-muted)]">Institution Name</label>
              <input
                type="text"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                className="w-full p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--text)] focus:ring-2 focus:ring-[var(--accent)]"
              />
            </div>

            {/* Branding Color */}
            <div>
              <label className="block mb-2 text-[var(--text-muted)]">Brand Accent Color</label>
              <input
                type="color"
                value={brandingColor}
                onChange={(e) => setBrandingColor(e.target.value)}
                className="w-20 h-12 rounded-xl border border-[var(--border)] cursor-pointer"
              />
            </div>

            {/* Theme Mode */}
            <div>
              <label className="block mb-2 text-[var(--text-muted)]">Default Theme</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--text)] focus:ring-2 focus:ring-[var(--accent)]"
              >
                <option value="system">System Default</option>
                <option value="dark">Dark Mode</option>
                <option value="light">Light Mode</option>
              </select>
            </div>

            <button onClick={saveInstitution} className="button-primary w-full mt-4">
              Save Branding Settings
            </button>

          </div>
        </div>

        {/* MODULE MANAGEMENT */}
        <div className="bg-[var(--bg-card)] p-8 rounded-xl border border-[var(--border)] shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Modules</h2>

          <div className="space-y-4">
            {modules.map((m, i) => (
              <label key={i} className="flex items-center justify-between p-4 bg-[var(--bg-subtle)] rounded-xl border border-[var(--border)]">
                <span>{m.name}</span>
                <input
                  type="checkbox"
                  checked={m.enabled}
                  onChange={() => toggleModule(i)}
                  className="w-5 h-5 accent-[var(--accent)]"
                />
              </label>
            ))}

            <button onClick={saveModules} className="button-secondary w-full mt-6">
              Save Module Settings
            </button>
          </div>
        </div>

        {/* GLOBAL DEFAULTS */}
        <div className="bg-[var(--bg-card)] p-8 rounded-xl border border-[var(--border)] shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Global Defaults</h2>

          <div className="space-y-6">

            {/* XP Scaling */}
            <div>
              <label className="block mb-2 text-[var(--text-muted)]">XP Scaling</label>
              <input
                type="number"
                step="0.1"
                value={xpScale}
                onChange={(e) => setXpScale(parseFloat(e.target.value))}
                className="w-full p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--text)] focus:ring-2 focus:ring-[var(--accent)]"
              />
              <p className="text-[var(--text-muted)] mt-2 text-sm">
                Example: 1.0 = normal XP, 1.5 = 50% more XP
              </p>
            </div>

            {/* Difficulty Preset */}
            <div>
              <label className="block mb-2 text-[var(--text-muted)]">Mission Difficulty Preset</label>
              <select
                value={difficultyPreset}
                onChange={(e) => setDifficultyPreset(e.target.value)}
                className="w-full p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] text-[var(--text)] focus:ring-2 focus:ring-[var(--accent)]"
              >
                <option value="easy">Easy (Beginner‑friendly)</option>
                <option value="balanced">Balanced (Recommended)</option>
                <option value="hard">Hard (Advanced students)</option>
              </select>
            </div>

            <button onClick={saveDefaults} className="button-primary w-full mt-4">
              Save Global Defaults
            </button>

          </div>
        </div>

        {/* PERMISSIONS (UI ONLY) */}
        <div className="bg-[var(--bg-card)] p-8 rounded-xl border border-[var(--border)] shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Roles & Permissions</h2>

          <p className="text-[var(--text-muted)] mb-6">
            (This is a UI placeholder — backend role logic can be added later.)
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="mission-card">
              <p className="mission-title mb-2">Student</p>
              <ul className="text-[var(--text-muted)] space-y-1 text-sm">
                <li>• View missions</li>
                <li>• Submit work</li>
                <li>• View analytics</li>
              </ul>
            </div>

            <div className="mission-card">
              <p className="mission-title mb-2">Lecturer</p>
              <ul className="text-[var(--text-muted)] space-y-1 text-sm">
                <li>• Create missions</li>
                <li>• Grade submissions</li>
                <li>• Manage classes</li>
              </ul>
            </div>

            <div className="mission-card">
              <p className="mission-title mb-2">Admin</p>
              <ul className="text-[var(--text-muted)] space-y-1 text-sm">
                <li>• Manage users</li>
                <li>• Configure institution</li>
                <li>• Control modules</li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
