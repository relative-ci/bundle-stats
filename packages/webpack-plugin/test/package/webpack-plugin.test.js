const webpack = require('webpack');
const webpack5 = require('webpack5');
const MemoryFS = require('memory-fs');
const { advanceTo } = require('jest-date-mock');
const config = require('./app/webpack.config');

advanceTo(new Date(2020, 10, 30));

jest.setTimeout(10 * 1000);

describe('webpack plugin package', () => {
  test('webpack4', (done) => {
    expect.assertions(3);

    const compiler = webpack(config);
    compiler.outputFileSystem = new MemoryFS();

    compiler.run((error, stats) => {
      expect(error).toEqual(null);
      expect(stats.hasErrors()).toBe(false);
      expect(stats.toJson({ source: false, assets: true }).assets).toMatchSnapshot();
      done();
    });
  });

  test('webpack5', (done) => {
    expect.assertions(3);

    const compiler = webpack5(config);
    compiler.outputFileSystem = new MemoryFS();

    compiler.run((error, stats) => {
      expect(error).toEqual(null);
      expect(stats.hasErrors()).toBe(false);
      expect(stats.toJson({ source: false, assets: true }).assets).toMatchSnapshot();
      done();
    });
  });
});
