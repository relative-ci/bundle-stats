const path = require('path');
const webpack = require('webpack');
const MemoryFS = require('memory-fs');
const { BundleStatsWebpackPlugin } = require('../webpack-plugin');
const { merge } = require('lodash');

jest.setTimeout(10 * 1000);

const BASE_CONFIG = {
  mode: 'production',
  context: path.join(__dirname, '../../test/package/app'),
};

describe('webpack plugin', () => {
  test('default config', (done) => {
    expect.assertions(3);

    const compiler = webpack(merge({}, BASE_CONFIG, {
      plugins: [
        new BundleStatsWebpackPlugin(),
      ],
    }));
    compiler.outputFileSystem = new MemoryFS()

    compiler.run((error, stats) => {
      expect(error).toEqual(null);
      expect(stats.hasErrors()).toBe(false);
      expect(stats.toJson({ source: false, assets: true }).assets).toMatchSnapshot();
      done();
    });
  });

  test('baseline', (done) => {
    expect.assertions(3);

    const compiler = webpack(merge({}, BASE_CONFIG, {
      plugins: [
        new BundleStatsWebpackPlugin({ baseline: true }),
      ],
    }));
    compiler.outputFileSystem = new MemoryFS()

    compiler.run((error, stats) => {
      expect(error).toEqual(null);
      expect(stats.hasErrors()).toBe(false);
      expect(stats.toJson({ source: false, assets: true }).assets).toMatchSnapshot();
      done();
    });
  });
});

