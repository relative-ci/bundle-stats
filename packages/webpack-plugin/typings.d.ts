import { ReportOptions } from '@bundle-stats/cli-utils';

export class BundleStatsWebpackPlugin {
  constructor(options?: Partial<BundleStatsWebpackPlugin.Options>) {}

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
     * webpack stats options
     * Default: `{ assets: true: true, chunks: true, modules: true, hash: true, builtAt: true }`.
     */
    stats?: Partial<WebpackStatsOptions>;
  }

  type Compiler = import('webpack').Compiler;
}
