import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
import { getContactMessages, markAsReplied } from "@/lib/contact_db";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    // 1. Verify Authentication
    const cookieStore = await cookies();
    const token = cookieStore.get("analytics_session")?.value;
    if (!verifySessionToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { messageId, replyText } = await request.json();
    if (!messageId || !replyText || !replyText.trim()) {
      return NextResponse.json({ error: "messageId and replyText are required" }, { status: 400 });
    }

    // 2. Fetch messages to get recipient details
    const messages = await getContactMessages();
    const message = messages.find((m) => m.id === messageId);

    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    // 3. Mark as replied in local database
    await markAsReplied(messageId, replyText);

    // 4. Try sending email programmatically (via Resend)
    const emailSubject = `Re: ${message.subject}`;
    const emailBody = `Hi ${message.name},\n\n${replyText}\n\n---\nOriginal Message:\nFrom: ${message.name} <${message.email}>\nSubject: ${message.subject}\n\n${message.message}`;
    
    const sentProgrammatically = await sendEmail(message.email, emailSubject, emailBody);

    // 5. Construct fallback mailto URL
    const mailtoUrl = `mailto:${message.email}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;

    return NextResponse.json({
      success: true,
      method: sentProgrammatically ? "resend" : "mailto",
      mailtoUrl,
    });
  } catch (error: unknown) {
    console.error("Error in reply API route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
