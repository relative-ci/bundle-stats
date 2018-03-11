import { METRIC_TYPE_FILE_SIZE } from '../../../config/metrics';
import getMeta from '../utils/get-meta';
import getAssetsById from './utils/get-assets-by-id';

const createRun = (metricsMap, metaMap) => ({ res }, index) => {
  const assets = (res.assets || []).map(asset => ({
    ...asset,
    type: METRIC_TYPE_FILE_SIZE,
  }));

  return {
    label: `Run #${index}`,
    meta: getMeta(res, metaMap),
    data: getAssetsById(assets),
  };
};

export default createRun;
