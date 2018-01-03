import { ResponsiveBarCanvas } from '@nivo/bar';

import metrics from '../../../config/metrics';

const resolveChartKeys = () =>
  Object.keys(metrics.webpack)
    .filter(key => key !== 'totalSize');

const formatChartData = entries =>
  entries.map(entry => Object.assign({ label: entry.label }, entry.stats));

const TotalByTypeChart = ({ entries }) => {
  const data = formatChartData(entries);
  const keys = resolveChartKeys();

  const rootStyles = {
    width: '100%',
    height: '100%',
  };

  return (
    <div style={rootStyles}>
      <ResponsiveBarCanvas
        data={data}
        keys={keys}
        indexBy="label"
        groupMode="stacked"
        layout="horizontal"
      />
    </div>
  );
};

export default TotalByTypeChart;
