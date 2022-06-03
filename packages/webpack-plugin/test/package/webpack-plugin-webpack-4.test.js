const webpack4 = require('webpack4'); // eslint-disable-line
const MemoryFS = require('memory-fs');
const { advanceTo } = require('jest-date-mock');

jest.mock('webpack', () => require('./node_modules/webpack4')); // eslint-disable-line

const config = require('./app/webpack.config');

advanceTo(new Date(2020, 10, 30));

jest.setTimeout(10 * 1000);

describe('webpack plugin package', () => {
  test('webpack4', (done) => {
    expect.assertions(3);

    const compiler = webpack4(config);
    compiler.outputFileSystem = new MemoryFS();

    compiler.run((error, stats) => {
      expect(error).toEqual(null);
      expect(stats.hasErrors()).toBe(false);
      expect(stats.toJson({ source: false, assets: true }).assets).toMatchSnapshot();
      done();
    });
  });
});
