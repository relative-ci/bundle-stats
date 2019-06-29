import { getStatsByMetrics } from '../get-stats-by-metrics';

const STATS = {
  groupA: {
    subgroup1: {
      metricA: {
        value: 100,
      },
      metricB: {
        value: 200,
      },
    },
  },
};

test('getStatsByMetrics', () => {
  expect(getStatsByMetrics(STATS, [])).toEqual({});
  expect(getStatsByMetrics(STATS, ['groupA.subgroup2.metricC'])).toEqual({
    'groupA.subgroup2.metricC': {
      value: 0,
    },
  });
  expect(getStatsByMetrics(STATS, ['groupA.subgroup1.metricA'])).toEqual({
    'groupA.subgroup1.metricA': {
      value: 100,
    },
  });
});
