import get from 'lodash/get';

export const extractModulesCount = (webpackStats, currentExtractedData = {}) => {
  const modules = get(currentExtractedData, 'metrics.modules', {});
  const value = Object.values(modules).length || 0;

  return { metrics: { moduleCount: { value } } };
};
