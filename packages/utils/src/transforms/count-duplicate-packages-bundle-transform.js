import { get, last } from 'lodash';

import { PACKAGES_SEPARATOR } from '../config';

export const countDuplicatePackagesBundleTransform = (bundleStats) => {
  const packages = get(bundleStats, 'packages', {});

  const packageNames = Object.keys(packages).map(
    (packageName) => last(packageName.split(PACKAGES_SEPARATOR)),
  );

  const value = packageNames.reduce((agg, packageName, index) => {
    if (packageNames.slice(0, index).includes(packageName)) {
      return agg + 1;
    }

    return agg;
  }, 0);

  return { stats: { duplicatePackagesCount: { value } } };
};
