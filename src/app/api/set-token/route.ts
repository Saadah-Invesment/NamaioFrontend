import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token, role } = await req.json();

    if (!token || !role) {
      return NextResponse.json({ error: "Token and role are required" }, { status: 400 });
    }

    const res = NextResponse.json({ success: true });

    // Store token in HTTP-only cookie
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    // Store role in normal cookie (readable by JS if needed)
    res.cookies.set("role", role, {
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return res;
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 500 });
  }
}
