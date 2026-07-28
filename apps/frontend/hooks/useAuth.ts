"use client";

import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

interface DecodedToken {
  sub: string;
  email: string;
  role: string;
  exp: number;
}

export function useAuth() {
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded: DecodedToken = jwtDecode(token);
      setUser(decoded);
    } catch {
      setUser(null);
    }
  }, []);

  return user;
}
