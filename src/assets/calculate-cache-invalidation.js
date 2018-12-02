import { round } from 'lodash';

/*
 * Calculate cache invalidation metric on the baseline data
 *
 * The metric is the ratio between the total file size of the files that have changed (exclude
 * deleted, added) and the total file size
 */
export const calculateCacheInvalidation = (rows) => {
  let cached = 0;
  let invalidated = 0;

  rows.forEach(({
    changed, added, deleted, runs,
  }) => {
    // Added and deleted files do not count towards the caching index
    if (added || deleted) {
      return;
    }

    if (changed) {
      invalidated += runs[1].value;
    }

    cached += runs[1].value;
  });

  if (cached === 0) {
    return 0;
  }

  return round((invalidated / cached) * 100, 2);
};
