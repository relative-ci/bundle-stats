import uniqBy from 'lodash/uniqBy';

import { PACKAGES_SEPARATOR } from '../../config';
import { Metric, WebpackMetricsModules, WebpackMetricsPackages } from '../../constants';

const PACKAGE_NAMES = /(node_modules|~)\/((!?@(([\w|\-|_|.]*)\/){2})|(([\w|\-|_|.]*)\/))/g;

const getPackageNameFromModulePath = (moduleName: string) => {
  const found = moduleName.match(PACKAGE_NAMES);

  if (!found) {
    return '';
  }

  const names = found.map((modulePath) => modulePath.replace(/.*(node_modules|~)\/(.*)\/$/, '$2'));

  return names.join(PACKAGES_SEPARATOR);
};

export const extractModulesPackages = (
  webpackStats?: any,
  currentExtractedData?: WebpackMetricsModules
): WebpackMetricsPackages => {
  const modulesByChunks = currentExtractedData?.metrics?.modules || {};

  // Flatten all modules across chunks and filter duplicates
  const modules = uniqBy(
    Object.values(modulesByChunks).map(({ modules = {} }) => Object.entries(modules)).flat(),
    ([ id ]) => id,
  );

  const packages = modules.reduce(
    (agg, [modulePath, { value }]) => {
      const packageName = getPackageNameFromModulePath(modulePath);

      if (!packageName) {
        return agg;
      }

      return {
        ...agg,
        [packageName]: {
          value: (agg[packageName]?.value || 0) + value,
        },
      };
    },
    {} as Record<string, Metric>,
  );

  return { metrics: { packages } };
};
