export async function sendEmail(to: string, subject: string, text: string): Promise<boolean> {
  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.SENDER_EMAIL || "onboarding@resend.dev";

  if (!resendKey) {
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: `Aarya Prajapat Portfolio <${fromEmail}>`,
        to: [to],
        subject,
        text,
      }),
    });
    
    return res.ok;
  } catch (error) {
    console.error("Error sending email via Resend:", error);
    return false;
  }
}
