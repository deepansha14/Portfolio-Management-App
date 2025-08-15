import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAccessToken, verifyRefreshToken } from "@/lib/auth";
import routes from "@/lib/routes";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  if (
    pathname === routes.home ||
    pathname === routes.login ||
    pathname.startsWith(routes.api.auth.login) ||
    pathname.includes("/_next") ||
    pathname.includes(routes.static)
  ) {
    return NextResponse.next();
  }

  // Check for authentication token
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // If no tokens, redirect to login
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If access token is valid
  if (accessToken) {
    return (async () => {
      const payload = await verifyAccessToken(accessToken);
      if (payload) {
        // Role-based route protection
        if (pathname.startsWith("/admin") && payload.role !== "admin") {
          return NextResponse.redirect(new URL("/", request.url));
        }

        if (pathname.startsWith("/client") && payload.role !== "investor") {
          return NextResponse.redirect(new URL("/", request.url));
        }

        return NextResponse.next();
      }
    })();
  }

  // Try refresh token if access token is missing or invalid
  if (refreshToken) {
    return (async () => {
      const payload = await verifyRefreshToken(refreshToken);
      if (payload) {
        // In a real app, we would issue a new access token here
        // For now, just allow the request to proceed
        // The client would need to get a new access token from the /api/auth/refresh endpoint

        // Role-based route protection
        if (pathname.startsWith("/admin") && payload.role !== "admin") {
          return NextResponse.redirect(new URL("/", request.url));
        }

        if (pathname.startsWith("/client") && payload.role !== "investor") {
          return NextResponse.redirect(new URL("/", request.url));
        }

        return NextResponse.next();
      }
      // If no valid tokens found, redirect to login
      return NextResponse.redirect(new URL("/", request.url));
    })();
  }

  // If no valid tokens found, redirect to login
  return NextResponse.redirect(new URL("/", request.url));
}

// Configure the middleware to match specific paths
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/auth/login, /api/auth/refresh (authentication endpoints)
     * 2. /_next (Next.js internals)
     * 3. /static (static files)
     * 4. /favicon.ico, /robots.txt, etc. (browser files)
     */
    "/((?!api/auth/login|api/auth/refresh|_next|static|favicon.ico|robots.txt).*)",
  ],
};
