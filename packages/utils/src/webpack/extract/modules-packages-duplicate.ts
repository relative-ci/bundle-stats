import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import sum from 'lodash/sum';

import { InsightType } from '../../config';
import { Packages } from '../types';

interface DuplicatePackage {
  id: string;
  value: number;
}

interface DuplicatePackageGroup {
  name: string;
  value: number;
  children: Array<DuplicatePackage>;
}

export const extractModulesPackagesDuplicate = (_: any, currentExtractedData: any) => {
  const source: Packages = currentExtractedData?.metrics?.packages || {};

  // Group packages by name(uniq)
  const packagesByName: Record<string, DuplicatePackageGroup> = {};

  Object.entries(source).forEach(([packageId, packageData]) => {
    const { name, value } = packageData;
    const existingPackageData: DuplicatePackageGroup = packagesByName[name] || {
      name,
      value,
      children: [],
    };

    existingPackageData.children.push({ id: packageId, value });

    packagesByName[name] = existingPackageData;
  });

  // Filter, count and sum the duplicate packages
  let count = 0;
  const duplicatePackages: Array<DuplicatePackageGroup> = [];

  Object.entries(packagesByName).forEach(([packageGroupName, packageGroupData]) => {
    // Count duplicate instances (substract the initial instance)
    // example: package-a, package-b:package-a -> duplicateInstances = 1
    const duplicateInstances = packageGroupData.children.length - 1;

    // No duplicates, skip
    if (duplicateInstances === 0) {
      return;
    }

    count += duplicateInstances;

    duplicatePackages.push({
      name: packageGroupName,
      value: sum(map(packageGroupData.children, 'value')),
      children: packageGroupData.children,
    });
  });

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
    (agg, { name, ...duplicatePackageData }: DuplicatePackageGroup) => ({
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
      [packageName]: (duplicatePackageData as DuplicatePackageGroup).children.map(({ id }) => id),
    }),
    {},
  );

  return {
    insights: {
      duplicatePackages: {
        type: InsightType.WARNING,
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
