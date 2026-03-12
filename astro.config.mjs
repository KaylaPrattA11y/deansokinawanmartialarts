// @ts-check
import { defineConfig } from 'astro/config';

import icon from 'astro-icon';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: "https://deansokinawanmartialarts.netlify.app",
  integrations: [
    icon(), 
    sitemap({
      filter: page => page !== "https://deansokinawanmartialarts.netlify.app/admin/",
    })
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