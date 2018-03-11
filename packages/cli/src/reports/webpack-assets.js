import util from 'util';

import { metricsMap, metaMap } from '../../../core/config/webpack';
import createRows from '../../../core/utils/rows';
import createRun from '../../../core/utils/runs/webpack/assets';
import metricsTable from '../utils/metrics-table';

const filterByState = ({ showAll }) => ({ changed }) => showAll || changed;

const webpackAssets = options => (sources) => {
  const runs = sources.map(createRun(metricsMap, metaMap));
  const rows = createRows(runs).filter(filterByState(options));

  return metricsTable({
    rows,
    runs,
  });
};

export default webpackAssets;
