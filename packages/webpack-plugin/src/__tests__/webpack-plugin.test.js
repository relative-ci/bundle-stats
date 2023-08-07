import path from 'path';
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
});
