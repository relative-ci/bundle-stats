const path = require('path');
const fs = require('fs/promises');
const { rollup } = require('rollup');

const rollupConfig = require('./rollup.config');

describe('rollup plugin package', () => {
  test('should generate bundle stats report', async () => {
    const bundle = await rollup(rollupConfig());
    const res = await bundle.generate({});

    expect(res.output[1]).toMatchObject({
      fileName: 'bundle-stats.html',
    });
  });

  test('should generate bundle stats report with json output', async () => {
    const bundle = await rollup(
      rollupConfig({
        json: true,
      }),
    );

    const res = await bundle.generate({});

    expect(res.output[2]).toMatchObject({
      fileName: 'bundle-stats.json',
    });
  });

  test('should generate bundle stats reports with custom outDir', async () => {
    const bundle = await rollup(
      rollupConfig({
        json: true,
        outDir: 'artifacts',
      }),
    );

    const res = await bundle.generate({});

    expect(res.output[1]).toMatchObject({
      fileName: 'artifacts/bundle-stats.html',
    });

    expect(res.output[2]).toMatchObject({
      fileName: 'artifacts/bundle-stats.json',
    });
  });

  describe('baseline', () => {
    test('should generate bundle stats reports with default baseline', async () => {
      // Prime baseline.json
      const baselineDir = path.join(__dirname, 'node_modules/.cache/bundle-stats');
      const baselinePath = path.join(baselineDir, 'baseline.json');
      await fs.mkdir(baselineDir, { recursive: true });
      await fs.writeFile(
        baselinePath,
        JSON.stringify({
          assets: [
            {
              name: './index.js',
              size: 32,
            },
          ],
        }),
      );

      const bundle = await rollup(rollupConfig());
      const res = await bundle.generate({});

      const asset = res.output[1];
      expect(asset.fileName).toEqual('bundle-stats.html');
      expect(asset.source).toContain('Bundle Size — 28B (-12.5%)');

      await fs.rm(baselinePath, { force: true });
    });
  });
});
