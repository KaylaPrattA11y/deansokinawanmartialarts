import type { Handler } from "@netlify/functions";

const GROUPME_BOT_ID = process.env.GROUPME_BOT_ID;
const NETLIFY_TOKEN = process.env.NETLIFY_API_TOKEN;
const SITE_ID = process.env.NETLIFY_SITE_ID;
const SITE_URL = process.env.URL;

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // 1. Fetch current posts for both collections
    const { blog: currentBlog, announcements: currentAnnouncements } =
      await fetchCurrentPosts();

    // 2. Load previously known IDs (stored as { blog: [], announcements: [] })
    let known: { blog: string[]; announcements: string[] } = { blog: [], announcements: [] };
    try {
      known = JSON.parse(process.env.KNOWN_POSTS || "{}");
      known.blog = known.blog || [];
      known.announcements = known.announcements || [];
    } catch {
      console.warn("Could not parse KNOWN_POSTS, starting fresh.");
    }

    // 3. Diff each collection
    const newBlogPosts = currentBlog.filter(
      (post: { id: string }) => !known.blog.includes(post.id)
    );
    const newAnnouncements = currentAnnouncements.filter(
      (post: { id: string }) => !known.announcements.includes(post.id)
    );

    const totalNew = newBlogPosts.length + newAnnouncements.length;

    if (totalNew === 0) {
      console.log("No new posts detected in either collection.");
      await updateKnownPosts({
        blog: currentBlog.map((p: { id: string }) => p.id),
        announcements: currentAnnouncements.map((p: { id: string }) => p.id),
      });
      return { statusCode: 200, body: "No new posts" };
    }

    // 4. Notify GroupMe for each new blog post
    for (const post of newBlogPosts) {
      const url = `${SITE_URL}/news/${post.id}`;
      await postToGroupMe(`[📝 New post] "${post.title}"\n\n${post.description}\n\n🔗 ${url}`);
    }

    // 5. Notify GroupMe for each new announcement
    for (const post of newAnnouncements) {
      const url = `${SITE_URL}/classes/`;
      const status = post.cancelled ? "CANCELLED" : null;
      const message = post.message ? `${post.message}\n\n` : "";
      await postToGroupMe(
        `[📣 Class announcement] "${post.className}"${status ? ` (${status})` : ""}\n\n${message}🔗 ${url}`
      );
    }

    // 6. Save updated known post IDs only (not full objects)
    await updateKnownPosts({
      blog: currentBlog.map((p: { id: string }) => p.id),
      announcements: currentAnnouncements.map((p: { id: string }) => p.id),
    });

    return {
      statusCode: 200,
      body: `Notified: ${newBlogPosts.length} blog post(s), ${newAnnouncements.length} announcement(s)`,
    };
  } catch (err) {
    console.error("Error in blog-notifier:", err);
    return { statusCode: 500, body: "Internal Server Error" };
  }
};

async function fetchCurrentPosts() {
  const res = await fetch(`${SITE_URL}/api/blog-posts.json`);
  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
  return res.json();
}

async function postToGroupMe(text: string) {
  const res = await fetch("https://api.groupme.com/v3/bots/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bot_id: GROUPME_BOT_ID, text }),
  });
  if (!res.ok) throw new Error(`GroupMe API error: ${res.status}`);
  console.log(`Posted to GroupMe: ${text}`);
}

async function updateKnownPosts(data: object) {
  const res = await fetch(
    `https://api.netlify.com/api/v1/sites/${SITE_ID}/env/KNOWN_POSTS`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${NETLIFY_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: JSON.stringify(data) }),
    }
  );
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Failed to update KNOWN_POSTS: ${res.status} ${body}`);
  }
  console.log("Updated KNOWN_POSTS:", JSON.stringify(data));
}