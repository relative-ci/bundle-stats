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

  const initialItems = Object.values(webpackChunks)
    .filter(({ initial }) => initial)
    .map(({ files }) => files)
    .flat();

  const chunkItems = Object.values(webpackChunks)
    .filter(({ entry, initial }) => !entry && !initial)
    .map(({ files }) => files)
    .flat();

  const assets = webpackAssets.reduce((aggregator, asset) => {
    if (IGNORE_PATTERN.test(asset.name)) {
      return aggregator;
    }

    const source = getAssetName(asset.name);
    // @TODO Get an uniq id (based on url, source)
    const id = source;

    const { size, name } = asset;

    return {
      ...aggregator,
      [id]: {
        name,
        value: size,
        isEntry: entryItems.includes(name),
        isInitial: initialItems.includes(name),
        isChunk: chunkItems.includes(name),
      },
    };
  }, {});

  return { metrics: { assets } };
};
