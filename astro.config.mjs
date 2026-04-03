// @ts-check
import { defineConfig } from 'astro/config';

import icon from 'astro-icon';

import sitemap from '@astrojs/sitemap';

import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  site: "https://deansokinawanmartialarts.com",
  integrations: [
    icon(), 
    sitemap({
      filter: page => page !== "https://deansokinawanmartialarts.com/admin/",
    }),
    pagefind()
  ],
  output: 'static',
  trailingSlash: 'always',
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 100
      }
    }
  }
});