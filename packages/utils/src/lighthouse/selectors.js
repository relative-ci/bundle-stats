import get from 'lodash/get';

export const selectors = (job) => {
  const data = get(job, 'metrics.lighthouse', {});

  return Object.entries(data).reduce((agg, [key, value]) => ({
    ...agg,
    [`lighthouse.${key}`]: value,
  }), {});
};
