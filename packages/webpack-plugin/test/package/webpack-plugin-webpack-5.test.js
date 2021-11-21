const webpack5 = require('webpack');
const MemoryFS = require('memory-fs');
const { advanceTo } = require('jest-date-mock');
const { set } = require('lodash');

const config = require('./app/webpack.config');

advanceTo(new Date(2020, 10, 30));

jest.setTimeout(10 * 1000);

describe('webpack plugin package', () => {
  test('webpack5', (done) => {
    expect.assertions(3);

    const compiler = webpack5(config);
    compiler.outputFileSystem = new MemoryFS();

    compiler.run((error, stats) => {
      expect(error).toEqual(null);
      expect(stats.hasErrors()).toBe(false);

      // Set bundle-stats.html size to 0 to ignore size changes
      const { assets } = stats.toJson({ source: false, assets: true });
      set(assets, '[0].size', 0);
      set(assets, '[0].info.size', 0);

      expect(assets).toMatchSnapshot();
      done();
    });
  });
});
