import { defineConfig } from 'astro/config';
import { writeFile } from 'node:fs/promises';

const site = process.env.SITE_URL ? new URL(process.env.SITE_URL).origin : undefined;

export default defineConfig({
  site,
  publicDir: './static',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  integrations: [{
    name: 'search-files',
    hooks: {
      'astro:build:done': async ({ dir, pages }) => {
        let robots = 'User-agent: *\nAllow: /\n';
        if (site) {
          const links = pages.filter(({ pathname }) => !/^\/?404\b/.test(pathname))
            .map(({ pathname }) => '<url><loc>' + new URL(pathname, site).href + '</loc></url>');
          await writeFile(new URL('sitemap.xml', dir), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + links.join('') + '</urlset>');
          robots += 'Sitemap: ' + site + '/sitemap.xml\n';
        }
        await writeFile(new URL('robots.txt', dir), robots);
      },
    },
  }],
});

