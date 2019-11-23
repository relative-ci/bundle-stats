import { get } from 'lodash';

export const extractModulesPackagesCount = (webpackStats, currentExtractedData) => {
  const packages = get(currentExtractedData, 'metrics.packages', {});

  const value = Object.values(packages).length;

  return { metrics: { packageCount: { value } } };
};
