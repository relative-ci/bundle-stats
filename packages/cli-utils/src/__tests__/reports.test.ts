import path from 'path';
import { vol } from 'memfs';

import { generateReports } from '../reports';
import { BASELINE_STATS_DIR, BASELINE_STATS_BASE } from '../baseline';

jest.mock('fs/promises');

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

describe('generateAssets', () => {
  test('should generate reports with default options', async () => {
    const reports = await generateReports(SOURCE_CURRENT, {});

    expect(Object.keys(reports).length).toEqual(1);
    expect(reports['bundle-stats.html'].type).toEqual('report');
    expect(reports['bundle-stats.html'].source).toMatch('Bundle Size — 12KiB (+100%)');
  });

  test('should generate reports with multiple output types', async () => {
    const reports = await generateReports(SOURCE_CURRENT, { json: true });

    expect(Object.keys(reports).length).toEqual(2);
    expect(reports['bundle-stats.html'].type).toEqual('report');
    expect(reports['bundle-stats.html'].source).toMatch('Bundle Size — 12KiB (+100%)');
    expect(reports['bundle-stats.json'].type).toEqual('report');
    expect(reports['bundle-stats.json'].source).toMatch('Bundle Size — 12KiB (+100%)');
  });

  test('should generate reports with custom output directory', async () => {
    const reports = await generateReports(SOURCE_CURRENT, { outDir: 'dist' });

    expect(Object.keys(reports).length).toEqual(1);
    expect(reports['dist/bundle-stats.html'].type).toEqual('report');
    expect(reports['dist/bundle-stats.html'].source).toMatch('Bundle Size — 12KiB (+100%)');
  });

  describe('compare', () => {
    beforeEach(() => {
      vol.reset();
    });

    test('should generate reports with compare option', async () => {
      const baselineFilepath = path.join(BASELINE_STATS_DIR, BASELINE_STATS_BASE);

      vol.fromJSON({
        [baselineFilepath]: JSON.stringify(SOURCE_BASELINE),
      });

      const reports = await generateReports(SOURCE_CURRENT, { compare: true });

      expect(Object.keys(reports).length).toEqual(1);
      expect(reports['bundle-stats.html'].type).toEqual('report');
      expect(reports['bundle-stats.html'].source).toMatch('Bundle Size — 12KiB (+20%)');
    });

    test('should generate reports with compare option and custom baselineFilepath', async () => {
      const baselineDir = path.join(__dirname, 'dist');
      const baselineFilepath = path.join(baselineDir, 'custom.json');

      vol.fromJSON({
        [baselineFilepath]: JSON.stringify(SOURCE_BASELINE),
      });

      const reports = await generateReports(SOURCE_CURRENT, { compare: true, baselineFilepath });

      expect(Object.keys(reports).length).toEqual(1);
      expect(reports['bundle-stats.html'].type).toMatch('report');
      expect(reports['bundle-stats.html'].source).toMatch('Bundle Size — 12KiB (+20%)');
    });
  });

  describe('baseline', () => {
    test('should generate reports and save current stats to default baseline', async () => {
      const baselineFilepath = path.join(BASELINE_STATS_DIR, BASELINE_STATS_BASE);
      const relativeBaselineFilepath = path.relative(process.cwd(), baselineFilepath);

      const reports = await generateReports(SOURCE_CURRENT, { baseline: true });

      expect(Object.keys(reports).length).toEqual(2);
      expect(reports['bundle-stats.html'].type).toEqual('report');
      expect(reports['bundle-stats.html'].source).toMatch('Bundle Size — 12KiB (+100%)');

      expect(reports[relativeBaselineFilepath].type).toEqual('baseline');
    });

    test('should generate reports and save current stats to relative baseline', async () => {
      const outputPath = path.join(__dirname, 'dist');
      const baselineDir = path.relative(
        outputPath,
        path.dirname(path.join(BASELINE_STATS_DIR, BASELINE_STATS_BASE)),
      );
      const baselineFilepath = path.join(baselineDir, 'baseline.json');

      const reports = await generateReports(SOURCE_CURRENT, { baseline: true }, { outputPath });

      expect(Object.keys(reports).length).toEqual(2);
      expect(reports['bundle-stats.html'].type).toEqual('report');
      expect(reports['bundle-stats.html'].source).toMatch('Bundle Size — 12KiB (+100%)');
      expect(reports[baselineFilepath].type).toEqual('baseline');
    });

    test('should generate reports and save current stats to custom baseline', async () => {
      const baselineFilepath = path.join(__dirname, 'custom-baseline.json');
      const relativeBaselineFilepath = path.relative(process.cwd(), baselineFilepath);

      const reports = await generateReports(SOURCE_CURRENT, { baseline: true, baselineFilepath });

      expect(Object.keys(reports).length).toEqual(2);
      expect(reports['bundle-stats.html'].type).toEqual('report');
      expect(reports['bundle-stats.html'].source).toMatch('Bundle Size — 12KiB (+100%)');

      expect(reports[relativeBaselineFilepath].type).toEqual('baseline');
    });
  });
});
