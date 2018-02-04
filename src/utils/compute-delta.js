import { merge, round } from 'lodash';

const getDelta = (baseline, current) => {
  const baselineValue = (baseline && baseline.value) || 0;
  const currentValue = (current && current.value) || 0;

  if (baselineValue === currentValue) {
    return 0;
  }

  if (baselineValue === 0) {
    return 100;
  }

  const change = currentValue / baselineValue * 100; // eslint-disable-line no-mixed-operators

  return round(change - 100, 2);
};

const formatDelta = (value) => {
  const sign = value >= 0 ? '+' : '';

  return `${sign}${value}%`;
};

const getRunsDelta = runs =>
  runs.reduce((aggregator, run, index) => {
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

const computeDelta = metrics =>
  metrics.map(({ runs, ...restProps }) => ({
    ...restProps,
    runs: getRunsDelta(runs),
  }));

export default computeDelta;
