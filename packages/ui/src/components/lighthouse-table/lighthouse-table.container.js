import { compose, withProps } from 'recompose';
import { get, map } from 'lodash';
import { getLighthouseMetrics, addMetricsData, mergeRunsById } from '@bundle-stats/utils';

export const enhance = compose(
  withProps(({ jobs }) => {
    const runs = jobs.map(job => ({
      meta: job,
      lighthouse: getLighthouseMetrics(get(job, 'rawData.lighthouse')),
    }));

    const items = addMetricsData(mergeRunsById(map(runs, 'lighthouse')));

    return {
      runs,
      items,
    };
  }),
);
