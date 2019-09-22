import { uniq } from 'lodash';

export const countModulesBundleTransform = (bundleStats = {}) => {
  const { modules = {} } = bundleStats;

  const value = uniq(Object.values(modules).map(
    ({ modules: chunkModules }) => Object.values(chunkModules),
  ).flat().map(({ name }) => name)).length;

  return {
    stats: {
      moduleCount: {
        value,
      },
    },
  };
};
