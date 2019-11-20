import {
  find, get, isEmpty, last, set,
} from 'lodash';

import { PACKAGES_SEPARATOR, SOURCE_PATH_WEBPACK_STATS } from '../../config';

export const extractModulesPackagesDuplicate = (bundleStats) => {
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
      ...!isEmpty(paths) ? set({}, `${SOURCE_PATH_WEBPACK_STATS}.duplicatePackages`, paths) : {},
    },
    stats: {
      duplicatePackagesCount: {
        value,
      },
    },
  };
};
