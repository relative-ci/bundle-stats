import path from 'path';
import webpack from 'webpack';
import MemoryFS from 'memory-fs';
import { merge } from 'lodash';
import { advanceTo } from 'jest-date-mock';

import { BundleStatsWebpackPlugin } from '../webpack-plugin';

advanceTo(new Date(2020, 10, 30));

jest.setTimeout(10 * 1000);

const BASE_CONFIG = {
  mode: 'production',
  context: path.join(__dirname, '../../test/package/app'),
};

describe('webpack plugin', () => {
  test('default config', (done) => {
    expect.assertions(3);

    const compiler = webpack(
      merge({}, BASE_CONFIG, {
        plugins: [new BundleStatsWebpackPlugin()],
      }),
    );
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
    expect.assertions(3);

    const compiler = webpack(
      merge({}, BASE_CONFIG, {
        plugins: [new BundleStatsWebpackPlugin({ baseline: true })],
      }),
    );
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
});
