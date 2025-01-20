import * as path from 'path';
import * as fs from 'fs/promises';
import { Plugin } from 'rollup';
// @ts-ignore
import { bundleToWebpackStats } from 'rollup-plugin-webpack-stats/transform';
import { ReportOptions, generateReports } from '@bundle-stats/cli-utils';

const NAME = 'bundleStats';

function resolveAbsoluteOutputPath(outputPath?: string): string {
  if (!outputPath) {
    return process.cwd();
  }

  if (path.isAbsolute(outputPath)) {
    return outputPath;
  }

  return path.join(process.cwd(), outputPath);
}

interface BundleStatsOptions extends Omit<ReportOptions, 'outDir'> {
  /**
   * Output directory inside rollup `output.dir`
   * Default: `''`.
   */
  outDir?: string;
}

export const bundleStats = (options: BundleStatsOptions = {}): Plugin => ({
  name: NAME,
  async generateBundle(outputOptions, bundle) {
    const outputPath = resolveAbsoluteOutputPath(outputOptions.dir);
    const log = this.info || console.info; // eslint-disable-line no-console

    const source = bundleToWebpackStats(bundle);
    const reports = await generateReports(source, options, { outputPath });

    await Promise.all(
      Object.entries(reports).map(async ([relativeFilepath, report]) => {
        log(`Write bundle-stats ${report.type} to ${relativeFilepath}`);

        const baseDirectory = path.dirname(report.filepath);

        // Generate output parent directory in case is missing
        await fs.mkdir(baseDirectory, { recursive: true });

        return fs.writeFile(report.filepath, report.source);
      }),
    );
  },
});
