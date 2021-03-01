import { get } from 'lodash';

import { getAssetName } from '../utils';

const IGNORE_PATTERN = /\.(map|LICENSE\.txt)$/;

export const extractAssets = (webpackStats) => {
  const webpackAssets = get(webpackStats, 'assets', []);
  const webpackChunks = get(webpackStats, 'chunks', []);
  const webpackEntrypoints = get(webpackStats, 'entrypoints', {});

  const entryItems = Object.values(webpackEntrypoints)
    .map(({ assets: items }) => items)
    .flat();

  const initialItems = webpackChunks
    .filter(({ initial }) => initial)
    .map(({ files }) => files)
    .flat();

  const chunkItems = webpackChunks.map(({ files }) => files).flat();

  const assets = webpackAssets.reduce((aggregator, asset) => {
    const baseName = asset?.name.split('?')[0];

    if (IGNORE_PATTERN.test(baseName)) {
      return aggregator;
    }

    const normalizedName = getAssetName(baseName);
    const { size, name } = asset;

    return {
      ...aggregator,
      [normalizedName]: {
        name: baseName,
        value: size,
        isEntry: entryItems.includes(name),
        isInitial: initialItems.includes(name),
        isChunk: chunkItems.includes(name),
      },
    };
  }, {});

  return { metrics: { assets } };
};
