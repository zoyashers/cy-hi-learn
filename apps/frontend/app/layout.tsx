import "./globals.css";
import ThemeToggle from "../components/ThemeToggle";
import Logo from "../components/logo";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[var(--bg)] text-[var(--text)] min-h-screen">
        <header className="flex items-center justify-between p-6 border-b border-[var(--border)] bg-[var(--bg-card)]">
          <Logo />
          <ThemeToggle />
        </header>

        <main className="p-10">{children}</main>
      </body>
    </html>
  );
}
