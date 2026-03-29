const RESEND_API_URL = "https://api.resend.com/emails";

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json"
    }
  });

export async function POST(request) {
  try {
    const { name = "", email = "", message = "" } = await request.json();
    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim();
    const cleanMessage = String(message).trim();

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return json({ error: "Name, email, and message are required." }, 400);
    }

    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL || !process.env.RESEND_FROM_EMAIL) {
      return json(
        { error: "Email service is not configured yet. Add the required Vercel environment variables." },
        500
      );
    }

    const resendResponse = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL,
        to: [process.env.CONTACT_TO_EMAIL],
        reply_to: cleanEmail,
        subject: `Portfolio inquiry from ${cleanName}`,
        text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`
      })
    });

    const result = await resendResponse.json().catch(() => ({}));
    if (!resendResponse.ok) {
      return json(
        { error: result?.message || "Email provider rejected the request." },
        502
      );
    }

    return json({ ok: true });
  } catch {
    return json({ error: "Invalid request." }, 400);
  }
}
