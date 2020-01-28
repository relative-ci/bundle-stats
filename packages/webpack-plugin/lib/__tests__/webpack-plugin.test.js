"use strict";

var _path = _interopRequireDefault(require("path"));

var _webpack = _interopRequireDefault(require("webpack"));

var _memoryFs = _interopRequireDefault(require("memory-fs"));

var _lodash = require("lodash");

var _webpackPlugin = require("../webpack-plugin");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.setTimeout(10 * 1000);
const BASE_CONFIG = {
  mode: 'production',
  context: _path.default.join(__dirname, '../../test/package/app')
};
describe('webpack plugin', () => {
  test('default config', done => {
    expect.assertions(3);
    const compiler = (0, _webpack.default)((0, _lodash.merge)({}, BASE_CONFIG, {
      plugins: [new _webpackPlugin.BundleStatsWebpackPlugin()]
    }));
    compiler.outputFileSystem = new _memoryFs.default();
    compiler.run((error, stats) => {
      expect(error).toEqual(null);
      expect(stats.hasErrors()).toBe(false);
      expect(stats.toJson({
        source: false,
        assets: true
      }).assets).toMatchSnapshot();
      done();
    });
  });
  test('baseline', done => {
    expect.assertions(3);
    const compiler = (0, _webpack.default)((0, _lodash.merge)({}, BASE_CONFIG, {
      plugins: [new _webpackPlugin.BundleStatsWebpackPlugin({
        baseline: true
      })]
    }));
    compiler.outputFileSystem = new _memoryFs.default();
    compiler.run((error, stats) => {
      expect(error).toEqual(null);
      expect(stats.hasErrors()).toBe(false);
      expect(stats.toJson({
        source: false,
        assets: true
      }).assets).toMatchSnapshot();
      done();
    });
  });
});