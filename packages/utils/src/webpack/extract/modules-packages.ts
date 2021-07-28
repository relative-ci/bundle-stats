import max from 'lodash/max';
import last from 'lodash/last';

import { PACKAGES_SEPARATOR, PACKAGE_ID_SEPARATOR } from '../../config';
import { PackageMetric, WebpackMetricsModules, WebpackMetricsPackages } from '../../constants';
import { MODULE_PATH_PACKAGES } from '../constants';

const PACKAGE_PATH_REPLACE = /.*(node_modules|~)\/(.*)\/$/;

/**
 * Heuristics to extract package id, name, and path from a module path
 */
export const getPackageMetaFromModulePath = (modulePath: string) => {
  const paths = modulePath.match(MODULE_PATH_PACKAGES);

  if (!paths) {
    return null;
  }

  const names = paths.map((packagePath) => packagePath.replace(PACKAGE_PATH_REPLACE, '$2'));
  const name = last(names);

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
  webpackStats?: any,
  currentExtractedData?: WebpackMetricsModules,
): WebpackMetricsPackages => {
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
      ([_, packageData]) => packageData.path === packageMeta.path,
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
        .map(([_, index]) => parseInt(index, 10)),
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
  }, {} as Record<string, PackageMetric>);

  return { metrics: { packages } };
};
