import max from 'lodash/max';
import last from 'lodash/last';
import isEmpty from 'lodash/isEmpty';

import { PACKAGES_SEPARATOR, PACKAGE_ID_SEPARATOR } from '../../config';
import { Package, MetricsModules, MetricsPackages } from '../types';
import { MODULE_PATH_PACKAGES, PACKAGE_PATH_NAME } from '../constants';

const uniqLast = (data: Array<unknown>) => {
  const res: Array<unknown> = [];

  data.forEach((item, index) => {
    if (!data.slice(index + 1).includes(item)) {
      res.push(item);
    }
  });

  return res;
};

/**
 * Heuristics to extract package id, name, and path from a module path
 */
export const getPackageMetaFromModulePath = (modulePath: string) => {
  const paths = modulePath.match(MODULE_PATH_PACKAGES);

  // No package paths found, skip
  if (!paths) {
    return null;
  }

  // Extract package names from module path
  // @NOTE check for uniq for pnpm cases
  const names = uniqLast(
    paths
      .map((packagePath) => {
        // @ts-ignore
        const found = packagePath.matchAll(PACKAGE_PATH_NAME);

        if (!found) {
          return [];
        }

        return [...found].flat().slice(1).filter(Boolean).map((name) => name.replace(/\+/g, '/'));
      })
      .flat(),
  );

  // If no names, skip
  if (isEmpty(names)) {
    return null;
  }

  const name = last(names) as string;

  // Get package full path
  // @NOTE use the last path to prevent getting incorrect results on packages with similar names
  const pattern = new RegExp(`(.*)(${last(paths)}).*`);
  const path = modulePath.replace(pattern, '$1$2').replace(/\/$/, '');

  return {
    id: names.join(PACKAGES_SEPARATOR),
    name,
    path,
  };
};

export const extractModulesPackages = (
  _?: unknown,
  currentExtractedData?: MetricsModules,
): MetricsPackages => {
  const modules = Object.entries(currentExtractedData?.metrics?.modules || {});

  const packages = modules.reduce((agg, [modulePath, { value }]) => {
    const packageMeta = getPackageMetaFromModulePath(modulePath);

    if (!packageMeta) {
      return agg;
    }

    const existingPackageData = agg[packageMeta.id];

    // New package data
    if (!existingPackageData) {
      return {
        ...agg,
        [packageMeta.id]: {
          name: packageMeta.name,
          path: packageMeta.path,
          value,
        },
      };
    }

    // Existing package info
    if (existingPackageData.path === packageMeta.path) {
      return {
        ...agg,
        [packageMeta.id]: {
          ...existingPackageData,
          value: existingPackageData.value + value,
        },
      };
    }

    // Same package name, but different paths (eg: symlinks)
    const existingPackageWithEqualPath = Object.entries(agg).find(
      ([__, packageData]) => packageData.path === packageMeta.path,
    );

    if (existingPackageWithEqualPath) {
      const [name, data] = existingPackageWithEqualPath;

      return {
        ...agg,
        [name]: {
          ...data,
          value: data.value + value,
        },
      };
    }

    // New package name & data
    const lastIndex = max(
      Object.keys(agg)
        .map((id) => id.split('~'))
        .filter(([id]) => id === packageMeta.id)
        .map(([__, index]) => parseInt(index, 10)),
    ) || 0;

    const packageName = [packageMeta.id, lastIndex + 1].join(PACKAGE_ID_SEPARATOR);

    return {
      ...agg,
      [packageName]: {
        name: packageMeta.name,
        path: packageMeta.path,
        value,
      },
    };
  }, {} as Record<string, Package>);

  return { metrics: { packages } };
};
