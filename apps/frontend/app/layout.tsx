import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CY-HI Learn — Cyber Human Intelligence",
  description:
    "A practical cybersecurity learning environment built around investigation, evidence, reasoning and human behaviour.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}