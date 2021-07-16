// eslint-disable-next-line import/no-extraneous-dependencies
import { StatsAsset, StatsCompilation, StatsModule } from 'webpack';
import flow from 'lodash/fp/flow';
import fromPairs from 'lodash/fp/fromPairs';
import get from 'lodash/fp/get';
import map from 'lodash/fp/map';
import _filter from 'lodash/fp/filter';
import pick from 'lodash/fp/pick';
import toPairs from 'lodash/fp/toPairs';

const PATH_IGNORE_PATTERN = '.map$';

interface BundleStatsOptions {
  pathIgnorePattern?: string;
}

type WebpackStatsFilteredAsset = Pick<StatsAsset, 'name' | 'size'>;

interface WebpackStatsFileteredEntrypoint {
  assets: Array<string>;
}

interface WebpackStatsFilteredChunk {
  entry: boolean;
  id: number | string;
  initial: boolean;
  files: Array<string>;
  names: Array<string>;
}

interface WebpackStatsFileteredModule extends Pick<StatsModule, 'name' | 'size' | 'chunks'> {
  modules?: Array<Pick<StatsModule, 'name' | 'size'>>;
}

interface WebpackStatsFiltered {
  builtAt?: string;
  hash?: string;
  assets?: Array<WebpackStatsFilteredAsset>;
  entrypoints?: Record<string, WebpackStatsFileteredEntrypoint>;
  chunks?: Array<WebpackStatsFilteredChunk>;
  modules?: Array<WebpackStatsFileteredModule>;
}

/**
 * Filter webpack stats data
 */
export default (
  source: StatsCompilation, options: BundleStatsOptions = {},
): WebpackStatsFiltered => {
  const pathIgnorePattern = new RegExp(options.pathIgnorePattern || PATH_IGNORE_PATTERN);

  // meta
  const builtAt = get('builtAt')(source);
  const hash = get('hash')(source);

  // rawData
  const assets = flow([
    get('assets'),
    map(pick(['name', 'size'])),
    // Skip assets with empty name or ignore pattern
    _filter(({ name }) => name && !pathIgnorePattern.test(name)),
  ])(source);

  const entrypoints = flow([
    get('entrypoints'),
    toPairs,
    map(([key, value]) => [key, pick('assets')(value)]),
    fromPairs,
  ])(source);

  const chunks = flow([
    get('chunks'),
    map(pick(['id', 'entry', 'initial', 'files', 'names'])),
    // Skip chunks with empty id
    _filter(({ id }) => id !== null && typeof id !== 'undefined'),
  ])(source);

  const modules = source?.modules?.map(
    ({ name, size, chunks: moduleChunks, modules: concatenatedModules }) => ({
      name,
      size,
      chunks: moduleChunks?.filter((chunkId) => chunkId !== null && typeof chunkId !== 'undefined'),
      modules: concatenatedModules?.map((concatenatedModule) => ({
        name: concatenatedModule.name,
        size: concatenatedModule.size,
      })),
    }),
  );

  return {
    builtAt,
    hash,
    assets,
    entrypoints,
    chunks,
    modules,
  };
};
