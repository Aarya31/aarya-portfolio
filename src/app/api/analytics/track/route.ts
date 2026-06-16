import { NextResponse } from "next/server";
import { appendRecord } from "@/lib/db";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId, type, payload } = body;

    if (!sessionId) {
      return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
    }

    const headers = request.headers;
    const ip = headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    
    // GDPR-compliant IP hashing for privacy
    const salt = process.env.JWT_SECRET || "aarya-analytics-salt-123456";
    const ipHash = crypto
      .createHash("sha256")
      .update(ip + salt)
      .digest("hex")
      .substring(0, 16);
    
    // Country resolution (Vercel-specific or Localhost fallback)
    let country = headers.get("x-vercel-ip-country") || "";
    if (!country) {
      country = ip === "127.0.0.1" || ip === "::1" || ip.startsWith("::ffff:127.0.0.1") 
        ? "Localhost" 
        : "Unknown";
    }

    const timestamp = new Date().toISOString();

    if (type === "session_start") {
      const session = {
        id: sessionId,
        startTime: timestamp,
        browser: payload.browser || "Unknown",
        os: payload.os || "Unknown",
        device: payload.device || "Unknown",
        referrer: payload.referrer || "Direct",
        country,
        ipHash,
        lastActive: timestamp,
      };
      await appendRecord("sessions.jsonl", session);
    } 
    else if (type === "view") {
      const view = {
        sessionId,
        path: payload.path || "/",
        type: payload.type || "page",
        timestamp,
        duration: payload.duration || 0,
      };
      await appendRecord("views.jsonl", view);
    } 
    else if (type === "heartbeat") {
      const heartbeat = {
        sessionId,
        path: payload.path || "/",
        type: payload.type || "page",
        timestamp,
        duration: payload.duration || 10,
      };
      await appendRecord("views.jsonl", heartbeat);
    } 
    else if (type === "event") {
      const event = {
        sessionId,
        eventType: payload.eventType || "click",
        eventName: payload.eventName || "unknown",
        eventValue: payload.eventValue || "",
        timestamp,
      };
      await appendRecord("events.jsonl", event);
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error in analytics track API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
