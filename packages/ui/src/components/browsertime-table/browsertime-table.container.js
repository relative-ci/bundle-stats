import { compose, withProps } from 'recompose';
import { get, map } from 'lodash';
import { getBrowsertimeMetrics, addMetricsData, mergeRunsById } from '@bundle-stats/utils';

export const enhance = compose(
  withProps(({ jobs }) => {
    const runs = jobs.map(job => ({
      meta: job,
      browsertime: getBrowsertimeMetrics(get(job, 'rawData.browsertime')),
    }));

    const items = addMetricsData(mergeRunsById(map(runs, 'browsertime')));

    return {
      runs,
      items,
    };
  }),
);
