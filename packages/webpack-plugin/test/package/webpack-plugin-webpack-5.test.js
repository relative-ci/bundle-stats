const path = require('path');
const webpack5 = require('webpack');
const MemoryFS = require('memory-fs');

const config = require('./app/webpack.config');

describe('webpack plugin package', () => {
  test('webpack5', (done) => {
    const fs = new MemoryFS();
    expect.assertions(3);

    const compiler = webpack5(config);
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
