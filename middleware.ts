import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = req.nextUrl.pathname;

  // ===== Not logged in =====
  if (!user) {
    if (
      pathname.startsWith("/student") ||
      pathname.startsWith("/teacher") ||
      pathname.startsWith("/admin")
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return res;
  }

  const role = user.app_metadata?.role;

  if (!role) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ===== Protected routes =====
  if (
    pathname.startsWith("/student") ||
    pathname.startsWith("/teacher") ||
    pathname.startsWith("/admin")
  ) {
    const prefix = pathname.split("/")[1];

    if (role !== prefix) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // ===== Prevent accessing login/register when logged in =====
  if (pathname === "/login" || pathname === "/register") {
    return NextResponse.redirect(new URL(`/${role}`, req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/student/:path*",
    "/teacher/:path*",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};