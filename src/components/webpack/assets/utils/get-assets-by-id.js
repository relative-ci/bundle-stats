/*
 * Basic asset source resolver
 *
 * @TODO use chunks/modules/entries webpack stats props
 */
const resolveAssetSource = name =>
  name.replace(/[a-f0-9]{5,32}\./, '');

const IGNORE_PATTERN = /\.map$/;

/*
 * Generate an object with assets by id
 */
const getAssetsById = assets =>
  assets.reduce((aggregator, asset) => {
    if (IGNORE_PATTERN.test(asset.name)) {
      return aggregator;
    }

    const source = resolveAssetSource(asset.name);
    // @TODO Get an uniq id (based on url, source)
    const id = source;

    return {
      ...aggregator,
      [id]: {
        source,
        ...asset,
      },
    };
  }, {});

export default getAssetsById;
