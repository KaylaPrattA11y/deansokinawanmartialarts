import type { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  if (event.body === null) {
    return {
      statusCode: 400,
      body: JSON.stringify("Payload required"),
    };
  }

  const { name, email } = JSON.parse(event.body) as {
    name: string;
    email: string;
  };

  if (!email) {
    return {
      statusCode: 200,
      body: JSON.stringify("No email provided, skipping email send"),
    };
  }

  await fetch(`${process.env.URL}/.netlify/functions/emails/message-received`, {
    headers: {
      "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET as string,
    },
    method: "POST",
    body: JSON.stringify({
      from: "noreply@deansokinawanmartialarts.com",
      to: email,
      subject: "We received your message",
      parameters: {
        name: name
      },
    }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify("'Message received' email sent!"),
  };
};

export { handler };