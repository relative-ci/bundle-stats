import { fill, mergeWith } from 'lodash';

const mergeWithAsset = (index, count) => (objValue, srcValue) => {
  const res = objValue && objValue.entries
    ? [...objValue.entries]
    : fill(Array(count), null);

  res[index] = srcValue;

  return { entries: res };
};

/*
 * Merge all assetsById
 */
const mergeAssetsById = (entries) => {
  const entriesCount = entries.length;

  return entries.reduce(
    (aggregator, assetsById, entryIndex) =>
      mergeWith(
        aggregator,
        assetsById,
        mergeWithAsset(entryIndex, entriesCount),
      ),
    {},
  );
};

export default mergeAssetsById;
