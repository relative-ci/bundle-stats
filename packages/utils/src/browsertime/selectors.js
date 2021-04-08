import get from 'lodash/get';

export const selectors = (job) => {
  const data = get(job, 'metrics.browsertime', {});

  return Object.entries(data).reduce((agg, [key, value]) => ({
    ...agg,
    [`browsertime.${key}`]: value,
  }), {});
};
