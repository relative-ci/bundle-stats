import { Plugin } from 'rollup';
import { bundleToWebpackStats } from 'rollup-plugin-webpack-stats';
import { ReportOptions, generateReports } from '@bundle-stats/cli-utils';

const NAME = 'bundleStats';

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
    const source = bundleToWebpackStats(bundle);
    const reports = await generateReports(source, options, {
      outputPath: outputOptions.dir,
    });

    Object.entries(reports).forEach(([fileName, report]) => {
      this.emitFile({
        type: 'asset',
        fileName,
        source: report.source,
      });
    });
  },
});
