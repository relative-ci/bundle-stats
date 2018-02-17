import PropTypes from 'prop-types';

import { getMetric } from '../../config/metrics';
import Metric from '../metric';
import Delta from '../delta';
import Table from '../table';
import styles from './styles.css';

const generateHeaderCell = run => ({
  text: run.label,
  options: {
    classNames: styles.value,
  },
});

const getHeaders = runs => [
  // Metric name column
  {
    text: '',
    options: {
      classNames: styles.metricName,
    },
  },

  // Runs
  ...runs.map(generateHeaderCell),
];

const generateRowCells = metric => (run, index) => {
  const delta = index !== 0 && (
    <Delta
      value={run.delta}
      displayValue={run.displayDelta}
      biggerIsBetter={metric.biggerIsBetter}
    />
  );

  const displayValue = run.value ? (
    <Metric value={run.value} formatter={metric.formatter}>
      {delta}
    </Metric>
  ) : '-';

  return displayValue;
};

const getRows = rows => rows.map(({ key, changed, runs }) => {
  const metric = getMetric(key);

  return {
    options: {
      classNames: changed ? '' : styles.unchanged,
    },
    cells: [
      // Metric name
      metric.label,

      // Metric run values
      ...runs.map(generateRowCells(metric)),
    ],
  };
});

const MetricsTable = ({ runs, rows }) => (
  <Table
    headers={getHeaders(runs)}
    rows={getRows(rows)}
  />
);

MetricsTable.propTypes = {
  runs: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  rows: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default MetricsTable;
