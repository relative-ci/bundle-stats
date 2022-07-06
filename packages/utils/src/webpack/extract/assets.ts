import isEmpty from 'lodash/isEmpty';
import { WebpackStatsFiltered } from '@bundle-stats/plugin-webpack-filter';

import { getAssetName, normalizeChunkId } from '../utils';

const IGNORE_PATTERN = /\.(map|LICENSE\.txt)$/;

interface WebpackMetaChunk {
  id: string;
  name: string;
}

interface WebpackAssetMetric {
  name: string;
  value: number;
  isEntry: boolean;
  isInitial: boolean;
  isChunk: boolean;
  chunkId?: string;
}

type WebpackAssets = Record<string, WebpackAssetMetric>;

interface WebpackAssetsExtracted {
  metrics: {
    assets: WebpackAssets;
  };
  meta?: {
    chunks: Array<WebpackMetaChunk>;
  };
}

export const extractAssets = (webpackStats: WebpackStatsFiltered): WebpackAssetsExtracted => {
  const webpackAssets = webpackStats.assets;
  const webpackChunks = webpackStats.chunks;
  const webpackEntrypoints = webpackStats.entrypoints || {};

  const entrypointsAssets = Object.values(webpackEntrypoints)
    .map(({ assets: items }) =>
      items.map((item) => {
        if (typeof item === 'object') {
          return item.name;
        }

        return item;
      }),
    )
    .flat();

  const initialItems = webpackChunks
    ?.reduce((agg, chunk) => {
      if (!chunk.initial) {
        return agg;
      }

      // Reassign is faster
      // eslint-disable-next-line no-param-reassign
      agg = agg.concat(chunk.files || []);

      return agg;
    }, [] as Array<string>)
    .flat();

  const normalizedChunks = webpackChunks?.map(({ id, names, files }) => ({
    id: normalizeChunkId(id),
    name: names?.join('+') || `chunk-${id}`,
    files,
  }));

  const assets =
    webpackAssets?.reduce((agg, asset) => {
      const baseName = asset?.name.split('?')[0];

      if (IGNORE_PATTERN.test(baseName)) {
        return agg;
      }

      // Check for the corresponding chunk
      const assetChunk = normalizedChunks?.find((chunk) => chunk.files?.includes(asset.name));

      const normalizedName = getAssetName(baseName);
      const { size, name } = asset;

      // Reassign for perf
      // eslint-disable-next-line no-param-reassign
      agg[normalizedName] = {
        name: baseName,
        value: size || 0,
        isEntry: entrypointsAssets.includes(name),
        isInitial: initialItems?.includes(name) || false,
        isChunk: Boolean(assetChunk),
        ...(assetChunk ? { chunkId: assetChunk.id } : {}),
      };

      return agg;
    }, {} as WebpackAssets) || {};

  return {
    metrics: {
      assets,
    },
    ...(!isEmpty(normalizedChunks)
      ? {
        meta: {
          chunks: normalizedChunks?.map(({ id, name }) => ({ id, name })) || [],
        },
      }
      : {}),
  };
};
