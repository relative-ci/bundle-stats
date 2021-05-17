import max from 'lodash/max';
import last from 'lodash/last';

import { PACKAGES_SEPARATOR, PACKAGE_ID_SEPARATOR } from '../../config';
import { PackageMetric, WebpackMetricsModules, WebpackMetricsPackages } from '../../constants';

const PACKAGE_NAMES = /(node_modules|~)\/((!?@(([\w|\-|_|.]*)\/){2})|(([\w|\-|_|.]*)\/))/g;

const getPackageMetaFromModulePath = (moduleName: string) => {
  const found = moduleName.match(PACKAGE_NAMES);

  if (!found) {
    return null;
  }

  const names = found.map((modulePath) => modulePath.replace(/.*(node_modules|~)\/(.*)\/$/, '$2'));
  const name = last(names);

  // get the module full path
  const pattern = new RegExp(`(.*)(${last(found)}).*`);
  const path = moduleName.replace(pattern, '$1$2').replace(/\/$/, '');

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
