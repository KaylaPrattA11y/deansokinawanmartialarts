# Dean's Okinawan Martial Arts & Self Defense
## Development server
Run local development with `npm run dev`.
## Decap server
First, set `local_backend: true` in the `public/admin/config.yml`.

Run the local backend with `npx decap-server`, then access the login page via `http://localhost:4321/admin/`.

**IMPORTANT:** Set `local_backend: false` before pushing to production.
## Netlify
Deploy to netlify with `npm run build` then `netlify deploy --prod`.

### Canonical URL (SEO + schema)
`astro.config.mjs` sets Astro's `site` value from environment variables in this order:
1. `SITE_URL` (preferred override)
2. Netlify `URL` (fallback)

Set `SITE_URL` in Netlify if you want to force a canonical domain (for example during a domain migration, or to enforce `www` vs apex). If `SITE_URL` is not set, the build will use Netlify's `URL` automatically.
## Icon Library
Get icons from https://icon-sets.iconify.design/. We typically use the Boxicons for this theme.
## Port Forwarding for Phone Testing
VSCODE: Press `F1`, find `View: Toggle Ports`. Then in the Ports panel, "Add Port" and enter the port number. Use the Forwarded Address on your mobile device.