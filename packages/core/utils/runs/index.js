import getMetrics from './utils/get-metrics';
import getMeta from './utils/get-meta';

const createRun = (metricsMap, metaMap) => (source, index) => ({
  label: `Run #${index}`,
  meta: getMeta(source.res, metaMap),
  data: getMetrics(source.res, metricsMap),
});

export default createRun;
