import util from 'util';
import fse from 'fs-extra';
import render from 'preact-render-to-string';

import createRun from '../../core/utils/runs';
import createRows from '../../core/utils/rows';
import MetricsTable from './browsertime.component';

const metricsMap = {
  'browsertime.firstPaint': 'statistics.timings.firstPaint.median',
  'browsertime.fullyLoaded': 'statistics.timings.fullyLoaded.median',
};

const metaMap = {
  connectivity: 'info.connectivity.profile',
};

const webpackTotals = (entries) => {
  console.log(entries);

  const sources = entries.map(entry => ({
    res: fse.readJsonSync(entry)
  }));

  const runs = sources.map(createRun(metricsMap, metaMap));

  const rows = createRows(runs);

  const html = render(MetricsTable({
    runs,
    rows
  }));

  console.log(html);
};

export default webpackTotals;
