import { find, get, last } from 'lodash';

import { PACKAGES_SEPARATOR } from '../config';

export const duplicatePackagesBundleTransform = (bundleStats) => {
  const data = get(bundleStats, 'packages', {});

  const packages = Object.keys(data).map(
    (path) => ({
      name: last(path.split(PACKAGES_SEPARATOR)),
      path,
    }),
  );

  const { value, paths } = packages.reduce((agg, { name, path }, index) => {
    if (index === 0) {
      return agg;
    }

    const foundDuplicatePackage = find(packages.slice(0, index), { name });
    if (foundDuplicatePackage) {
      return {
        paths: {
          ...agg.paths,
          [name]: [
            ...agg.paths[name] ? agg.paths[name] : [],
            // Include prev duplicate package path if missing
            ...agg.paths[name] && agg.paths[name].includes(foundDuplicatePackage.path)
              ? []
              : [foundDuplicatePackage.path],
            path,
          ],
        },
        value: agg.value + 1,
      };
    }

    return agg;
  }, { paths: {}, value: 0 });

  return {
    warnings: {
      duplicatePackages: paths,
    },
    stats: {
      duplicatePackagesCount: {
        value,
      },
    },
  };
};
