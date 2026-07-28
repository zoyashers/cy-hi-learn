"use client";

import { useEffect, useRef } from "react";

export default function Reveal({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current.classList.add("visible");
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(ref.current);
  }, []);

  return (
    <div ref={ref} className="section-card">
      {children}
    </div>
  );
}
