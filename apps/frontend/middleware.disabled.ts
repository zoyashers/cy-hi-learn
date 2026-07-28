import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwtDecode from "jwt-decode";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  // No token → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded: any = jwtDecode(token);

    // Only admins allowed
    if (decoded.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

