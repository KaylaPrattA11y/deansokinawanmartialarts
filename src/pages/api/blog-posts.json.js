import { getCollection } from "astro:content";

export async function GET() {
  const blogPosts = await getCollection("blog");
  const announcementPosts = await getCollection("announcements");

  return new Response(
    JSON.stringify({
      blog: blogPosts.map(p => ({
        id: p.id.toLowerCase(),
        title: p.data.title,
      })),
      announcements: announcementPosts.map(p => ({
        id: p.id.toLowerCase(),
        className: p.data.className,
        date: p.data.date,
        cancelled: p.data.cancelled,
        message: p.data.message,
      })),
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}