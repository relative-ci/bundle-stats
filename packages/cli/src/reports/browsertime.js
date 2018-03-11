import util from 'util';

import createRun from '../../../core/utils/runs';
import createRows from '../../../core/utils/rows';
import { metricsMap, metaMap } from '../../../core/config/browserime';
import metricsTable from '../utils/metrics-table';

const browsertime = (sources) => {
  const runs = sources.map(createRun(metricsMap, metaMap));
  const rows = createRows(runs);

  return metricsTable({
    rows,
    runs
  });
};

export default browsertime;
