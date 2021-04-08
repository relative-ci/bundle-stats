import max from 'lodash/max';
import last from 'lodash/last';
import uniqBy from 'lodash/uniqBy';

import { PACKAGES_SEPARATOR, PACKAGE_ID_SEPARATOR } from '../../config';
import { PackageMetric, WebpackMetricsModules, WebpackMetricsPackages } from '../../constants';

const PACKAGE_NAMES = /(node_modules|~)\/((!?@(([\w|\-|_|.]*)\/){2})|(([\w|\-|_|.]*)\/))/g;

const getPackageInfoFromModulePath = (moduleName: string) => {
  const found = moduleName.match(PACKAGE_NAMES);

  if (!found) {
    return null;
  }

  const names = found.map((modulePath) => modulePath.replace(/.*(node_modules|~)\/(.*)\/$/, '$2'));

  // get the module full path
  const pattern = new RegExp(`(.*)(${last(found)}).*`);
  const path = moduleName.replace(pattern, '$1$2').replace(/\/$/, '');

  return {
    name: names.join(PACKAGES_SEPARATOR),
    path,
  };
};

export const extractModulesPackages = (
  webpackStats?: any,
  currentExtractedData?: WebpackMetricsModules
): WebpackMetricsPackages => {
  const modulesByChunks = currentExtractedData?.metrics?.modules || {};

  // Flatten all modules across chunks and filter duplicates
  const modules = uniqBy(
    Object.values(modulesByChunks).map((chunk) => Object.entries(chunk.modules)).flat(),
    ([id]) => id,
  );

  const packages = modules.reduce(
    (agg, [modulePath, { value }]) => {
      const packageInfo = getPackageInfoFromModulePath(modulePath);

      if (!packageInfo) {
        return agg;
      }

      const existingPackageData = agg[packageInfo.name];

      // New package data
      if (!existingPackageData) {
        return {
          ...agg,
          [packageInfo.name]: {
            path: packageInfo.path,
            value,
          }
        };
      }

      // Existing package info
      if (existingPackageData.path === packageInfo.path) {
        return {
          ...agg,
          [packageInfo.name]: {
            ...existingPackageData,
            value: existingPackageData.value + value,
          },
        };
      }

      // Same package name, but different paths (eg: symlinks)
      const existingPackageWithEqualPath = Object.entries(agg).find(
        ([_, packageData]) => packageData.path === packageInfo.path,
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
      const lastIndex = max(Object.keys(agg)
        .map((name) => name.split('~'))
        .filter(([name]) => name === packageInfo.name)
        .map(([_, index]) => parseInt(index, 10))) || 0;

      const packageName = [packageInfo.name, lastIndex + 1].join(PACKAGE_ID_SEPARATOR);

      return {
        ...agg,
        [packageName]: {
          path: packageInfo.path,
          value,
        },
      };
    },
    {} as Record<string, PackageMetric>,
  );

  return { metrics: { packages } };
};
