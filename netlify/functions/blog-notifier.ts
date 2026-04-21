import type { Handler } from "@netlify/functions";
import type { AnnouncementPost, BlogPost } from "../../src/types";

const GROUPME_BOT_ID = process.env.GROUPME_BOT_ID;
const NETLIFY_TOKEN = process.env.NETLIFY_API_TOKEN;
const SITE_URL = process.env.URL;

/**
 * Netlify Function Handler
 * Main entry point for the Netlify serverless function. Handles POST requests,
 * checks for new blog posts and announcements, notifies GroupMe, and updates the KNOWN_POSTS env variable in Netlify.
 */
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
      (post: BlogPost) => !known.blog.map(id => id.toLowerCase()).includes(post.id.toLowerCase())
    );
    const newAnnouncements = currentAnnouncements.filter(
      (post: AnnouncementPost) => !known.announcements.map(id => id.toLowerCase()).includes(post.id.toLowerCase())
    );

    const totalNew = newBlogPosts.length + newAnnouncements.length;

    if (totalNew === 0) {
      console.log("No new posts detected in either collection.");
      return { statusCode: 200, body: "No new posts" };
    }

    // 4. Notify GroupMe for each new blog post
    for (const post of newBlogPosts) {
      const url = `${SITE_URL}/news/${post.id}`;
      // Example message format:
      // [📝 New Post] "My New Blog Post" 🔗 https://deansokinawanmartialarts.com/news/123
      await postToGroupMe(`[📝 New Post] "${post.title}" 🔗 ${url}`);
    }

    // 5. Notify GroupMe for each new announcement
    for (const post of newAnnouncements) {
      const url = `${SITE_URL}/classes/`;
      const status = post.cancelled ? " (CANCELLED)" : "";
      const message = post.message ? `${post.message}\n\n` : "";
      const date = post.date
        ? new Date(post.date).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })
        : "";
      // Example message format:
      // [📣 Class Announcement] Youth Karate on Wed, Sep 15 (CANCELLED)
      // Class cancelled due to inclement weather! 🔗 https://deansokinawanmartialarts.com/classes/
      await postToGroupMe(
        `[📣 Class Announcement] ${post.className} on ${date}${status}\n${message}🔗 ${url}`
      );
    }

    // 6. Save updated known post IDs only (not full objects)
    await updateKnownPosts({
      blog: currentBlog.map((p: BlogPost) => p.id.toLowerCase()),
      announcements: currentAnnouncements.map((p: AnnouncementPost) => p.id.toLowerCase()),
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

/**
 * Fetches the current blog posts and announcements from the site API.
 */
async function fetchCurrentPosts(): Promise<{ blog: BlogPost[]; announcements: AnnouncementPost[] }> {
  const res = await fetch(`${SITE_URL}/api/blog-posts.json`);
  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
  return res.json();
}

/**
 * Sends a message to the configured GroupMe bot.
 * @param {string} text - The message to send to GroupMe.
 * @throws If the GroupMe API returns an error status.
 */
async function postToGroupMe(text: string) {
  const res = await fetch("https://api.groupme.com/v3/bots/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bot_id: GROUPME_BOT_ID, text }),
  });
  if (!res.ok) throw new Error(`GroupMe API error: ${res.status}`);
  console.log(`Posted to GroupMe: ${text}`);
}

/**
 * Updates the KNOWN_POSTS environment variable on Netlify via the API.
 * Stores the latest known blog and announcement IDs to prevent duplicate notifications.
 * @param {object} data - The new known posts data to store.
 * @throws If the Netlify API returns an error status.
 */
async function updateKnownPosts(data: object) {
  const ACCOUNT_ID = process.env.NETLIFY_ACCOUNT_ID;
  const value = JSON.stringify(data);

  const res = await fetch(
    `https://api.netlify.com/api/v1/accounts/${ACCOUNT_ID}/env/KNOWN_POSTS`,
    {
      method: "PUT",  // PUT replaces all values, safer than PATCH here
      headers: {
        Authorization: `Bearer ${NETLIFY_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: "KNOWN_POSTS",
        values: [{ value, context: "all" }],
      }),
    }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Failed to update KNOWN_POSTS: ${res.status} ${body}`);
  }
  console.log("Updated KNOWN_POSTS:", value);
}