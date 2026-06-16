import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateSessionToken, verifySessionToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.ANALYTICS_PASSWORD || "admin123";

    if (password === correctPassword) {
      const token = generateSessionToken();
      const cookieStore = await cookies();
      
      cookieStore.set("analytics_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  } catch (error) {
    console.error("Auth API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("analytics_session")?.value;
    const isAuthenticated = verifySessionToken(token);
    
    return NextResponse.json({ authenticated: isAuthenticated });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
