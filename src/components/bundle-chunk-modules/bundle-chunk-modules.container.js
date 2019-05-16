import {
  compose, withProps, withState,
} from 'recompose';
import { get, sortBy } from 'lodash';
import { METRIC_TYPE_FILE_SIZE } from '@relative-ci/utils';

import { generateRows } from '../../utils/generate-rows';
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
const getFilterByChanged = filters => (row) => {
  if (filters.changed) {
    return row.changed;
  }

  return true;
};

export default compose(
  withProps(({ jobs }) => {
    const runs = jobs.map(getRun);
    const rows = generateRows(runs);
    return { runs, rows };
  }),
  withState('filters', 'updateFilters', ({ runs }) => ({
    changed: runs && runs.length > 1,
  })),
  withProps(({ rows, filters }) => ({
    totalRowsCount: rows.length,
    rows: sortBy(rows.filter(getFilterByChanged(filters), customSort)),
  })),
);
