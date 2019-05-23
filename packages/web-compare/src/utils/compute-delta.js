import { merge } from 'lodash';
import { getDelta, formatDelta } from '@bundle-stats/utils';

const getRunsDelta = runs => runs.reduce((aggregator, run, index) => {
  const deltaInfo = {};

  if (index > 0) {
    deltaInfo.delta = getDelta(runs[index - 1], run);
    deltaInfo.displayDelta = formatDelta(deltaInfo.delta);
  }

  return [
    ...aggregator,
    merge(
      run,
      deltaInfo,
    ),
  ];
}, []);

const computeDelta = metrics => metrics.map(({ runs, ...restProps }) => ({
  ...restProps,
  runs: getRunsDelta(runs),
}));

export default computeDelta;
