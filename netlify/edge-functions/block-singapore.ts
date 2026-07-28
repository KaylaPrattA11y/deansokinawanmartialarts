import type { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  const countryCode = context.geo?.country?.code;

  if (countryCode === "SG") {
    return new Response("Access restricted from this location.", {
      status: 403, // or 451 for legal/geo reasons
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  // Allow the request to continue to the origin/static files
  return context.next();
};

export const config = {
  path: "/*", // Apply to all paths; refine as needed (e.g., exclude /robots.txt or assets)
};