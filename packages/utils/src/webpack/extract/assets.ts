import isEmpty from 'lodash/isEmpty';
import { WebpackStatsFiltered } from '@bundle-stats/plugin-webpack-filter';

import { MetricsAssets, Assets } from '../types';
import { getAssetName, normalizeChunkId } from '../utils';

const IGNORE_PATTERN = /\.(map|LICENSE\.txt)$/;

export const extractAssets = (webpackStats: WebpackStatsFiltered): MetricsAssets => {
  const webpackAssets = webpackStats.assets;
  const webpackChunks = webpackStats.chunks;

  let initialAssetNames: Array<string> = [];
  let entryAssetNames: Array<string> = [];

  webpackChunks?.forEach((webpackChunk) => {
    if (webpackChunk.initial && webpackChunk.files && webpackChunk.files?.length > 0) {
      initialAssetNames = initialAssetNames.concat(webpackChunk.files);
    }

    if (webpackChunk.entry && webpackChunk.files && webpackChunk.files?.length > 0) {
      entryAssetNames = entryAssetNames.concat(webpackChunk.files);
    }
  });

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
        isEntry: entryAssetNames.includes(name),
        isInitial: initialAssetNames.includes(name),
        isChunk: Boolean(assetChunk),
        ...(assetChunk && { chunkId: assetChunk.id }),
      };

      return agg;
    }, {} as Assets) || {};

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
