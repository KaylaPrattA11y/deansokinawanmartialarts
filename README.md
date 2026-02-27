# Dean's Okinawan Martial Arts & Self Defense
## Development server
Run local development with `npm run dev`.
## Decap server
First, set `local_backend: true` in the `public/admin/config.yml`.

Run the local backend with `npx decap-server`, then access the login page via `http://localhost:4321/admin/`.

**IMPORTANT:** Set `local_backend: false` before pushing to production.
## Netlify
Deploy to netlify with `npm run build` then `netlify deploy --prod`.
## Icon Library
Get icons from https://icon-sets.iconify.design/