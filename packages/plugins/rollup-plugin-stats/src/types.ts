/**
 * Standard source map v3 object mapping generated code back to original sources.
 *
 * @see https://sourcemaps.info/spec.html
 * @see https://github.com/rollup/rollup/blob/master/src/rollup/types.d.ts#L98
 * @see https://github.com/rolldown/rolldown/blob/main/packages/rolldown/src/types/rolldown-output.ts#L26
 */
export type SourceMap = {
  /** Name of the generated file this source map corresponds to. */
  file: string;
  /** Base64 VLQ-encoded string describing the source mappings. */
  mappings: string;
  /** Original symbol names referenced by the mappings. */
  names: string[];
  /** Paths to the original source files. */
  sources: string[];
  /** Optional inline content of each original source file, parallel to `sources`. */
  sourcesContent?: string[] | undefined;
  /** Source map specification version — always `3`. */
  version: number;
};

/**
 * A generated asset entry in the output bundle (e.g. CSS, images, JSON).
 *
 * @see https://github.com/rollup/rollup/blob/master/src/rollup/types.d.ts#L958
 * @see https://github.com/rolldown/rolldown/blob/main/packages/rolldown/src/types/rolldown-output.ts#L85
 */
export type OutputAsset = {
  type: 'asset';

  /** The emitted file name of the asset relative to the output directory. */
  fileName: string;

  /**
   * The asset name, or `undefined` when not available.
   * @deprecated Use `names` instead.
   */
  name: string | undefined;

  /** All entry names that reference this asset. */
  names: string[];

  /**
   * The original file name of the source asset before any transformations, or `null` when not applicable.
   * @deprecated Use `originalFileNames` instead.
   */
  originalFileName: string | null;

  /** The original file names of the source assets before any transformations. */
  originalFileNames: string[];

  /**
   * The asset content as a string (text assets) or a `Uint8Array` (binary assets).
   * Available when options.stats.source = true (default false)
   */
  source?: string | Uint8Array;

  /**
   * Rollup - Whether this asset requires a code reference (`import.meta.ROLLUP_FILE_URL_<id>`)
   * to be included in the bundle.
   *
   * @see https://github.com/rollup/rollup/issues/4774
   */
  needsCodeReference?: boolean;

  /** Vite - specific metadata */
  viteMetadata?: {
    /** Set of asset file names imported by this asset (e.g. images referenced in CSS). */
    importedAssets: Set<string>;
    /** Set of CSS file names imported by this asset. */
    importedCss: Set<string>;
  };
};

/**
 * Stats for an individual module included in an output chunk.
 * @see https://github.com/rollup/rollup/blob/master/src/rollup/types.d.ts#L963
 * @see https://github.com/rolldown/rolldown/blob/main/packages/rolldown/src/types/rolldown-output.ts#L40
 */
export type RenderedModule = {
  /**
   * The module code that Vite/Rolldown/Rollup included in the bundle, or `null` when the
   * module was fully tree-shaken.
   * Available only when options.stats.source = true (default false)
   */
  readonly code?: string | null;

  /** Size of the original module source in bytes, before any transformations. */
  originalLength: number;

  /** Rollup - exports removed from this module by tree-shaking. */
  removedExports?: string[];

  /** Exports from this module that are retained in the final bundle. */
  renderedExports: string[];

  /** Rollup - size of the rendered module code in bytes. */
  renderedLength?: number;
};

/**
 * A generated JavaScript chunk entry in the output bundle.
 *
 * @see https://github.com/rollup/rollup/blob/master/src/rollup/types.d.ts#L992
 * @see https://github.com/rolldown/rolldown/blob/main/packages/rolldown/src/types/rolldown-output.ts#L85
 */
export type OutputChunk = {
  type: 'chunk';

  /** The chunk name as used in `chunkFileNames` and `entryFileNames` patterns */
  name: string;

  /** The emitted file name of the chunk relative to the output directory. */
  fileName: string;

  /** The file name of this chunk before content hashes are applied. */
  preliminaryFileName: string;

  /** Rollup - file names of assets referenced via `import.meta.ROLLUP_FILE_URL_<id>` in this chunk. */
  referencedFiles?: string[];

  /** The file name of the source map for this chunk, or `null` when source maps are not generated. */
  sourcemapFileName: string | null;

  /** Names exported by this chunk. */
  exports: string[];

  /**
   * The module ID of the entry point that this chunk acts as a facade for,
   * or `null` when this chunk is not an entry facade.
   */
  facadeModuleId: string | null;

  /** Rollup - file names of chunks that should be loaded before this implicit entry point. */
  implicitlyLoadedBefore?: string[];

  /** Rollup - per-import binding names imported from each dependency chunk, keyed by the imported chunk's file name. */
  importedBindings?: Record<string, string[]>;

  /** Whether this chunk is a dynamic entry point (i.e. produced by a dynamic `import()`). */
  isDynamicEntry: boolean;

  /** Whether this chunk is a static entry point declared in the Vite/Rolldown/Rollup input options. */
  isEntry: boolean;

  /** Rollup - whether this chunk is an implicit entry point, loaded after another entry via `implicitlyLoadedAfterOneOf`. */
  isImplicitEntry?: boolean;

  /** File names of chunks that are dynamically imported by this chunk. */
  dynamicImports: string[];

  /** File names of chunks that are statically imported by this chunk. */
  imports: string[];

  /**
   * Per-module render stats for every module included in this chunk,
   * keyed by the module's original file path.
   */
  modules: Record<string, RenderedModule>;

  /** IDs of all modules included in this chunk, in the order they appear in the bundle. */
  moduleIds: string[];

  /**
   * The rendered JavaScript source code of this chunk.
   * Available when options.stats.source = true (default false)
   */
  code?: string;

  /**
   * Source map for this chunk, or `null` when source maps are not enabled.
   * Available when options.stats.source = true (default: false)
   */
  map?: SourceMap | null;

  /** Vite - Optional specific metadata */
  viteMetadata?: {
    /** Set of asset file names imported by this chunk (e.g. images, fonts). */
    importedAssets: Set<string>;
    /** Set of CSS file names imported by this chunk. */
    importedCss: Set<string>;
  };
};

/**
 * The complete output bundle produced by Vite/Rolldown/Rollup — a map from emitted file name
 * to its corresponding asset or chunk descriptor.
 */
export type OutputBundle = Record<string, OutputAsset | OutputChunk>;
