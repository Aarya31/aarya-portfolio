import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // 1. Basic Server Side Validation
    if (!name || !name.trim()) {
      return NextResponse.json({ message: "Name is required" }, { status: 400 });
    }

    if (!email || !email.trim()) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email address" }, { status: 400 });
    }

    if (!subject || !subject.trim()) {
      return NextResponse.json({ message: "Subject is required" }, { status: 400 });
    }

    if (!message || !message.trim()) {
      return NextResponse.json({ message: "Message is required" }, { status: 400 });
    }

    if (message.trim().length < 10) {
      return NextResponse.json({ message: "Message must be at least 10 characters long" }, { status: 400 });
    }

    // 2. Database storage simulated logic / Webhook integrations
    // In a live production context, we would trigger an email client (e.g., Nodemailer, Resend)
    // or log message contents to a cloud store.
    console.log(`[API CONTACT SUBMISSION]: From: ${name} <${email}>. Subject: ${subject}. Message: ${message}`);

    return NextResponse.json(
      { message: "Form submission processed successfully" },
      { status: 200 }
    );

  } catch (err: any) {
    console.error("API error in contact route: ", err);
    return NextResponse.json(
      { message: "An internal server error occurred while processing your message." },
      { status: 500 }
    );
  }
}
