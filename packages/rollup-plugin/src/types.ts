import type { OutputBundle } from 'rollup-plugin-stats';

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
    isWrite: boolean,
  ) => void | Promise<void>;
};
