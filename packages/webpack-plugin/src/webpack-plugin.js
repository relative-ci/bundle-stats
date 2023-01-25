import webpack from 'webpack';
import { merge } from 'lodash';
import { generateReports } from '@bundle-stats/cli-utils';

import * as CONFIG from './config';

const DEFAULT_OPTIONS = {
  baseline: Boolean(process.env.BUNDLE_STATS_BASELINE),
  stats: {
    assets: true,
    chunks: true,
    modules: true,
    hash: true,
    builtAt: true,
  },
};

const PLUGIN_NAME = 'BundleStats';

const isWebpack5 = parseInt(webpack.version, 10) === 5;

export class BundleStatsWebpackPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const options = merge({}, DEFAULT_OPTIONS, this.options);

    if (isWebpack5) {
      compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation) => {
        compilation.hooks.processAssets.tapPromise(
          {
            name: PLUGIN_NAME,
            stage: webpack.Compilation.PROCESS_ASSETS_STAGE_REPORT,
          },
          async () => {
            const newAssets = await generateReports(
              compilation.getStats().toJson(options.stats),
              options,
              {
                outputPath: compilation?.options?.output?.path,
                invalidOptionsUrl: CONFIG.OPTIONS_URL,
                logger:
                  compilation.getInfrastructureLogger &&
                  compilation.getInfrastructureLogger(PLUGIN_NAME),
              },
            );

            Object.entries(newAssets).forEach(([filename, source]) => {
              compilation.emitAsset(filename, new webpack.sources.RawSource(source), {
                development: true,
              });
            });
          },
        );
      });

      return;
    }

    compiler.hooks.emit.tapAsync(PLUGIN_NAME, async (compilation, callback) => {
      const newAssets = await generateReports(
        compilation.getStats().toJson(options.stats),
        options,
        {
          outputPath: compilation?.options?.output?.path,
          invalidOptionsUrl: CONFIG.OPTIONS_URL,
          logger:
            compilation.getInfrastructureLogger && compilation.getInfrastructureLogger(PLUGIN_NAME),
        },
      );

      Object.entries(newAssets).forEach(([filename, source]) => {
        // eslint-disable-next-line no-param-reassign
        compilation.assets[filename] = {
          size: () => 0,
          source: () => source,
        };
      });

      callback();
    });
  }
}
