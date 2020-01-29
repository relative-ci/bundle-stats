"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BundleStatsWebpackPlugin = void 0;

var _path = _interopRequireDefault(require("path"));

var _process = _interopRequireDefault(require("process"));

var _lodash = require("lodash");

var _utils = require("@bundle-stats/utils");

var _webpack = require("@bundle-stats/utils/lib-esm/webpack");

var _cliUtils = require("@bundle-stats/cli-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DEFAULT_OPTIONS = {
  compare: true,
  baseline: Boolean(_process.default.env.BUNDLE_STATS_BASELINE),
  html: true,
  json: false,
  outDir: '',
  stats: {
    context: _process.default.cwd(),
    assets: true,
    entrypoints: true,
    chunks: true,
    modules: true,
    hash: true,
    builtAt: true
  }
};

const getOnEmit = options => async (compilation, callback) => {
  const {
    compare,
    baseline,
    html,
    json,
    outDir,
    stats: statsOptions
  } = options;
  const data = (0, _webpack.filter)(compilation.getStats().toJson(statsOptions)); // Webpack builtAt is not available yet

  if (!data.builtAt) {
    data.builtAt = Date.now();
  }

  const outputPath = (0, _lodash.get)(compilation, 'options.output.path');
  const logger = compilation.getInfrastructureLogger ? compilation.getInfrastructureLogger('BundleStats') : console;
  const baselineFilepath = (0, _cliUtils.getBaselineStatsFilepath)(outputPath);
  let baselineStats = null;

  try {
    if (compare) {
      baselineStats = await (0, _cliUtils.readBaseline)();
      baselineStats = (0, _webpack.filter)(baselineStats);
      logger.info(`Read baseline from ${baselineFilepath}`);
    }
  } catch (err) {
    logger.warn(_cliUtils.TEXT.PLUGIN_BASELINE_MISSING_WARN);
  }

  const jobs = (0, _utils.createJobs)([{
    webpack: data
  }, ...(compare ? [{
    webpack: baselineStats
  }] : [])]);
  const report = (0, _utils.createReport)(jobs);
  const artifacts = (0, _cliUtils.createArtifacts)(jobs, report, {
    html,
    json
  });
  Object.values(artifacts).forEach(({
    filename,
    output
  }) => {
    const filepath = _path.default.join(outDir, filename); // eslint-disable-next-line no-param-reassign


    compilation.assets[filepath] = {
      size: () => 0,
      source: () => output
    };
  });

  if (baseline) {
    // eslint-disable-next-line no-param-reassign
    compilation.assets[baselineFilepath] = {
      size: () => 0,
      source: () => JSON.stringify(data)
    };
    logger.info(`Write baseline data to ${baselineFilepath}`);
  }

  const info = (0, _cliUtils.getReportInfo)(report);

  if (info) {
    logger.info(info.text);
  }

  callback();
};

class BundleStatsWebpackPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const options = (0, _lodash.merge)({}, DEFAULT_OPTIONS, {
      stats: {
        context: (0, _lodash.get)(compiler, 'options.context')
      }
    }, this.options);
    compiler.hooks.emit.tapAsync('BundleStats', getOnEmit(options));
  }

}

exports.BundleStatsWebpackPlugin = BundleStatsWebpackPlugin;