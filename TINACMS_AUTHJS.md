# TinaCMS Production Fixes — Summary
## Problem
All requests to the Tina Netlify function (`/api/tina/auth/*`) were returning 500 Internal Server Error, making the CMS admin completely unusable on the deployed site.

## Root Causes & Fixes
1. Express 5 incompatibility with `tinacms-authjs`

*The issue:* The project had `express@5.2.1`. In Express 5, `req.query` is a *getter* that returns a new object each time. The `tinacms-authjs` library sets `req.query.nextauth = ["session"]` (etc.) to tell NextAuth which endpoint to handle — but in Express 5, that assignment is immediately lost. NextAuth receives `undefined` and returns a generic 500 on every auth endpoint.
*The fix:* Downgraded to `express@4` where `req.query` is a normal writable object.

2. Express 5 route syntax in the function

*The issue:* The route patterns used `{*splat}` syntax (e.g., `/api/tina/{*splat}`), which is Express 5-only.
The fix: Changed to Express 4 wildcard syntax: `/api/tina/*`.

3. ESM/CJS module format conflict

*The issue:* The root `package.json` has `"type": "module"`, which makes Node treat all `.js` files as ESM. But Netlify Functions' runtime uses require() (CommonJS) to load the function. This caused a `502 "ERR_REQUIRE_ESM"` error.
*The fix:* Created `package.json` with `{ "type": "commonjs" }` to override the root setting, so esbuild outputs CJS that Netlify can load.

Files Changed
| File | Change
| package.json | `express` downgraded from `^5.2.1` to `^4.22.1`, `@types/express` to `^4`
| tina.ts	| Route patterns `{*splat}` > `*`, added error logging
| package.json| New file — `{ "type": "commonjs" }`