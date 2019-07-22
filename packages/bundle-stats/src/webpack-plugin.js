const process = require('process');
const path = require('path');
const { get, merge } = require('lodash');
const { createJobs } = require('@bundle-stats/utils');

const { createReports } = require('./create-report');

const CWD = process.cwd();

const DEFAULT_OPTIONS = {
  html: true,
  json: false,
  outDir: '',
  stats: {
    context: CWD,
    assets: true,
    entrypoints: true,
    chunks: true,
    modules: true,
  },
};

const getOnEmit = options => (compilation, callback) => {
  const {
    html,
    json,
    outDir,
    stats: statsOptions,
  } = options;
  const data = compilation.getStats().toJson(statsOptions);
  const artifacts = createJobs([{ webpack: { stats: data } }]);

  createReports(artifacts, { html, json })
    .then((reports) => {
      reports.forEach(({ filename, output }) => {
        const filepath = path.join(outDir, filename);

        // eslint-disable-next-line no-param-reassign
        compilation.assets[filepath] = {
          size: () => 0,
          source: () => output,
        };
      });
    })
    .then(callback)
    .catch(err => callback(err));
};

export class BundleStatsWebpackPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const options = merge(
      {},
      DEFAULT_OPTIONS,
      {
        stats: {
          context: get(compiler, 'options.context'),
        },
      },
      this.options,
    );

    compiler.hooks.emit.tapAsync('BundleStats', getOnEmit(options));
  }
}
