import {
  compose,
  withProps,
} from 'recompose';

import {
  metricsMap,
  metaMap,
} from '../../../../core/config/webpack';
import createTotalsRun from '../../../../core/utils/runs/webpack/totals';
import createAssetsRun from '../../../../core/utils/runs/webpack/assets';
import withSources from '../../hocs/with-sources';

const createAssets = sources =>
  sources.map(({ loading, error, res }, index) => {
    if (loading || error) {
      return {};
    }

    return createAssetsRun(metricsMap, metaMap)({ res }, index);
  });

const createTotalByType = sources =>
  sources.map(({ loading, error, res }, index) => {
    if (loading || error) {
      return {};
    }

    return createTotalsRun(metricsMap, metaMap)({ res }, index);
  });

const enhance = compose(
  withSources(),
  withProps(({ sources }) => ({
    assets: createAssets(sources),
    totalByType: createTotalByType(sources),
  })),
);

export default enhance;
