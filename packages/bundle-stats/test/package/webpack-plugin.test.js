const webpack = require('webpack');
const MemoryFS = require('memory-fs');
const config = require('./app/webpack.config');

jest.setTimeout(10 * 1000);

test('webpack plugin', (done) => {
  expect.assertions(3);

  const compiler = webpack(config);
  compiler.outputFileSystem = new MemoryFS()

  compiler.run((error, stats) => {
    expect(error).toEqual(null);
    expect(stats.hasErrors()).toBe(false);
    expect(stats.toJson({ source: false, assets: true }).assets).toMatchSnapshot();
    done();
  });
});
