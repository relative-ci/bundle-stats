const path = require('path');
const webpack4 = require('webpack4'); // eslint-disable-line
const MemoryFS = require('memory-fs');

jest.mock('webpack', () => require('./node_modules/webpack4')); // eslint-disable-line
jest.setTimeout(10 * 1000);

const config = require('./app/webpack.config');

describe('webpack plugin package', () => {
  test('webpack4', (done) => {
    const fs = new MemoryFS();

    expect.assertions(3);

    const compiler = webpack4(config);
    compiler.outputFileSystem = fs;

    compiler.run((error, stats) => {
      expect(error).toEqual(null);
      expect(stats.hasErrors()).toBe(false);
      const report = fs.readFileSync(path.join(__dirname, './dist/bundle-stats.html'), 'utf-8');
      expect(report).toBeTruthy();
      done();
    });
  });
});
