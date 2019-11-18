import { get } from 'lodash';

export const extractModulesPackagesCount = (bundleStats) => {
  const packages = get(bundleStats, 'packages', {});

  const value = Object.values(packages).length;

  return { stats: { packageCount: { value } } };
};
