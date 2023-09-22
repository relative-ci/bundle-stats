import path from 'path';
import webpack from 'webpack';
import { merge } from 'lodash';
import { generateReports } from '@bundle-stats/cli-utils';
import validate from '@bundle-stats/plugin-webpack-validate';

import * as CONFIG from './config';

const DEFAULT_OPTIONS = {
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
            const outputPath = compilation?.options?.output?.path;
            const stats = compilation.getStats().toJson(options.stats);
            const logger = compilation.getInfrastructureLogger
              ? compilation.getInfrastructureLogger(PLUGIN_NAME)
              : console;

            const invalid = validate(stats);

            if (invalid) {
              logger.warn([invalid, CONFIG.OPTIONS_URL].join('\n'));
            }

            const newAssets = await generateReports(
              stats,
              {
                baseline: options.baseline,
                baselineFilepath:
                  options.baselineFilepath && path.join(outputPath, options.baselineFilepath),
              },
              {
                outputPath,
                logger,
              },
            );

            Object.entries(newAssets).forEach(([filename, report]) => {
              compilation.emitAsset(filename, new webpack.sources.RawSource(report.source), {
                development: true,
              });
            });
          },
        );
      });

      return;
    }

    compiler.hooks.emit.tapAsync(PLUGIN_NAME, async (compilation, callback) => {
      const outputPath = compilation?.options?.output?.path;
      const stats = compilation.getStats().toJson(options.stats);
      const logger = compilation.getInfrastructureLogger
        ? compilation.getInfrastructureLogger(PLUGIN_NAME)
        : console;

      const invalid = validate(stats);

      if (invalid) {
        logger.warn([invalid, CONFIG.OPTIONS_URL].join('\n'));
      }

      const newAssets = await generateReports(
        stats,
        {
          baseline: options.baseline,
          baselineFilepath:
            options.baselineFilepath && path.join(outputPath, options.baselineFilepath),
        },
        {
          outputPath,
          logger,
        },
      );

      Object.entries(newAssets).forEach(([filename, report]) => {
        // eslint-disable-next-line no-param-reassign
        compilation.assets[filename] = {
          size: () => 0,
          source: () => report.source,
        };
      });

      callback();
    });
  }
}
