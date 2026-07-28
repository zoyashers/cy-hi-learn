import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import { getToken } from "../lib/auth";

export default function ProtectedRoute({ children, role }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      window.location.href = "/login";
      return;
    }

    apiFetch("/api/auth/me")
      .then(res => res.json())
      .then(user => {
        if (!user || !user.role) {
          window.location.href = "/login";
          return;
        }

        if (role && user.role !== role) {
          window.location.href = "/login";
          return;
        }

        setAllowed(true);
      });
  }, []);

  if (!allowed) return <div>Loading...</div>;

  return children;
}
