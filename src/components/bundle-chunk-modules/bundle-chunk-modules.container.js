import {
  compose, mapProps, withProps, withState,
} from 'recompose';
import { get, sortBy } from 'lodash';
import { METRIC_TYPE_FILE_SIZE } from '@relative-ci/utils';

import withMetrics from '../../hocs/with-metrics';
import getWebpackAssetsById from '../bundle-assets/utils/get-assets-by-id';

const getModulesRunData = (job) => {
  if (!job) {
    return [];
  }

  const modules = get(job, 'modules', []);

  return modules.map(moduleEntry => ({
    ...moduleEntry,
    type: METRIC_TYPE_FILE_SIZE,
  }));
};

const getRun = job => ({
  data: getWebpackAssetsById(getModulesRunData(job)),
  meta: job,
});

const customSort = item => [!item.changed, item.key];

export default compose(
  mapProps(({ jobs, ...restProps }) => ({
    ...restProps,
    runs: jobs.map(getRun),
  })),
  withMetrics(),

  withState('filters', 'updateFilters', {
    changed: true,
  }),
  withProps(({ rows, filters }) => ({
    totalRowsCount: rows.length,
    rows: rows.filter((row) => {
      if (filters.changed) {
        return row.changed;
      }

      return true;
    }),
  })),
  withProps(({ rows }) => ({
    rows: sortBy(rows, customSort),
  })),
);
