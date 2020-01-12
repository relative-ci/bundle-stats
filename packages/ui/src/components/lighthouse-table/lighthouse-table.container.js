import { compose, withProps } from 'recompose';
import { get, map } from 'lodash';
import { getLighthouseMetrics, mergeMetricsByKey, addRowData } from '@bundle-stats/utils';

export const enhance = compose(
  withProps(({ jobs }) => {
    const runs = jobs.map((job) => ({
      meta: job,
      lighthouse: getLighthouseMetrics(get(job, 'rawData.lighthouse')),
    }));

    const items = mergeMetricsByKey(map(runs, 'lighthouse')).map(addRowData);

    return {
      runs,
      items,
    };
  }),
);
