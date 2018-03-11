import getMeta from '../utils/get-meta';
import calculateTotals from '../utils/calculate-totals';

const createRun = (metricsMap, metaMap) => ({ res }, index) => ({
  label: `Run #${index}`,
  meta: getMeta(res, metaMap),
  data: calculateTotals(res.assets || []),
});

export default createRun;
