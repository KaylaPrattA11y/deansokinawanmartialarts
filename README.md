# Dean's Okinawan Martial Arts & Self Defense

A static website for Dean's Okinawan Karate (Shorin-Ryu Matsumura Seito) dojo in Hollywood, MD. Built with **Astro**, content-managed via **TinaCMS**, and deployed to **Netlify**.

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
- [Linting](#linting)
- [Mobile / Tablet Testing](#mobile--tablet-testing)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Astro](https://astro.build/) (static output) |
| UI | Astro components + [React](https://react.dev/) (islands) |
| CMS | [TinaCMS](https://tina.io/) (self-hosted, AuthJS auth) |
| Styling | SCSS (via `sass-embedded`) |
| Icons | [astro-icon](https://github.com/natemoo-re/astro-icon) + [Iconify](https://icon-sets.iconify.design/) |
| Fonts | `@fontsource-variable` — Cinzel, EB Garamond, Noto Serif JP |
| Hosting | [Netlify](https://www.netlify.com/) (static site + serverless functions) |
| Database | MongoDB (via `mongodb-level`, used by TinaCMS in production) |
| Git Provider | GitHub (TinaCMS reads/writes content to this repo) |

---

## Prerequisites

- **Node.js** >= 18 (LTS recommended)
- **npm** (ships with Node)
- A **MongoDB** instance (only required for production TinaCMS)
- A **GitHub** personal access token (only required for production TinaCMS)

---

## Environment Variables

Create a `.env` file in the project root. The variables below are **only needed for production / cloud CMS mode** — local development works out of the box without them.

```env

NEXT_PUBLIC_TINA_CLIENT_ID=<token>
TINA_SEARCH_TOKEN=<token>
TINA_TOKEN=<token>
GITHUB_BRANCH=<token>

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

---

## Project Structure

```
├── astro.config.mjs          # Astro configuration (integrations, site URL, Vite proxy)
├── eslint.config.ts          # ESLint config (TypeScript, React, Astro, JSX-a11y)
├── netlify.toml              # Netlify build, headers, redirects, functions config
├── package.json
├── tsconfig.json             # Strict Astro TypeScript config w/ React JSX
│
├── content/
│   └── users/index.json      # TinaCMS user accounts (production auth)
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
│   │   ├── Classes.astro     # Class schedule section
│   │   ├── ContactForm.astro
│   │   ├── Faq.astro
│   │   ├── News.astro
│   │   ├── PhotoGallery.astro
│   │   ├── Trial.astro
│   │   ├── articles/         # Blog article components
│   │   ├── cards/            # Card UI components
│   │   └── instructors/      # Instructor profile components
│   ├── config/
│   │   └── site.ts           # Site-wide constants (SEO, schema, routes, classes, breakpoints)
│   ├── content/              # Astro Content Collections
│   │   ├── config.ts         # Collection schemas (blog, gallery, faqs)
│   │   ├── blog/             # News & updates (Markdown)
│   │   ├── faqs/             # FAQ entries (Markdown)
│   │   └── gallery/          # Photo/video gallery items (Markdown)
│   ├── icons/                # Local SVG icons
│   ├── layouts/
│   │   └── Layout.astro      # Base HTML layout
│   ├── pages/                # File-based routing
│   │   ├── index.astro       # Home page
│   │   ├── about/            # About page
│   │   ├── faqs/             # FAQs (paginated)
│   │   ├── gallery/          # Gallery (paginated w/ detail pages)
│   │   ├── instructors/      # Instructors page
│   │   ├── news/             # News listing (paginated w/ detail pages)
│   │   └── submit/           # Form submission handler
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

```bash
npm run dev
```

- Uses `LocalAuthProvider` — no login required.
- Content is read from and written to local markdown files in `src/content/`.
- The GraphQL API runs on `http://localhost:4001` and Vite proxies `/api/tina` requests to it.

### Production Mode

```bash
npm run dev:prod
```

- Uses `UsernamePasswordAuthJSProvider` — requires login (user accounts stored in `content/users/index.json`).
- Content is stored in GitHub (via `tinacms-gitprovider-github`) and indexed in MongoDB (via `mongodb-level`).
- On Netlify, the serverless function at `netlify/functions/tina.ts` handles API requests, redirected from `/api/tina/*`.

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
- **Fields:** `mediaType` (`photo` | `video`), `image`, `vimeoUrl`, `pubDate`, `title`, `caption`
- **Notes:** Supports both uploaded images and Vimeo video embeds

### FAQs (`faqs`)

- **Path:** `src/content/faqs/`
- **Format:** Markdown with YAML frontmatter
- **Fields:** `question` (required), `sortPriority` (optional number for ordering), `body` (rich text)

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

- **Astro components** (`.astro`) are the default — use for static/server-rendered UI.
- **React components** (`.tsx`) are used via Astro's React integration for interactive islands.
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

`astro.config.mjs` sets Astro's `site` value from environment variables in this order:

1. `SITE_URL` (preferred override)
2. Netlify's `URL` (fallback)

Set `SITE_URL` in Netlify's environment settings to force a specific canonical domain (e.g., during a domain migration or to enforce `www` vs apex). If neither variable is set, canonical URLs are omitted.

Site-level SEO metadata and structured data (JSON-LD) are configured in `src/config/site.ts`.

---

## Deployment (Netlify)

The site is configured for Netlify via `netlify.toml`:

- **Build command:** `npm run build` (runs `tinacms build && astro build`)
- **Publish directory:** `dist/`
- **Serverless functions:** `netlify/functions/` (esbuild bundler)
- **Headers:** Long-term caching for `/_astro/*` and `/images/*`
- **Redirects:** `/api/tina/*` → serverless TinaCMS function; `/*` → `/index.html` (SPA fallback)

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

- `NEXT_PUBLIC_TINA_CLIENT_ID`
- `TINA_SEARCH_TOKEN`
- `TINA_TOKEN`
- `GITHUB_BRANCH`

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