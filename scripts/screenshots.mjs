// Usage: node scripts/screenshots.mjs <label> [--widths=390,820,1280,1920]
// Builds nothing: run `npm run build` first. Serves ./dist via `vite preview`,
// captures fold + full-page JPEGs per width into docs/screenshots/<label>/ and
// reports horizontal overflow. Needs Chromium (PLAYWRIGHT_BROWSERS_PATH or CHROMIUM_PATH).
import { chromium } from 'playwright-core';
import { preview } from 'vite';
import { mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const label = process.argv[2] || 'current';
const widthsArg = process.argv.find((a) => a.startsWith('--widths='));
const widths = (widthsArg ? widthsArg.split('=')[1] : '390,820,1280,1920').split(',').map(Number);
const heightFor = (w) => (w < 700 ? 844 : w < 1000 ? 1180 : w < 1500 ? 800 : 1080);
const out = join('docs', 'screenshots', label);
mkdirSync(out, { recursive: true });

function findChromium() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const base = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
  if (!existsSync(base)) return undefined;
  const dir = readdirSync(base).find((d) => /^chromium-\d+/.test(d));
  return dir ? join(base, dir, 'chrome-linux', 'chrome') : undefined;
}

const server = await preview({ preview: { port: 4173, strictPort: true } });
const browser = await chromium.launch({ executablePath: findChromium() });
const report = [];
try {
  for (const w of widths) {
    const h = heightFor(w);
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    page.on('pageerror', (e) => console.log(`[${w}] pageerror: ${e.message}`));
    await page.goto('http://localhost:4173/', { waitUntil: 'load' });
    // loading overlay must be gone before we measure anything
    await page.waitForFunction(() => !document.querySelector('.z-\\[10000\\]'), null, { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(2500); // let entrance animation settle
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += h * 0.6) { // trigger scroll-based reveals
      await page.evaluate((v) => window.scrollTo(0, v), y);
      await page.waitForTimeout(250);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);
    const m = await page.evaluate(() => ({
      scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth,
      height: document.documentElement.scrollHeight,
    }));
    await page.screenshot({ path: join(out, `${w}-fold.jpg`), type: 'jpeg', quality: 80 });
    await page.screenshot({ path: join(out, `${w}-full.jpg`), type: 'jpeg', quality: 60, fullPage: true });
    report.push({ width: w, pageHeight: m.height, horizontalOverflow: m.scrollW > m.clientW });
    await page.close();
  }
} finally {
  await browser.close();
  await new Promise((r) => server.httpServer.close(r));
}
console.table(report);
