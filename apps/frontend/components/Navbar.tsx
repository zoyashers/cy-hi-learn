"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-inner">

        <Link href="/" className="logo">
          <Image
            src="/logo.png"
            alt="CY-HI"
            width={40}
            height={40}
          />

          <span>CY-HI</span>
        </Link>

        <div className="desktop-only">
          <div className="nav-links">
            <Link href="#learning">Learn</Link>
            <Link href="#how-it-works">How it works</Link>
            <Link href="#educators">For educators</Link>
            <Link href="#research">Research</Link>
          </div>
        </div>

        <div className="desktop-only nav-actions">
          <Link
            href="/login"
            className="btn btn-secondary"
          >
            Log in
          </Link>

          <Link
            href="/get-started"
            className="btn btn-primary"
          >
            Start learning
          </Link>
        </div>

        <button
          className="mobile-only menu-btn"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? "×" : "☰"}
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          <Link
            href="#learning"
            className="mobile-link"
            onClick={() => setOpen(false)}
          >
            Learn
          </Link>

          <Link
            href="#how-it-works"
            className="mobile-link"
            onClick={() => setOpen(false)}
          >
            How it works
          </Link>

          <Link
            href="#educators"
            className="mobile-link"
            onClick={() => setOpen(false)}
          >
            For educators
          </Link>

          <Link
            href="#research"
            className="mobile-link"
            onClick={() => setOpen(false)}
          >
            Research
          </Link>

          <div className="mobile-actions">
            <Link
              href="/login"
              className="btn btn-secondary block-btn"
            >
              Log in
            </Link>

            <Link
              href="/get-started"
              className="btn btn-primary block-btn"
            >
              Start learning
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}