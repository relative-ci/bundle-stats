import { getAssetName } from './get-asset-name';

const IGNORE_PATTERN = /\.map$/;

/*
 * Transform assets array to an object with metrics
 */
export const getAssetsMetrics = (assets = []) => assets.reduce((aggregator, asset) => {
  if (IGNORE_PATTERN.test(asset.name)) {
    return aggregator;
  }

  const source = getAssetName(asset.name);
  // @TODO Get an uniq id (based on url, source)
  const id = source;

  const { size, ...restAssetProps } = asset;

  return {
    ...aggregator,
    [id]: {
      ...restAssetProps,
      value: size,
    },
  };
}, {});
