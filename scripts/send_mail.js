const fs = require("fs");
const path = require("path");

// Load .env.local variables manually
const envPath = path.join(__dirname, "..", ".env.local");
const env = {};
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  content.split("\n").forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || "";
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      env[key] = value;
    }
  });
}

const resendKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY;
const fromEmail = env.SENDER_EMAIL || process.env.SENDER_EMAIL || "onboarding@resend.dev"; // Resend default sandbox sender

async function sendMail(to, subject, body) {
  if (!resendKey) {
    console.error("Error: RESEND_API_KEY is not defined in .env.local or process environment.");
    console.log("Please define RESEND_API_KEY to send emails programmatically.");
    console.log("\nAlternative: Use the mailto link displayed in the chat to reply via your local email client.");
    return false;
  }

  console.log(`Sending email to ${to} via Resend...`);

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
        subject: subject,
        text: body,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      console.log(`Email sent successfully! ID: ${data.id}`);
      return true;
    } else {
      console.error("Resend API returned an error:", data);
      return false;
    }
  } catch (error) {
    console.error("Network error sending email:", error);
    return false;
  }
}

// CLI entry point
if (require.main === module) {
  const args = process.argv.slice(2);
  let to = "";
  let subject = "";
  let body = "";

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--to" && args[i + 1]) {
      to = args[i + 1];
      i++;
    } else if (args[i] === "--subject" && args[i + 1]) {
      subject = args[i + 1];
      i++;
    } else if (args[i] === "--body" && args[i + 1]) {
      body = args[i + 1];
      i++;
    }
  }

  if (!to || !subject || !body) {
    console.log("Usage: node scripts/send_mail.js --to <email> --subject <subject> --body <body>");
    process.exit(1);
  }

  sendMail(to, subject, body).then((success) => {
    process.exit(success ? 0 : 1);
  });
}

module.exports = { sendMail };
