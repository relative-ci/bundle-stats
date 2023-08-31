import path from 'path';
import fs from 'fs/promises';

import { generateReports } from '../reports';
import { BASELINE_STATS_DIR, BASELINE_STATS_BASE } from '../baseline';

const SOURCE_CURRENT = {
  assets: [
    {
      name: 'main.js',
      size: 12 * 1024,
    },
  ],
};

const SOURCE_BASELINE = {
  assets: [
    {
      name: 'main.js',
      size: 10 * 1024,
    },
  ],
};

describe('generateReports', () => {
  test('should generate reports with default options', async () => {
    const reports = await generateReports(SOURCE_CURRENT, {});

    expect(Object.keys(reports).length).toEqual(1);
    expect(reports['bundle-stats.html']).toMatch('Bundle Size — 12KiB (+100%)');
  });

  test('should generate reports with multiple output types', async () => {
    const reports = await generateReports(SOURCE_CURRENT, { json: true });

    expect(Object.keys(reports).length).toEqual(2);
    expect(reports['bundle-stats.html']).toMatch('Bundle Size — 12KiB (+100%)');
    expect(reports['bundle-stats.json']).toMatch('Bundle Size — 12KiB (+100%)');
  });

  test('should generate reports with custom output directory', async () => {
    const reports = await generateReports(SOURCE_CURRENT, { outDir: 'dist' });

    expect(Object.keys(reports).length).toEqual(1);
    expect(reports['dist/bundle-stats.html']).toMatch('Bundle Size — 12KiB (+100%)');
  });

  test('should generate reports with compare option', async () => {
    const baselineFilepath = path.join(BASELINE_STATS_DIR, BASELINE_STATS_BASE);

    // Prime baseline file
    await fs.mkdir(BASELINE_STATS_DIR, { recursive: true });
    await fs.writeFile(baselineFilepath, JSON.stringify(SOURCE_BASELINE));

    const reports = await generateReports(SOURCE_CURRENT, { compare: true });

    expect(Object.keys(reports).length).toEqual(1);
    expect(reports['bundle-stats.html']).toMatch('Bundle Size — 12KiB (+20%)');

    // Cleanup
    await fs.rm(baselineFilepath);
  });

  test('should generate reports with compare option and custom baselineFilepath', async () => {
    const baselineDir = path.join(__dirname, 'dist');
    const baselineFilepath = path.join(baselineDir, 'custom.json');

    // Prime baseline file
    await fs.mkdir(baselineDir, { recursive: true });
    await fs.writeFile(baselineFilepath, JSON.stringify(SOURCE_BASELINE));

    const reports = await generateReports(SOURCE_CURRENT, { compare: true, baselineFilepath });

    expect(Object.keys(reports).length).toEqual(1);
    expect(reports['bundle-stats.html']).toMatch('Bundle Size — 12KiB (+20%)');

    // Cleanup
    await fs.rm(baselineFilepath);
  });
});
