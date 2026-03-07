// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import icon from 'astro-icon';

const site = process.env.SITE_URL ?? process.env.URL;

// https://astro.build/config
export default defineConfig({
  ...(site ? { site } : {}  ),
  integrations: [react(), icon()],
  output: 'static',
  trailingSlash: 'always',
  vite: {
    define: {
      'process.env.TINA_PUBLIC_IS_LOCAL': JSON.stringify(process.env.TINA_PUBLIC_IS_LOCAL ?? 'false'),
      'process.env.TINA_PUBLIC_SITE_URL': JSON.stringify(process.env.TINA_PUBLIC_SITE_URL ?? ''),
    },
    server: {
      proxy: {
        '/api/tina': {
          target: 'http://localhost:4001',
          changeOrigin: true,
        },
      },
    },
  },
});