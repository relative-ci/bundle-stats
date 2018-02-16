import extractFilename from './extract-filename';

const IGNORE_PATTERN = /\.map$/;

/*
 * Generate an object with assets by id
 */
const getAssetsById = (assets = []) =>
  assets.reduce((aggregator, asset) => {
    if (IGNORE_PATTERN.test(asset.name)) {
      return aggregator;
    }

    const source = extractFilename(asset.name);
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

export default getAssetsById;
