"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  function logout() {
    Cookies.remove("token");
    Cookies.remove("role");
    router.push("/login");
  }

  return (
    <nav style={{ padding: 20, background: "#eee" }}>
      <Link href="/dashboard">Dashboard</Link> |{" "}
      <Link href="/cases">Cases</Link> |{" "}
      <Link href="/evidence">Evidence</Link> |{" "}
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
