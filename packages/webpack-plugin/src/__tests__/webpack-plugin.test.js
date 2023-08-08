import path from 'path';
import fs from 'fs/promises';
import webpack from 'webpack';
import MemoryFS from 'memory-fs';
import { advanceTo } from 'jest-date-mock';

import { BundleStatsWebpackPlugin } from '../webpack-plugin';

advanceTo(new Date(2020, 10, 30));

jest.setTimeout(10 * 1000);

const CONTEXT = path.join(__dirname, '../../test/package/app');

describe('webpack plugin', () => {
  test('default config', (done) => {
    expect.assertions(3);

    const compiler = webpack({
      mode: 'production',
      context: CONTEXT,
      plugins: [new BundleStatsWebpackPlugin()],
    });
    compiler.outputFileSystem = new MemoryFS();

    compiler.run((error, stats) => {
      expect(error).toEqual(null);
      expect(stats.hasErrors()).toBe(false);
      const { assets } = stats.toJson({ source: false, assets: true });
      const bundleStatsAsset = assets.find((asset) => asset.name.match(/bundle-stats\.html$/));
      expect(bundleStatsAsset).toBeTruthy();
      done();
    });
  });

  test('baseline', (done) => {
    expect.assertions(4);

    const compiler = webpack({
      mode: 'production',
      context: CONTEXT,
      plugins: [new BundleStatsWebpackPlugin({ baseline: true })],
    });
    compiler.outputFileSystem = new MemoryFS();

    compiler.run((error, stats) => {
      expect(error).toEqual(null);
      expect(stats.hasErrors()).toBe(false);
      const { assets } = stats.toJson({ source: false, assets: true });
      const bundleStatsAsset = assets.find((asset) => asset.name.match(/bundle-stats\.html$/));
      expect(bundleStatsAsset).toBeTruthy();
      const baselineAsset = assets.find((asset) =>
        asset.name.match(/node_modules\/\.cache\/bundle-stats\/baseline\.json$/),
      );
      expect(baselineAsset).toBeTruthy();
      done();
    });
  });

  describe('compare', () => {
    // Create default baseline file
    const outputDir = path.join(__dirname, '../../node_modules/.cache/bundle-stats');
    const baselineFilepath = path.join(outputDir, 'baseline.json');

    beforeEach(async () => {
      await fs.mkdir(outputDir, { recursive: true });
      await fs.writeFile(
        baselineFilepath,
        JSON.stringify({
          assets: [
            {
              name: 'main.js',
              size: 20,
            },
          ],
        }),
      );

      jest.spyOn(global.console, 'info');
      jest.spyOn(global.console, 'warn');
    });

    afterEach(async () => {
      await fs.rm(baselineFilepath);
    });

    test('should compare with baseline.json', (done) => {
      expect.assertions(6);

      const compiler = webpack({
        mode: 'production',
        context: CONTEXT,
        plugins: [new BundleStatsWebpackPlugin({ compare: true })],
      });
      compiler.outputFileSystem = new MemoryFS();

      compiler.run((error, stats) => {
        expect(error).toEqual(null);
        expect(stats.hasErrors()).toBe(false);

        /* eslint-disable no-console */
        expect(console.warn).not.toBeCalledWith('Missing baseline stats, see "baseline" option.');
        expect(console.info).toBeCalledWith(
          'Read baseline from ../node_modules/.cache/bundle-stats/baseline.json',
        );
        expect(console.info).toBeCalledWith('Bundle Size — 27B (+35%).');
        /* eslint-enable no-console */

        const { assets } = stats.toJson({ source: false, assets: true });
        const bundleStatsAsset = assets.find((asset) => asset.name.match(/bundle-stats\.html$/));
        expect(bundleStatsAsset).toBeTruthy();
        done();
      });
    });
  });
});
