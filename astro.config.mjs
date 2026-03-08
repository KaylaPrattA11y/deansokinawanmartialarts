// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import icon from 'astro-icon';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: "https://deansokinawanmartialarts.netlify.app",
  integrations: [
    react(), 
    icon(), 
    sitemap({
      filter: page => page !== "https://deansokinawanmartialarts.netlify.app/admin/",
    })
  ],
  output: 'static',
  trailingSlash: 'always',
});