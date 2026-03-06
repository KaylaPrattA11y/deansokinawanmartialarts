/**
 * Patches the TinaCMS admin index.html after `tinacms build` to inject
 * a `process` polyfill. TinaCMS bundles Node-only code (e.g. chalk /
 * supports-color) that references `process.stdout`, which crashes in
 * the browser without this shim.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const ADMIN_HTML = 'public/admin/index.html';

const PROCESS_SHIM = `<script>window.process=window.process||{env:{},stdout:{isTTY:false},stderr:{isTTY:false}};</script>`;

try {
  let html = readFileSync(ADMIN_HTML, 'utf-8');

  if (html.includes('window.process')) {
    console.log('[patch-admin] process shim already present, skipping.');
  } else {
    // Inject just before the first <script> tag
    html = html.replace('<script', PROCESS_SHIM + '\n    <script');
    writeFileSync(ADMIN_HTML, html, 'utf-8');
    console.log('[patch-admin] Injected process polyfill into admin/index.html');
  }
} catch (err) {
  console.error('[patch-admin] Could not patch admin HTML:', err.message);
  process.exit(1);
}
