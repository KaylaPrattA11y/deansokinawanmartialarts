import type { Handler } from "@netlify/functions";

interface NetlifySubmissionPayload {
  payload: {
    data: Record<string, string>;
    form_name: string;
  };
}

const handler: Handler = async (event) => {
  if (event.body === null) {
    return { statusCode: 400, body: "Payload required" };
  }

  let payload: NetlifySubmissionPayload;

  try {
    payload = JSON.parse(event.body) as NetlifySubmissionPayload;
  } catch {
    return { statusCode: 400, body: "Invalid JSON payload" };
  }

  const { data, form_name } = payload.payload;

  if (form_name !== "Contact") {
    return { statusCode: 200, body: "Not a contact form submission, skipping" };
  }

  const email = data.email;
  const name = data.name;

  if (!email) {
    return { statusCode: 200, body: "No email provided, skipping email send" };
  }

  if (!process.env.NETLIFY_EMAILS_SECRET) {
    console.error("NETLIFY_EMAILS_SECRET not configured");
    return { statusCode: 500, body: "Email service not configured" };
  }

  // Strip HTML tags from name to prevent injection into the email template
  const safeName = name ? name.replace(/<[^>]*>/g, "").trim() : "";

  const response = await fetch(`${process.env.URL}/.netlify/functions/emails/message-received`, {
    headers: {
      "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET,
    },
    method: "POST",
    body: JSON.stringify({
      from: "noreply@deansokinawanmartialarts.com",
      to: email,
      subject: "We received your message",
      parameters: {
        name: safeName,
      },
    }),
  });

  if (!response.ok) {
    console.error("Email send failed:", response.status, await response.text());
    return { statusCode: 500, body: "Failed to send email" };
  }

  return { statusCode: 200, body: "'Message received' email sent!" };
};

export { handler };
