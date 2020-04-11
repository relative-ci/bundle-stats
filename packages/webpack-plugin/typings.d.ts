export class BundleStatsWebpackPlugin {
  constructor(options?: Partial<BundleStatsWebpackPlugin.Options>) {}
};

declare namespace BundleStatsWebpackPlugin {
  interface WebpackStatsOptions {
    /**
     * Application context
     * Default: webpack context.
     */
    context?: String;

    /**
     * Output webpack assets information
     * Default: `true`.
     */
    assets?: Boolean;

    /**
     * Output webpack entrypoints information
     * Default: `true`.
     */
    entrypoints?: Boolean;

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

  interface Options {
    /**
     * Use local saved stats for comparison
     * Default: `true`.
     */
    compare?: Boolean;

    /**
     * Save current webpack stats as baseline
     * Default: `false`.
     */
    baseline?: Boolean;

    /**
     * Output html report
     * Default: `true`.
     */
    html?: Boolean;

    /**
     * Output json report
     * Default: `false`.
     */
    json?: Boolean;

    /**
     * Output directory relative to webpack `output.path`
     * Default: `''`.
     */
    outDir?: String;

    /**
     * webpack stats options
     * Default: `{ context: WEBPACK_CONTEXT, assets: true, entrypoints: true, chunks: true, modules: true, hash: true, builtAt: true }`.
     */
    stats?: Partial<WebpackStatsOptions>
  }
}
