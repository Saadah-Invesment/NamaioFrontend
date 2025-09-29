import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

const PUBLIC_ROUTES = ["/login", "/register", "/"];

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const role = req.cookies.get("role")?.value;
    const { pathname } = req.nextUrl;
    console.log("rolw",role)
    // If no token and trying to access protected routes
    if (!token && !PUBLIC_ROUTES.includes(pathname)) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (token) {
        try {
            const decoded: any = jwtDecode(token);

            // If already logged in and trying to access public routes
            if (PUBLIC_ROUTES.includes(pathname) && role) {
                if (role === "admin") return NextResponse.redirect(new URL("/admin/dashboard", req.url));
                if (role === "affiliate") return NextResponse.redirect(new URL("/affiliate/dashboard", req.url));
                if (role === "user") return NextResponse.redirect(new URL("/user/dashboard", req.url));
            }

            // Role-based protection
            if (pathname.startsWith("/admin") && role !== "admin") {
                return NextResponse.redirect(new URL("/", req.url));
            }
            if (pathname.startsWith("/affiliate") && role !== "affiliate") {
                return NextResponse.redirect(new URL("/", req.url));
            }
            if (pathname.startsWith("/user") && role !== "user") {
                return NextResponse.redirect(new URL("/", req.url));
            }
        } catch (error) {
            console.error("Invalid token:", error);
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/login",
        "/register",
        "/admin/:path*",
        "/affiliate/:path*",
        "/user/:path*",
    ],
};
