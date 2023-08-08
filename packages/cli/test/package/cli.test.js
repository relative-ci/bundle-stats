const os = require('os');
const path = require('path');
const util = require('util');
const fs = require('fs/promises');

const exec = util.promisify(require('child_process').exec);

describe('CLI', () => {
  afterEach(() => fs.rm('dist', { recursive: true, force: true }));

  test('should generate demo report', async () => {
    const { stdout } = await exec('npx bundle-stats --demo');

    const jsonReport = await fs.readFile('dist/bundle-stats.json');
    expect(jsonReport).toBeTruthy();

    const htmlReport = await fs.readFile('dist/bundle-stats.html');
    expect(htmlReport).toBeTruthy();

    expect(stdout).toContain('[SUCCESS] Save reports');
  });

  test('should generate single report', async () => {
    const { stdout } = await exec('npx bundle-stats ../../__fixtures__/webpack-stats-current.json');

    const htmlReport = await fs.readFile('dist/bundle-stats.html', 'utf8');
    expect(htmlReport).toContain('Bundle Size — 2MiB (+100%). - BundleStats');

    expect(stdout).toContain('[SUCCESS] Save reports');
  });

  test('should generate compared report', async () => {
    const { stdout } = await exec(
      'npx bundle-stats ../../__fixtures__/webpack-stats-current.json ../../__fixtures__/webpack-stats-baseline.json',
    );

    const htmlReport = await fs.readFile('dist/bundle-stats.html', 'utf8');
    expect(htmlReport).toContain('Bundle Size — 2MiB (-3.11%). - BundleStats');

    expect(stdout).toContain('[SUCCESS] Save reports');
  });

  describe('out-dir', () => {
    const absoluteOutDir = path.join(os.tmpdir(), 'bundle-stats');

    afterEach(() =>
      Promise.all([
      fs.rm('custom-outdir', { recursive: true, force: true }),
      fs.rm(absoluteOutDir, { recursive: true, force: true }),
    ]),
    );

    test('should generate report in a custom relative directory', async () => {
      const { stdout } = await exec(
        'npx bundle-stats --out-dir custom-outdir ../../__fixtures__/webpack-stats-current.json ../../__fixtures__/webpack-stats-baseline.json',
      );

      const htmlReport = await fs.readFile('custom-outdir/bundle-stats.html', 'utf8');
      expect(htmlReport).toContain('Bundle Size — 2MiB (-3.11%). - BundleStats');

      expect(stdout).toContain('[SUCCESS] Save reports');
    });

    test('should generate report in a custom absolute directory', async () => {
      const { stdout } = await exec(
        `npx bundle-stats --out-dir ${absoluteOutDir} ../../__fixtures__/webpack-stats-current.json ../../__fixtures__/webpack-stats-baseline.json`,
      );

      const htmlReport = await fs.readFile(path.join(absoluteOutDir, 'bundle-stats.html'), 'utf8');
      expect(htmlReport).toContain('Bundle Size — 2MiB (-3.11%). - BundleStats');

      expect(stdout).toContain('[SUCCESS] Save reports');
    });
  });

  describe('compare with baseline', () => {
    const baselineDefaultDirectory = 'node_modules/.cache/bundle-stats';
    const baselineDefaultFilepath = path.join(baselineDefaultDirectory, 'baseline.json');
    const baselineCustomDirectory = 'custom-baseline-directory';
    const baselineCustomFilepath = path.join(baselineCustomDirectory, 'custom-baseline.json');
    const baselineCustomAbsoluteDirectory = path.join(os.tmpdir(), 'custom-baseline-directory');
    const baselineCustomAbsoluteFilepath = path.join(
      baselineCustomAbsoluteDirectory,
      'custom-baseline.json',
    );

    afterEach(() =>
      Promise.all([
      fs.rm('dist', { recursive: true, force: true }),
      fs.rm(baselineDefaultDirectory, { recursive: true, force: true }),
      fs.rm(baselineCustomDirectory, { recursive: true, force: true }),
      fs.rm(baselineCustomAbsoluteDirectory, { recursive: true, force: true }),
    ]),
    );

    test('should generate report successfully when baseline is missing', async () => {
      const { stdout } = await exec(
        'npx bundle-stats --compare ../../__fixtures__/webpack-stats-current.json',
      );

      const htmlReport = await fs.readFile('dist/bundle-stats.html', 'utf8');
      expect(htmlReport).toContain('Bundle Size — 2MiB (+100%). - BundleStats');

      expect(stdout).toContain('[SUCCESS] Save reports');
    });

    test('should generate report with default baseline', async () => {
      // prime default baseline
      await fs.mkdir(baselineDefaultDirectory, { recursive: true });
      await fs.copyFile('../../__fixtures__/webpack-stats-baseline.json', baselineDefaultFilepath);

      const { stdout } = await exec(
        'npx bundle-stats --compare --baseline ../../__fixtures__/webpack-stats-current.json',
      );

      const htmlReport = await fs.readFile('dist/bundle-stats.html', 'utf8');
      expect(htmlReport).toContain('Bundle Size — 2MiB (-3.11%). - BundleStats');

      expect(stdout).toContain(`[SUCCESS] Write baseline data (${baselineDefaultFilepath})`);
      expect(stdout).toContain('[SUCCESS] Save reports');
    });

    test('should generate report with custom relative baseline filepath', async () => {
      // prime custom baseline
      await fs.mkdir(baselineCustomDirectory, { recursive: true });
      await fs.copyFile('../../__fixtures__/webpack-stats-baseline.json', baselineCustomFilepath);

      const { stdout } = await exec(
        `npx bundle-stats --compare --baseline --baseline-filepath ${baselineCustomFilepath} ../../__fixtures__/webpack-stats-current.json`,
      );

      const htmlReport = await fs.readFile('dist/bundle-stats.html', 'utf8');
      expect(htmlReport).toContain('Bundle Size — 2MiB (-3.11%). - BundleStats');

      expect(stdout).toContain(`[SUCCESS] Write baseline data (${baselineCustomFilepath})`);
      expect(stdout).toContain('[SUCCESS] Save reports');
    });

    test('should generate report with custom absolute baseline filepath', async () => {
      // prime custom baseline
      await fs.mkdir(baselineCustomAbsoluteDirectory, { recursive: true });
      await fs.copyFile(
        '../../__fixtures__/webpack-stats-baseline.json',
        baselineCustomAbsoluteFilepath,
      );

      const { stdout } = await exec(
        `npx bundle-stats --compare --baseline --baseline-filepath ${baselineCustomAbsoluteFilepath} ../../__fixtures__/webpack-stats-current.json`,
      );

      const htmlReport = await fs.readFile('dist/bundle-stats.html', 'utf8');
      expect(htmlReport).toContain('Bundle Size — 2MiB (-3.11%). - BundleStats');

      expect(stdout).toMatch(/\[SUCCESS\] Write baseline data \(.*custom-baseline\.json\)/);
      expect(stdout).toContain('[SUCCESS] Save reports');
    });
  });
});
