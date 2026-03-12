import globals from "globals";
import tseslint from "typescript-eslint";
import pluginAstro from "eslint-plugin-astro";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Global ignore patterns so ESLint doesn't lint build output or Astro internals
  {
    ignores: ["dist/**", ".astro/**", "public/**", "tina/**"],
  },
  // TypeScript configs
  ...tseslint.configs.recommended,
  // General JS/TS files
  {
    files: [
      "src/**/*.{js,mjs,cjs,ts,mts,cts}",
      "*.{js,mjs,cjs,ts,mts,cts}",
    ],
    languageOptions: { globals: globals.browser },
  },
  // Astro files - use Astro-specific linting
  ...pluginAstro.configs.recommended,
  ...pluginAstro.configs["jsx-a11y-recommended"],
]);
