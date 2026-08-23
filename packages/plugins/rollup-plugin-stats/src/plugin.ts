import path from 'node:path';
import process from 'node:process';

import extractRollupStats, { type StatsOptions } from './extract';
import { type RollupStatsWrite, rollupStatsWrite } from './write';
import { formatFileSize } from './utils/format-file-size';
import type { OutputBundle } from './types';

const PLUGIN_NAME = 'rollupStats';
const DEFAULT_FILE_NAME = 'stats.json';

/**
 * A subset of resolved output options provided to the `generateBundle` hook by Vite/Rolldown/Rollup,
 * containing only the fields this plugin uses to generate a stats file for a specific output.
 */
export type OutputOptions = {
  /** Output directory for the generated files. */
  dir?: string | undefined;

  /** Output format */
  format?:
    | 'es'
    | 'esm'
    | 'module'
    | 'cjs'
    | 'commonjs'
    | 'iife'
    | 'umd'
    | 'amd'
    | 'system'
    | 'systemjs'
    | undefined;
};

/**
 * Subset of the Vite/Rolldown/Rollup plugin hook context (`this`) used by this plugin.
 */
type PluginContext = {
  /** Log an informational message through Vite/Rolldown/Rollup's logging pipeline. */
  info: (message: string) => void;

  /** Log a warning through Vite/Rolldown/Rollup's logging pipeline without stopping the build. */
  warn: (message: string) => void;
};

/**
 * Minimum plugin interface compatible with Vite/Rolldown/Rollup.
 *
 * @example
 * {
 *   name: 'rollupStats',
 *   async generateBundle(outputOptions, bundle) { ... },
 * }
 */
export type Plugin = {
  /** Unique identifier for the plugin, used in error messages and logs. */
  name: string;

  /**
   * Hook called after the bundle has been fully generated but before it is
   * written to disk. Receives the resolved output options and the complete
   * output bundle map.
   */
  generateBundle?: (
    this: PluginContext,
    outputOptions: OutputOptions,
    bundle: OutputBundle,
    isWrite: boolean
  ) => void | Promise<void>;
};

export type RollupStatsOptions = {
  /**
   * Output filename relative to Rollup output directory or absolute
   * @default: stats.json
   */
  fileName?: string;
  /**
   * Rollup stats options
   */
  stats?: StatsOptions;
  /**
   * Custom file writer
   * @default - fs.write(FILENAME, JSON.stringify(STATS, null, 2));
   */
  write?: RollupStatsWrite;
};

export type RollupStatsOptionsOrOutputOptions =
  | RollupStatsOptions
  | ((outputOptions: OutputOptions) => RollupStatsOptions);

export function rollupStats(
  options: RollupStatsOptionsOrOutputOptions = {}
): Plugin {
  return {
    name: PLUGIN_NAME,
    async generateBundle(context, bundle) {
      const resolvedOptions =
        typeof options === 'function' ? options(context) : options;
      const {
        fileName,
        stats: statsOptions,
        write = rollupStatsWrite,
      } = resolvedOptions || {};

      const resolvedFileName = fileName || DEFAULT_FILE_NAME;
      const filepath = path.isAbsolute(resolvedFileName)
        ? resolvedFileName
        : path.join(context.dir || process.cwd(), resolvedFileName);

      const stats = extractRollupStats(bundle, statsOptions);

      try {
        const res = await write(filepath, stats);
        const outputSize = Buffer.byteLength(res.content, 'utf-8');

        this.info(
          `Stats saved to ${res.filepath} (${formatFileSize(outputSize)})`
        );
      } catch (error: unknown) {
        const message =
          error instanceof Error ? error.message : JSON.stringify(error);

        // Log error, but do not throw to allow the compilation to continue
        this.warn(message);
      }
    },
  } satisfies Plugin;
}
