import last from 'lodash/last';
import uniqBy from 'lodash/uniqBy';

import { PACKAGES_SEPARATOR } from '../../config';
import { Metric, WebpackMetricsModules, WebpackMetricsPackages } from '../../constants';

const PACKAGE_NAMES = /(node_modules|~)\/((!?@(([\w|\-|_|.]*)\/){2})|(([\w|\-|_|.]*)\/))/g;

const getPackageInfoFromModulePath = (moduleName: string) => {
  const found = moduleName.match(PACKAGE_NAMES);

  if (!found) {
    return;
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
    Object.values(modulesByChunks).map(({ modules = {} }) => Object.entries(modules)).flat(),
    ([ id ]) => id,
  );

  const packages = modules.reduce(
    (agg, [modulePath, { value }]) => {
      const packageInfo = getPackageInfoFromModulePath(modulePath);

      if (!packageInfo) {
        return agg;
      }

      return {
        ...agg,
        [packageInfo.name]: {
          path: packageInfo.path,
          value: (agg[packageInfo.name]?.value || 0) + value,
        },
      };
    },
    {} as Record<string, Metric>,
  );

  return { metrics: { packages } };
};
