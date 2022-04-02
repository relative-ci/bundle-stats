import isEmpty from 'lodash/isEmpty';

import { getAssetName, normalizeChunkId } from '../utils';

const IGNORE_PATTERN = /\.(map|LICENSE\.txt)$/;

interface WebpackStatsAsset {
  name: string;
  size: number;
}

interface WebpackStatsEntrypointAsset {
  name: string;
}

interface WebpackStatsEntrypoint {
  // Webpack 5 provides { name, size }
  assets: Array<WebpackStatsEntrypointAsset | string>;
}

type WebpackStatsEntrypoints = Record<string, WebpackStatsEntrypoint>;

interface WebpackStatsChunk {
  id: string;
  entry: boolean;
  initial: boolean;
  files: Array<string>;
  names: Array<string>;
}

export const extractAssets = (webpackStats: any) => {
  const webpackAssets: Array<WebpackStatsAsset> = webpackStats?.assets || [];
  const webpackChunks: Array<WebpackStatsChunk> = webpackStats?.chunks || [];
  const webpackEntrypoints: WebpackStatsEntrypoints = webpackStats?.entrypoints || {};

  const entrypointsAssets = Object.values(webpackEntrypoints)
    .map(({ assets: items }) => items.map((item) => {
      if (typeof item === 'object') {
        return item.name;
      }

      return item;
    }))
    .flat();

  const initialItems = webpackChunks
    .filter(({ initial }) => initial)
    .map(({ files }) => files)
    .flat();

  const normalizedChunks = webpackChunks.map(({ id, names, files }) => ({
    id: normalizeChunkId(id),
    name: names.join('+') || `chunk-${id}`,
    files,
  }));

  const assets = webpackAssets.reduce((aggregator, asset) => {
    const baseName = asset?.name.split('?')[0];

    if (IGNORE_PATTERN.test(baseName)) {
      return aggregator;
    }

    // Check for the corresponding chunk
    const assetChunk = normalizedChunks.find((chunk) => chunk.files.includes(asset.name));

    const normalizedName = getAssetName(baseName);
    const { size, name } = asset;

    return {
      ...aggregator,
      [normalizedName]: {
        name: baseName,
        value: size,
        isEntry: entrypointsAssets.includes(name),
        isInitial: initialItems.includes(name),
        isChunk: Boolean(assetChunk),
        ...(assetChunk ? { chunkId: assetChunk.id } : {}),
      },
    };
  }, {});

  return {
    metrics: {
      assets,
    },
    ...(!isEmpty(normalizedChunks)
      ? {
        meta: {
          chunks: normalizedChunks.map(({ id, name }) => ({ id, name })),
        },
      }
      : {}),
  };
};
