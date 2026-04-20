# Dean's Okinawan Martial Arts & Self Defense

A static website for Dean's Okinawan Karate (Shorin-Ryu Matsumura Seito) dojo in Hollywood, MD. Built with **Astro v6+**, content-managed via **TinaCMS**, and deployed to **Netlify**.

---

## Astro v6 Upgrade Notes

This project has been upgraded to **Astro v6**. Key changes:

- **Content Collections:**
  - Content config has moved from `src/content/config.ts` to `src/content.config.ts` (root-level file).
  - Uses the new `defineCollection` API and `glob` loader for content collections. See [Astro v6 migration guide](https://docs.astro.build/en/guides/upgrade-to/v6/#removed-legacy-content-collections).
- **Astro Integrations:**
  - All integrations and config are now compatible with Astro v6.
- **TypeScript:**
  - TypeScript config extends `astro/tsconfigs/strict` for v6 compatibility.
- **Other breaking changes:**
  - Legacy content collection APIs and config files are removed.
  - See `src/content.config.ts` for the new content schema setup.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Content Management (TinaCMS)](#content-management-tinacms)
- [Content Collections](#content-collections)
- [Adding Pages & Components](#adding-pages--components)
- [Styling](#styling)
- [Icons](#icons)
- [SEO & Canonical URL](#seo--canonical-url)
- [Deployment (Netlify)](#deployment-netlify)
- [Email Templates (Netlify + Mailgun)](#email-templates-netlify--mailgun)
- [Linting](#linting)
- [Mobile / Tablet Testing](#mobile--tablet-testing)
- [Groupme Bot Notifier](#groupme-bot-notifier)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Astro](https://astro.build/) (static output) |
| UI | Astro components (islands) |
| CMS | [TinaCMS](https://tina.io/) (self-hosted, AuthJS auth) |
| Styling | SCSS (via `sass-embedded`) |
| Icons | [astro-icon](https://github.com/natemoo-re/astro-icon) + [Iconify](https://icon-sets.iconify.design/) |
| Fonts | `@fontsource-variable` — Cinzel, EB Garamond, Noto Serif JP |
| Hosting | [Netlify](https://www.netlify.com/) (static site + serverless functions) |
| Git Provider | GitHub (TinaCMS reads/writes content to this repo) |

---

## Prerequisites

- **Node.js** >= 18 (LTS recommended)
- **npm** (ships with Node)
- A **GitHub** personal access token (only required for production TinaCMS)

---

## Environment Variables

Create a `.env` file in the project root. The variables below are **only needed for production / cloud CMS mode** — local development works out of the box without them.

```env
NEXT_PUBLIC_TINA_CLIENT_ID=<token>
TINA_SEARCH_TOKEN=<token>
TINA_TOKEN=<token>

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (local TinaCMS + Astro)
npm run dev
```

This starts:
- **Astro dev server** on `http://localhost:4321`
- **TinaCMS local GraphQL API** on `http://localhost:4001`
- **TinaCMS admin UI** at `http://localhost:4321/admin/`

Content changes made through the admin UI in local mode are written directly to the markdown files on disk.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server with TinaCMS in **local** mode |
| `npm run build` | Build TinaCMS assets then build the Astro site to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run astro` | Run Astro CLI commands directly (e.g. `npm run astro -- --help`) |
| `npm run clean:content` | Clear Astro's content store cache and re-sync (fixes stale/deleted content showing up in builds) |
| `npx netlify deploy --prod` | Deploys the current build to Netlify |
| `npx netlify build && npx netlify dev` | Builds and runs a local Netlify instance from `http://localhost:8888/.netlify/functions/emails`

---

## Other stuff

Clear cache: `rm -rf .astro node_modules/.vite node_modules/.cache dist && npm run dev`

---

## Project Structure

```
├── astro.config.mjs          # Astro configuration (integrations, site URL, Vite settings)
├── eslint.config.ts          # ESLint config (TypeScript, React, Astro, JSX-a11y)
├── netlify.toml              # Netlify build, headers, redirects, functions config
├── package.json
├── tsconfig.json             # Strict Astro TypeScript config w/ React JSX
├── src/content.config.ts     # Astro v6+ content collections config (NEW in v6)
│
├── public/                   # Static assets (served as-is)
│   ├── admin/                # TinaCMS admin UI build output
│   ├── images/               # Uploaded media (managed by TinaCMS)
│   └── site.webmanifest
│
├── src/
│   ├── assets/uploads/        # Optimized images processed by Astro
│   ├── components/           # Astro & React components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── ...
│   ├── config/
│   │   └── site.ts           # Site-wide constants (SEO, schema, routes, classes, breakpoints)
│   ├── content/              # Markdown content (blog, gallery, faqs, dictionary)
│   ├── icons/                # Local SVG icons
│   ├── layouts/
│   │   └── Layout.astro      # Base HTML layout
│   ├── pages/                # File-based routing
│   ├── scss/
│   │   ├── site.scss         # Main stylesheet entry
│   │   └── _global.scss      # Global styles & variables
│   └── types/
│       └── index.ts          # Shared TypeScript types
│
└── tina/                     # TinaCMS configuration
  ├── config.ts             # Schema definitions for all collections
  └── __generated__/        # Auto-generated TinaCMS types & client (do not edit)
```

---

## Content Management (TinaCMS)

TinaCMS provides a visual editing interface for non-technical users to manage site content.

### Local Mode (default for development)

For `astro-pagefind` features to function, an initial build must be performed.
```bash
npm run build
```

Then for development: 
```bash
npm run dev
```

- Uses `LocalAuthProvider` — no login required.
- Content is read from and written to local markdown files in `src/content/`.
- The GraphQL API runs on `http://localhost:4001` and Vite proxies `/api/tina` requests to it.

### Admin UI

The TinaCMS admin UI is served from `/admin/`. Build output goes to `public/admin/`. The admin UI is generated during `tinacms build`.

---

## Content Collections

Content lives in `src/content/` and is defined by both Astro's content config (`src/content/config.ts`) and TinaCMS schema (`tina/config.ts`).

### News & Updates (`blog`)

- **Path:** `src/content/blog/`
- **Format:** Markdown with YAML frontmatter
- **Fields:** `title` (required), `pubDate` (required), `description`, `author`, `image`, `tags`, `imageGallery`, `body` (rich text)
- **Features:** Rich-text body with block quotes; optional inline photo/video gallery per article

### Photo/Video Gallery (`gallery`)

- **Path:** `src/content/gallery/`
- **Format:** Markdown with YAML frontmatter
- **Fields:** `mediaType` (`photo` | `video`), `image`, `vimeoUrl`, `pubDate`, `title`, `caption`, `credit`
- **Notes:** Supports both uploaded images and Vimeo video embeds

### FAQs (`faqs`)

- **Path:** `src/content/faqs/`
- **Format:** Markdown with YAML frontmatter
- **Fields:** `question` (required), `sortPriority` (optional number for ordering), `body` (rich text)

### Dictionary (`dictionary`)

- **Path:** `src/content/dictionary/`
- **Format:** Markdown with YAML frontmatter
- **Fields:** Karate terminology entries with Japanese terms and definitions

---

## Adding Pages & Components

### Pages

Astro uses file-based routing. Add a new `.astro` file under `src/pages/` and it becomes a route:

```
src/pages/contact/index.astro  →  /contact/
```

Dynamic routes use bracket syntax — see `src/pages/news/[slug].astro` and `src/pages/news/[page].astro` for examples of detail pages and pagination.

Trailing slashes are enforced (`trailingSlash: 'always'` in `astro.config.mjs`).

### Components

- **Astro components** (`.astro`) handle all UI — static and server-rendered.
- Shared site constants (routes, class schedules, SEO, breakpoints) live in `src/config/site.ts`.

---

## Styling

The project uses **SCSS** via `sass-embedded`:

- `src/scss/site.scss` — main entry point, imported by the layout.
- `src/scss/_global.scss` — global variables, resets, and base styles.
- Component-scoped styles can be added within `<style>` tags in `.astro` files.

---

## Icons

Icons come from [Iconify](https://icon-sets.iconify.design/) via the `astro-icon` integration. The project primarily uses the **Boxicons** set.

Usage in Astro components:

```astro
---
import { Icon } from 'astro-icon/components';
---
<Icon name="bx:phone" />
```

Local SVG icons can also be placed in `src/icons/`.

---

## SEO & Canonical URL

`astro.config.mjs` sets the `site` value to `https://deansokinawanmartialarts.com`, which Astro uses for canonical URLs, sitemaps, and other absolute URL generation.

Site-level SEO metadata and structured data (JSON-LD) are configured in `src/config/site.ts`.

---

## Deployment (Netlify)

The site is configured for Netlify via `netlify.toml`:

- **Build command:** `npm run build` (runs `tinacms build && astro build`)
- **Publish directory:** `dist/`
- **Headers:** Long-term caching for `/_astro/*` and `/images/*`
- **Redirects:** `/sitemap.xml` → `/sitemap-index.xml`

### Deploy

```bash
# Build locally
npm run build

# Deploy to Netlify (requires Netlify CLI)
netlify deploy --prod
```

Or push to the configured branch and Netlify will build automatically.

### Required Netlify Environment Variables

Set these in the Netlify dashboard under **Site settings > Environment variables**:

- `NEXT_PUBLIC_TINA_CLIENT_ID` — TinaCloud Client ID — identifies the project
- `TINA_TOKEN` — Content API token — authenticates read/write access to your content
- `TINA_SEARCH_TOKEN` — Search indexer token — powers TinaCMS search

---

## Email Templates (Netlify + Mailgun)

The site uses the [Netlify Email Integration](https://docs.netlify.com/extend/install-and-use/setup-guides/email-integration/) with **Mailgun** to send transactional emails (e.g. a confirmation when someone submits the contact form).

### How it works

1. A visitor submits the **Contact Form**.
2. The client-side JS calls the Netlify Function at `/.netlify/functions/messageReceivedHandler`.
3. That function calls Netlify's built-in email handler at `/.netlify/functions/emails/message-received`, which renders the HTML template with Handlebars parameters and sends it via Mailgun.

### Required environment variables

Set these in **Netlify > Site settings > Environment variables** (scope: Builds + Functions):

| Variable | Description |
|---|---|
| `NETLIFY_EMAILS_PROVIDER` | `mailgun` |
| `NETLIFY_EMAILS_PROVIDER_API_KEY` | API key from Mailgun |
| `NETLIFY_EMAILS_SECRET` | Unique secret to authenticate requests to the email handler |
| `NETLIFY_EMAILS_MAILGUN_DOMAIN` | Your verified Mailgun sending domain |
| `NETLIFY_EMAILS_MAILGUN_HOST_REGION` | `non-eu` or `eu` |

The `@netlify/plugin-emails` plugin is already enabled in `netlify.toml`.

### Template directory structure

Templates live in the `emails/` directory at the project root. Each subdirectory name becomes the template's route.

```
emails/
└── message-received/
    └── index.html       # HTML email template (Handlebars syntax)
```

To add a new template, create a new subdirectory (e.g. `emails/welcome/index.html`). The route will be `/.netlify/functions/emails/welcome`.

### Template syntax

Templates use [Handlebars](https://handlebarsjs.com/) for dynamic content. Variables are passed via the `parameters` object in the function's fetch call.

```html
<h1>Hello {{ name }}!</h1>

{{#if interest}}
  <p>You expressed interest in {{ interest }}.</p>
{{/if}}
```

Use triple braces `{{{ url }}}` for values that contain HTML or special characters (e.g. URLs) to avoid double-escaping.

See [Base Template](https://mjml.io/try-it-live/3bqtlisGs).

### Creating a Netlify Function to send email

Functions live in `netlify/functions/`. Here's the pattern:

```ts
import type { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  const { name, email } = JSON.parse(event.body!) as { name: string; email: string };

  await fetch(`${process.env.URL}/.netlify/functions/emails/your-template`, {
    headers: {
      "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET as string,
    },
    method: "POST",
    body: JSON.stringify({
      from: "noreply@deansokinawanmartialarts.com",
      to: email,
      subject: "Your subject line",
      parameters: { name },
    }),
  });

  return { statusCode: 200, body: JSON.stringify("Email sent") };
};

export { handler };
```

### Previewing templates locally

1. Build the project:
   ```bash
   npx netlify build
   ```
2. Start Netlify Dev:
   ```bash
   npx netlify dev
   ```
3. Open the preview UI at [http://localhost:8888/.netlify/functions/emails](http://localhost:8888/.netlify/functions/emails).
4. Select a template from the list to see a live preview. You can enter parameter values to see how they render.

### Sending a test email

From the preview UI (above):

1. Select the template you want to test.
2. Fill in any template parameters.
3. Click **Send test email**.
4. Enter the `subject`, `to`, and `from` fields.
5. Click **Send** — the email will be sent via your configured Mailgun account.

> **Note:** The preview endpoint is only available locally through `netlify dev` and is not exposed in production.

### Managing templates

- **Edit** — Modify the `index.html` file inside the template's subdirectory. Use inline CSS for styling (email clients don't support `<style>` blocks reliably). MJML (`index.mjml`) is also supported as an alternative to raw HTML.
- **Delete** — Remove the template's subdirectory from `emails/`.
- **Rename** — Rename the subdirectory. Update any function references to match the new route.

---

## Linting

ESLint is configured with plugins for TypeScript, React, Astro, and JSX accessibility:

```bash
npx eslint .
```

The config ignores `dist/`, `.astro/`, `public/`, and `tina/` directories.

---

## Mobile / Tablet Testing

In VS Code, press `F1` and run **View: Toggle Ports**. In the Ports panel, click **Add Port** and enter the dev server port (`4321`) and the TinaCms dev server (`4001`). Use the **Forwarded Address** to access the site from your phone or tablet on the same network.

## Groupme Bot Notifier

Send a test message:

```
curl -X POST https://api.groupme.com/v3/bots/post \
  -H "Content-Type: application/json" \
  -d '{"bot_id": "2d9b7b87d6351a5e70310d22b0", "text": "test message"}'
```