// Converts generated originals (and the supplied logo) into responsive WebP files.
// Usage: npm run images:optimize
import { readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { IMAGE_CONFIG } from './config.mjs';
import { IMAGE_TASKS } from './manifest.mjs';

const sourceDir = path.resolve(IMAGE_CONFIG.sourceDir);
const outDir = path.resolve(IMAGE_CONFIG.publicDir);
await mkdir(outDir, { recursive: true });

const files = new Set(await readdir(sourceDir).catch(() => []));
const kb = async (p) => ((await stat(p)).size / 1024).toFixed(0) + ' KB';

for (const task of IMAGE_TASKS) {
  const file = `${task.id}.${IMAGE_CONFIG.outputFormat}`;
  if (!files.has(file)) { console.warn(`[miss] ${file} — run images:generate first`); continue; }
  const src = path.join(sourceDir, file);
  for (const width of IMAGE_CONFIG.variants[task.orientation]) {
    const out = path.join(outDir, `${task.id}-${width}.webp`);
    await sharp(src)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: IMAGE_CONFIG.webpQuality, effort: 6, smartSubsample: true })
      .toFile(out);
    console.log(`[webp] ${path.basename(out)}  ${await kb(out)}`);
  }
}

// Logo: trim the white border of the supplied artwork, keep a small safe margin so it
// is never clipped, and export a sharp 2x/3x-ready WebP.
const logo = path.resolve('public/website-logo.jpeg');
const logoOut = path.join(outDir, 'techinfra-logo-hd.webp');
await sharp(logo)
  .trim({ threshold: 18 })
  .extend({ top: 8, bottom: 8, left: 8, right: 8, background: '#ffffff' })
  .resize({ width: 560 })
  .webp({ quality: 90, effort: 6 })
  .toFile(logoOut);
const meta = await sharp(logoOut).metadata();
console.log(`[logo] techinfra-logo-hd.webp ${meta.width}x${meta.height}  ${await kb(logoOut)}`);
