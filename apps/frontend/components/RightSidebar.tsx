"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: "⌂" },
  { label: "Missions", href: "/missions", icon: "◈" },
  { label: "Learning", href: "/learning", icon: "▣" },
  { label: "Cases", href: "/cases", icon: "◉" },
  { label: "Skills", href: "/skills", icon: "◇" },
  { label: "Achievements", href: "/achievements", icon: "★" },
];

export default function RightSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/login");
  };

  return (
    <aside
      className={`student-sidebar ${
        collapsed ? "student-sidebar-collapsed" : ""
      }`}
    >
      {/* BRAND */}

      <div className="sidebar-brand">
        <Link
          href="/dashboard"
          className="sidebar-brand-link"
        >
          <div className="sidebar-logo-mark">
            CY
          </div>

          <div className="sidebar-brand-copy">
            <div className="sidebar-brand-name">
              CY-HI
            </div>

            <div className="sidebar-brand-subtitle">
              LEARN
            </div>
          </div>
        </Link>

        <button
          type="button"
          className="sidebar-collapse-button"
          onClick={() => setCollapsed((value) => !value)}
          aria-label={
            collapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
          title={
            collapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
        >
          {collapsed ? "›" : "‹"}
        </button>
      </div>

      {/* NAVIGATION */}

      <nav className="sidebar-nav">
        <div className="sidebar-section-label">
          WORKSPACE
        </div>

        {navItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-nav-item ${
                active
                  ? "sidebar-nav-item-active"
                  : ""
              }`}
              title={collapsed ? item.label : undefined}
            >
              <span className="sidebar-icon">
                {item.icon}
              </span>

              <span className="sidebar-nav-label">
                {item.label}
              </span>

              {active && (
                <span className="sidebar-active-dot" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* PROGRESS */}

      <div className="sidebar-progress-card">
        <div className="sidebar-progress-header">
          <span>Weekly Progress</span>
          <strong>68%</strong>
        </div>

        <div className="sidebar-progress-track">
          <div
            className="sidebar-progress-fill"
            style={{ width: "68%" }}
          />
        </div>

        <p>
          Keep going — you're building real skills.
        </p>
      </div>

      {/* BOTTOM */}

      <div className="sidebar-bottom">
        <Link
          href="/profile"
          className="sidebar-profile"
          title={collapsed ? "Profile" : undefined}
        >
          <div className="sidebar-avatar">
            TS
          </div>

          <div className="sidebar-profile-info">
            <strong>Test Student</strong>
            <span>Student</span>
          </div>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="sidebar-logout"
          title={collapsed ? "Log out" : undefined}
        >
          <span>↪</span>

          <span className="sidebar-logout-label">
            Log out
          </span>
        </button>
      </div>
    </aside>
  );
}