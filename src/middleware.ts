import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore root, _next, static assets, favicon
  if (
    pathname === "/" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/images")
  ) {
    return NextResponse.next();
  }

  const firstSegment = pathname.split("/")[1];

  if (/^[a-z]{2}(-[A-Z]{2})?$/.test(firstSegment)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/"; // redirect to root
    return NextResponse.redirect(redirectUrl); // default 307
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
