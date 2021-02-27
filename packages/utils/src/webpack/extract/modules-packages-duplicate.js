import {  get, last, map, orderBy, sum } from 'lodash';

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

  // Filter, sum and count duplicate packages
  const { count, duplicatePackages } = Object.entries(packagesByName).reduce(
    (agg, [name, data]) => {
      if (data.children.length === 1) {
        return agg;
      }

      return {
        count: agg.count + 1,
        duplicatePackages: [
          ...(agg.duplicatePackages || []),
          {
            name,
            value: sum(map(data.children, 'value')),
            ...data,
          },
        ],
      };
    },
    { count: 0, duplicatePackages: [] },
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

  const duplicatePackagesByName = orderBy(duplicatePackages, 'value', 'desc').reduce(
    (agg, { name, ...duplicatePackageData }) => ({
      ...agg,
      [name]: {
        ...duplicatePackageData,
        children: orderBy(duplicatePackageData.children, 'value', 'desc'),
      },
    }),
    {},
  );

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
      },
    },
    metrics: {
      duplicatePackagesCount: {
        value: count,
      },
    },
  };
};
