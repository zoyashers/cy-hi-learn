"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { saveToken } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API =
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      /*
       * FastAPI OAuth2PasswordRequestForm expects
       * application/x-www-form-urlencoded data.
       */
      const formData = new URLSearchParams();

      formData.append("username", username.trim());
      formData.append("password", password);

      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: formData.toString(),
        cache: "no-store",
      });

      const contentType = res.headers.get("content-type") || "";

      let data: any = {};

      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();

        throw new Error(
          text || `Backend returned ${res.status} ${res.statusText}`
        );
      }

      if (!res.ok) {
        let message = "Unable to sign in.";

        if (Array.isArray(data?.detail)) {
          message = data.detail
            .map((item: any) => item?.msg)
            .filter(Boolean)
            .join(", ");
        } else if (typeof data?.detail === "string") {
          message = data.detail;
        } else if (typeof data?.message === "string") {
          message = data.message;
        } else if (typeof data?.error === "string") {
          message = data.error;
        }

        throw new Error(message);
      }

      /*
       * The backend has successfully authenticated the user.
       */
      if (!data?.access_token) {
        throw new Error(
          "Login succeeded, but no authentication token was returned."
        );
      }

      /*
       * Save the token using the existing CY-HI auth helper.
       *
       * Your missions page already looks for:
       * access_token / token / auth_token
       */
      saveToken(data.access_token);

      /*
       * Do NOT call /api/auth/me here.
       *
       * The login endpoint has already successfully authenticated
       * the user and returned a valid access token.
       *
       * Calling another endpoint here was capable of making a
       * successful login appear to fail if that endpoint differed
       * from the authentication implementation.
       */

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080b12] px-6 text-white">

      {/* BACKGROUND */}

      <div className="pointer-events-none absolute inset-0">

        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/[0.07] blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px]" />

      </div>

      <div className="relative w-full max-w-md">

        {/* BRAND */}

        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-3"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">

            <span className="text-sm font-bold text-blue-300">
              CY
            </span>

          </div>

          <div>

            <div className="text-sm font-bold tracking-[0.18em]">
              CY-HI
            </div>

            <div className="text-[10px] uppercase tracking-[0.2em] text-white/30">
              Learn
            </div>

          </div>

        </Link>

        {/* LOGIN CARD */}

        <div className="rounded-2xl border border-white/[0.08] bg-[#0d111b]/90 p-7 shadow-2xl shadow-black/40 backdrop-blur-xl">

          <div className="mb-7">

            <div className="text-2xl font-semibold">
              Welcome back
            </div>

            <p className="mt-2 text-sm text-white/40">
              Continue your cybersecurity learning journey.
            </p>

          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* USERNAME */}

            <div>

              <label
                htmlFor="username"
                className="mb-2 block text-xs font-medium text-white/55"
              >
                Username
              </label>

              <input
                id="username"
                type="text"
                placeholder="cyhitest"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                required
                autoComplete="username"
                autoFocus
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm outline-none transition placeholder:text-white/20 focus:border-blue-400/40 focus:bg-white/[0.05]"
              />

            </div>

            {/* PASSWORD */}

            <div>

              <label
                htmlFor="password"
                className="mb-2 block text-xs font-medium text-white/55"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm outline-none transition placeholder:text-white/20 focus:border-blue-400/40 focus:bg-white/[0.05]"
              />

            </div>

            {/* ERROR */}

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-400/15 bg-red-500/[0.06] px-4 py-3 text-sm text-red-300"
              >
                {error}
              </div>
            )}

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-white py-3.5 text-sm font-semibold text-[#080b12] transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

          </form>

          {/* REGISTER */}

          <div className="mt-7 border-t border-white/[0.06] pt-6 text-center text-xs text-white/30">

            New to CY-HI?{" "}

            <Link
              href="/get-started"
              className="text-blue-300/80 hover:text-blue-200"
            >
              Start learning
            </Link>

          </div>

        </div>

        {/* BACK */}

        <Link
          href="/"
          className="mt-6 block text-center text-xs text-white/25 transition hover:text-white/50"
        >
          ← Back to CY-HI
        </Link>

      </div>

    </main>
  );
}