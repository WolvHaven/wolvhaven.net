import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import embeds from 'astro-embed/integration';

import tailwindcss from '@tailwindcss/vite'

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://wolvhaven.net',
  integrations: [embeds(), mdx(), sitemap(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});