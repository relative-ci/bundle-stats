import { uniq } from 'lodash';

export const countModulesTransform = (bundleStats = {}) => {
  const { modules = {} } = bundleStats;

  const modulesCount = uniq(Object.values(modules).map(
    ({ modules: chunkModules }) => Object.values(chunkModules),
  ).flat().map(({ name }) => name)).length;

  return {
    stats: {
      modulesCount,
    },
  };
};
