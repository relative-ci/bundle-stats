import { ReportOptions } from '@bundle-stats/cli-utils';

export class BundleStatsWebpackPlugin {
  constructor(options?: Partial<BundleStatsWebpackPlugin.Options>) {} // eslint-disable-line

  apply(compiler: BundleStatsWebpackPlugin.Compiler): void;
}

declare namespace BundleStatsWebpackPlugin {
  interface WebpackStatsOptions {
    /**
     * Output webpack assets information
     * Default: `true`.
     */
    assets?: Boolean;

    /**
     * Output webpack chunks information
     * Default: `true`.
     */
    chunks?: Boolean;

    /**
     * Output webpack modules information
     * Default: `true`.
     */
    modules?: Boolean;

    /**
     * Output webpack hash information
     * Default: `true`.
     */
    hash?: Boolean;

    /**
     * Output webpack builtAt information
     * Default: `true`.
     */
    builtAt?: Boolean;
  }

  interface Options extends ReportOptions {
    /**
     * Compare the current build stats with the saved baseline
     *
     */
    baseline?: boolean;

    /**
     * Custom baseline file path
     *  Default: node_modules/.cache/bundle-stats/baseline.json
     */
    baselineFilepath?: string;

    /**
     * webpack stats options
     * Default: `{ assets: true: true, chunks: true, modules: true, hash: true, builtAt: true }`.
     */
    stats?: Partial<WebpackStatsOptions>;
  }

  type Compiler = import('webpack').Compiler;
}
