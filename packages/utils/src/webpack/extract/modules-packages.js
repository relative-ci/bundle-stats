import { get, uniqBy } from 'lodash';

import { PACKAGES_SEPARATOR } from '../../config';
import { getModuleName } from '../utils';

const PACKAGE_NAMES = /(node_modules|~)\/((!?@(([\w|\-|_|.]*)\/){2})|(([\w|\-|_|.]*)\/))/g;

const getPackageName = (moduleName) => {
  const found = moduleName.match(PACKAGE_NAMES);

  if (!found) {
    return '';
  }

  const names = found.map((modulePath) => modulePath.replace(/.*(node_modules|~)\/(.*)\/$/, '$2'));

  return names.join(PACKAGES_SEPARATOR);
};

export const extractModulesPackages = (webpackStats, currentExtractedData) => {
  const modulesByChunks = get(currentExtractedData, 'metrics.modules', {});

  const modules = uniqBy(Object.values(modulesByChunks).map((chunk) => {
    const chunkModules = get(chunk, 'modules', {});
    return Object.values(chunkModules);
  }).flat(), ({ name }) => name);

  const packages = modules.reduce((agg, { name: moduleName, value }) => {
    const packageName = getPackageName(getModuleName(moduleName));

    if (!packageName) {
      return agg;
    }

    const packageValue = get(agg, [packageName, 'value'], 0);

    return {
      ...agg,
      [packageName]: {
        value: packageValue + value,
      },
    };
  }, {});

  return { metrics: { packages } };
};
