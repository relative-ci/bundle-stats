import util from 'util';

import { metricsMap, metaMap } from '../../../core/config/webpack';
import createRows from '../../../core/utils/rows';
import createRun from '../../../core/utils/runs/webpack/totals';
import metricsTable from '../utils/metrics-table';

const webpackTotals = (sources) => {
  const runs = sources.map(createRun(metricsMap, metaMap));
  const rows = createRows(runs);

  return metricsTable({
    rows,
    runs
  });
};

export default webpackTotals;
