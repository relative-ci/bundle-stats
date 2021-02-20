import { find, get, last } from 'lodash';

import { INSIGHT_WARNING, PACKAGES_SEPARATOR } from '../../config';

export const extractModulesPackagesDuplicate = (webpackStats, currentExtractedData) => {
  const source = get(currentExtractedData, 'metrics.packages', {});

  const packagesByName = Object.entries(source).reduce((agg, [packagePath, packageData]) => {
    // Extract package name from path
    const name = last(packagePath.split(PACKAGES_SEPARATOR));
    const existingPackageData = agg[name];

    return {
      ...agg,
      [name]: {
        ...existingPackageData,
        value: (existingPackageData?.value || 0) + packageData.value,
        children: [
          ...(existingPackageData?.children || []),
          {
            name: packagePath,
            value: packageData.value,
          },
        ],
      },
    };
  }, {});

  // Filter and count duplicate packages
  const { count, duplicatePackagesByName } = Object.entries(packagesByName).reduce(
    (agg, [name, data]) => {
      if (data.children.length === 1) {
        return agg;
      }

      return {
        count: agg.count + 1,
        duplicatePackagesByName: {
          ...agg.duplicatePackagesByName,
          [name]: data,
        },
      };
    },
    { count: 0, duplicatePackagesByName: {} },
  );

  if (!count) {
    return {
      metrics: {
        duplicatePackagesCount: {
          value: count,
        },
      },
    };
  }

  // Generate v2 data structure
  // @TODO remove in v3.0
  const data = Object.entries(duplicatePackagesByName).reduce(
    (agg, [packageName, duplicatePackageData]) => ({
      ...agg,
      [packageName]: duplicatePackageData.children.map(({ name }) => name),
    }),
    {},
  );

  return {
    insights: {
      duplicatePackages: {
        type: INSIGHT_WARNING,
        data,
        dataExt: duplicatePackagesByName,
      },
    },
    metrics: {
      duplicatePackagesCount: {
        value: count,
      },
    },
  };
};
