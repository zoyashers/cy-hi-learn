"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-inner">

        {/* Logo */}
        <Link href="/" className="logo">
          <Image src="/logo.png" alt="CY‑HI Logo" width={40} height={40} />
          <span>CY‑HI</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="nav-links desktop-only">
          {["Learn", "For Educators", "Platform", "Pricing", "About", "Resources"].map((item) => (
            <li key={item}>
              <Link href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}>
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="desktop-only nav-actions">
          <Link href="/login" className="btn btn-secondary">Log In</Link>
          <Link href="/get-started" className="btn btn-primary">Get Started</Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)} className="mobile-only menu-btn">
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mobile-menu">
          {["Learn", "For Educators", "Platform", "Pricing", "About", "Resources"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="mobile-link"
            >
              {item}
            </Link>
          ))}

          <div className="mobile-actions">
            <Link href="/login" className="btn btn-secondary block-btn">Log In</Link>
            <Link href="/get-started" className="btn btn-primary block-btn">Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
