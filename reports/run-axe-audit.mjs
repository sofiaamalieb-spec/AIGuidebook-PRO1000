import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';

const pages = [
  'index.html',
  'Pages/what-is-ai.html',
  'Pages/rules.html',
  'Pages/prompts.html',
  'Pages/examples.html',
  'Pages/ethics.html',
  'Pages/ai-checklist.html',
];

const baseUrl = 'http://127.0.0.1:4173/';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const report = [];

for (const path of pages) {
  const page = await context.newPage();
  const url = new URL(path, baseUrl).toString();
  await page.goto(url, { waitUntil: 'networkidle' });

  const axeResults = await new AxeBuilder({ page }).analyze();
  report.push({
    path,
    url,
    violations: axeResults.violations.map(v => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      help: v.help,
      helpUrl: v.helpUrl,
      nodes: v.nodes.map(n => ({
        target: n.target,
        failureSummary: n.failureSummary,
      })),
    })),
    passesCount: axeResults.passes.length,
    violationsCount: axeResults.violations.length,
  });

  await page.close();
}

await context.close();
await browser.close();

await fs.writeFile('reports/axe-report.json', JSON.stringify(report, null, 2), 'utf8');

console.log('axe-report.json written');
for (const item of report) {
  console.log(`${item.path}: violations=${item.violationsCount}`);
}
