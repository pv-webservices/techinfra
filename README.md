# Techinfra corporate website

Static Astro site for Techinfra Integrated Solutions Pvt. Ltd. Business details, navigation, services, sectors, gallery entries and image alt text live in `src/data/site.ts`. The supplied logo and approved design reference stay in `public/`. Deployment assets are served from `static/`.

## Local development

Use Node 24. Run `npm ci`, then `npm run dev`. `npm run check` runs Astro/TypeScript diagnostics. `npm run build` then `npm run preview` serves the generated site.

## Design system

- **Type:** Archivo (display, variable width) and IBM Plex Sans (body). Both are self-hosted via Fontsource. Plex's numerals keep "1" distinct from "I" in phone numbers.
- **Colour, radius, shadow, motion and layout tokens** are defined once at the top of `src/styles/global.css`.
- **Styles:** `global.css` (tokens, base, buttons, header, drawer, WhatsApp button, loader), `components.css` (shared sections), `home.css` (homepage only), `pages.css` (inner pages, form).
- **Scripts:** `src/scripts/site.ts` (scroll reveals, counters, parallax, sliders) and `src/scripts/select.ts` (the themed dropdown). Every effect respects `prefers-reduced-motion`. Without JavaScript the content stays visible.

## Images

Original project images (`static/media/*.webp`, 764 px plus 400 px variants) are still used for cards, sectors and the gallery.

Nine additional images were generated where higher resolution or a new subject was needed: the hero (separate landscape and portrait art, so phones get a sharp, unblurred image), the four service visuals, the team portrait, the CTA background and the contact lobby. Their prompts, purposes and placements are listed in `scripts/images/manifest.mjs`, and the model used for each one is recorded in `assets-src/generated/report.json`.

### Regenerating images (server-side only)

Image generation is a Node script. It never runs in the browser, and the key never reaches the built site.

1. Put `OPENAI_API_KEY=...` in `.env` (git-ignored; see `.env.example`).
2. `npm run images:plan`: shows the model, quality and size chosen for each image, without making API calls.
3. `npm run images:generate`: generates any missing originals into `assets-src/generated/`. Use `-- --only svc-fire --force` to redo one image, and add `--escalate` to retry it on the premium model.
4. `npm run images:optimize`: writes responsive WebP variants into `static/media/` and re-exports the logo.

Models, quality tiers, sizes and WebP settings are configured centrally in `scripts/images/config.mjs` and can be overridden with environment variables. `scripts/images/router.mjs` picks the model automatically:

- **`gpt-image-2.5-flare` is the default.**
- **`gpt-image-2.5-sunburst`** is used for hero assets, reference or edit work, people or product consistency, or scenes that combine several complex traits.

## Enquiries

Phone, email and WhatsApp links use the supplied business details. The contact page's enquiry planner validates the form, then opens WhatsApp or the visitor's email app with the message prefilled. The website stores nothing.

## Publication

Upload the contents of `dist/` to a static host that serves directory index files. Configure missing URLs to serve `404.html` with HTTP status 404. When the production domain is confirmed, supply its HTTPS origin as `SITE_URL` at build time. This adds canonical URLs, absolute social images, breadcrumb structured data and a sitemap. The privacy and terms pages carry a draft notice for company review. Gallery images are representative. Replace them with authorised project photography when it becomes available.
