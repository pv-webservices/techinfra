// Server-side (Node) image generation. Usage:
//   npm run images:generate                 → generate any missing images
//   npm run images:generate -- --only svc-fire --force
//   npm run images:generate -- --only svc-fire --force --escalate   (retry on Sunburst)
//   npm run images:generate -- --dry        → show routing decisions, no API calls
import { mkdir, writeFile, readFile, access } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { IMAGE_CONFIG } from './config.mjs';
import { IMAGE_TASKS } from './manifest.mjs';
import { route } from './router.mjs';

if (existsSync('.env')) process.loadEnvFile('.env');

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const only = args.includes('--only') ? args[args.indexOf('--only') + 1]?.split(',') : null;
const dry = flag('dry');

const apiKey = process.env.OPENAI_API_KEY;
if (!dry && !apiKey) {
  console.error('OPENAI_API_KEY is not set. Add it to the environment or a local .env file.');
  process.exit(1);
}

const sourceDir = path.resolve(IMAGE_CONFIG.sourceDir);
const reportPath = path.join(sourceDir, 'report.json');
await mkdir(sourceDir, { recursive: true });
const report = existsSync(reportPath) ? JSON.parse(await readFile(reportPath, 'utf8')) : {};

const exists = (p) => access(p).then(() => true, () => false);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function callApi(body) {
  for (let attempt = 0; ; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), IMAGE_CONFIG.timeoutMs);
    try {
      const res = await fetch(IMAGE_CONFIG.endpoint, {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        const message = json?.error?.message || res.statusText;
        // Retry only transient failures.
        if ((res.status === 429 || res.status >= 500) && attempt < IMAGE_CONFIG.retries) {
          await sleep(4000 * (attempt + 1));
          continue;
        }
        throw new Error(`API ${res.status}: ${message}`);
      }
      const b64 = json?.data?.[0]?.b64_json;
      if (!b64) throw new Error('API response contained no image data');
      return Buffer.from(b64, 'base64');
    } catch (err) {
      if (err.name === 'AbortError' && attempt < IMAGE_CONFIG.retries) continue;
      throw err;
    } finally {
      clearTimeout(timer);
    }
  }
}

async function run(task) {
  const decision = route({ ...task, escalate: task.escalate || flag('escalate') });
  const out = path.join(sourceDir, `${task.id}.${IMAGE_CONFIG.outputFormat}`);
  const label = `${task.id.padEnd(20)} ${decision.tier.padEnd(8)} ${decision.quality.padEnd(6)} ${decision.size}  (${decision.reason})`;

  if (dry) return console.log('[plan] ' + label);
  if (!flag('force') && (await exists(out))) return console.log('[skip] ' + label + ' — already generated');

  console.log('[gen ] ' + label);
  const started = Date.now();
  const image = await callApi({
    model: decision.model,
    prompt: task.prompt,
    size: decision.size,
    quality: decision.quality,
    output_format: IMAGE_CONFIG.outputFormat,
    n: 1,
  });
  await writeFile(out, image);
  report[task.id] = {
    model: decision.model, quality: decision.quality, size: decision.size, reason: decision.reason,
    purpose: task.purpose, placement: task.placement, generatedAt: new Date().toISOString(),
  };
  console.log(`[done] ${task.id} in ${((Date.now() - started) / 1000).toFixed(1)}s`);
}

const queue = IMAGE_TASKS.filter((t) => !only || only.includes(t.id));
const failures = [];
async function worker() {
  while (queue.length) {
    const task = queue.shift();
    try { await run(task); } catch (err) { failures.push(task.id); console.error(`[fail] ${task.id}: ${err.message}`); }
  }
}
await Promise.all(Array.from({ length: IMAGE_CONFIG.concurrency }, worker));
if (!dry) await writeFile(reportPath, JSON.stringify(report, null, 2));
if (failures.length) { console.error('Failed:', failures.join(', ')); process.exit(1); }
