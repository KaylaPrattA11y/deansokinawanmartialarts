/**
 * Patches the TinaCMS admin bundle after `tinacms build`.
 *
 * next-auth/react ships pre-compiled JSX that uses React 19's element
 * symbol ("react.transitional.element"). React 18's reconciler only
 * recognises "react.element", so it treats those elements as plain
 * objects → React error #31.
 *
 * Fix: swap the symbol string in the generated JS bundle so every
 * element uses the React 18 symbol.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ASSETS_DIR = 'public/admin/assets';

try {
  const files = readdirSync(ASSETS_DIR).filter((f) => f.endsWith('.js'));
  let patched = 0;

  for (const file of files) {
    const filePath = join(ASSETS_DIR, file);
    const src = readFileSync(filePath, 'utf-8');

    if (src.includes('react.transitional.element')) {
      const updated = src.replaceAll(
        'react.transitional.element',
        'react.element',
      );
      writeFileSync(filePath, updated, 'utf-8');
      patched++;
      console.log(`[patch-admin] Patched ${file}: react.transitional.element → react.element`);
    }
  }

  if (patched === 0) {
    console.log('[patch-admin] No files needed patching (no transitional element symbols found)');
  }
} catch (err) {
  console.error('[patch-admin] Patch failed:', err.message);
  process.exit(1);
}
