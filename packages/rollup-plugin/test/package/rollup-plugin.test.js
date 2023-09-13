const path = require('path');
const { vol } = require('memfs'); // eslint-disable-line
const fs = require('fs/promises');
const { rollup } = require('rollup');

const rollupConfig = require('./rollup.config');

const SOURCE_BASELINE = {
  assets: [
    {
      name: 'index.js',
      size: 20,
    },
  ],
};

jest.mock('fs/promises');

async function build(bundleStatsConfig) {
  const config = rollupConfig(bundleStatsConfig);
  const bundle = await rollup(config);
  await bundle.generate(config.output);
}

describe('rollup plugin package', () => {
  beforeEach(() => {
    vol.reset();
  });

  test('should generate bundle stats report', async () => {
    await build();

    const reportFile = await fs.readFile(path.join(__dirname, 'dist/bundle-stats.html'), 'utf-8');
    expect(reportFile).toContain('<title>Bundle Size — 28B (+100%). - BundleStats</title>');
  });

  test('should generate bundle stats report with json output', async () => {
    await build({ json: true });

    const reportHTML = await fs.readFile(path.join(__dirname, 'dist/bundle-stats.html'), 'utf-8');
    const reportJSON = await fs.readFile(path.join(__dirname, 'dist/bundle-stats.json'), 'utf-8');

    expect(reportHTML).toContain('<title>Bundle Size — 28B (+100%). - BundleStats</title>');
    expect(reportJSON).toContain('"text": "Bundle Size — 28B (+100%)."');
  });

  test('should generate bundle stats reports with custom outDir', async () => {
    await build({ json: true, outDir: 'artifacts' });

    const reportHTML = await fs.readFile(
      path.join(__dirname, 'dist/artifacts/bundle-stats.html'),
      'utf-8',
    );
    const reportJSON = await fs.readFile(
      path.join(__dirname, 'dist/artifacts/bundle-stats.json'),
      'utf-8',
    );

    expect(reportHTML).toContain('<title>Bundle Size — 28B (+100%). - BundleStats</title>');
    expect(reportJSON).toContain('"text": "Bundle Size — 28B (+100%)."');
  });

  describe('compare with baseline', () => {
    test('should generate bundle stats reports with default baseline and save', async () => {
      // Prime baseline.json
      const baselinePath = path.join(__dirname, 'node_modules/.cache/bundle-stats/baseline.json');

      vol.fromJSON({
        [baselinePath]: JSON.stringify(SOURCE_BASELINE),
      });

      await build({ baseline: true });

      const reportHTML = await fs.readFile(path.join(__dirname, 'dist/bundle-stats.html'), 'utf-8');
      expect(reportHTML).toContain('<title>Bundle Size — 28B (+40%). - BundleStats</title>');

      const baselineContent = await fs.readFile(baselinePath, 'utf-8');
      expect(baselineContent).toContain('"size":28');
    });

    test('should generate bundle stats reports with custom baseline and save', async () => {
      // Prime baseline.json
      const baselinePath = path.join(__dirname, 'dist', 'custom-baseline.json');

      vol.fromJSON({
        [baselinePath]: JSON.stringify(SOURCE_BASELINE),
      });

      await build({ baseline: true, baselineFilepath: 'custom-baseline.json' });

      const reportHTML = await fs.readFile(path.join(__dirname, 'dist/bundle-stats.html'), 'utf-8');
      expect(reportHTML).toContain('<title>Bundle Size — 28B (+40%). - BundleStats</title>');

      const baselineContent = await fs.readFile(baselinePath, 'utf-8');
      expect(baselineContent).toContain('"size":28');
    });
  });
});
