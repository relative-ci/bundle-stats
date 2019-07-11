import { get } from 'lodash';

import { getAssetName } from './get-asset-name';

const IGNORE_PATTERN = /\.map$/;

/*
 * Transform assets array to an object with metrics
 */
export const getAssetsMetrics = (assets = [], data) => {
  const chunks = get(data, 'chunks', []);

  const entryItems = Object.values(chunks)
    .filter(({ entry }) => entry)
    .map(({ files }) => files)
    .flat();

  const initialItems = Object.values(chunks)
    .filter(({ initial }) => initial)
    .map(({ files }) => files)
    .flat();

  const chunkItems = Object.values(chunks)
    .filter(({ entry, initial }) => !entry && !initial)
    .map(({ files }) => files)
    .flat();

  return assets.reduce((aggregator, asset) => {
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
};
