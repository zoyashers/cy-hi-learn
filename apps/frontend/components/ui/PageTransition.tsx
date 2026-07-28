"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";

type PageTransitionProps = {
  children: React.ReactNode;
};

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={typeof window !== "undefined" ? window.location.pathname : "page"}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
