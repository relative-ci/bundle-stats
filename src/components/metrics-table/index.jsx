import PropTypes from 'prop-types';
import { flatten } from 'lodash';

import { getMetric } from '../../config/metrics';
import Metric from '../metric';
import Delta from '../delta';
import Table from '../table';
import styles from './styles.css';

const generateHeaderCell = (run, index) => [
  {
    text: run.label,
    options: {
      classNames: styles.value,
    },
  },
  index > 0 && {
    options: {
      classNames: styles.delta,
    },
  },
].filter(i => i);

const getHeaders = runs => [
  // Metric name column
  {
    text: '',
    options: {
      classNames: styles.metricName,
    },
  },

  // Runs
  ...flatten(runs.map(generateHeaderCell)),
];

const generateRowCells = metric => (run, index) => {
  const displayValue = run.value ?
    <Metric value={run.value} formatter={metric.formatter} /> :
    '-';

  return [
    displayValue,
    index !== 0 && (
      <Delta
        value={run.delta}
        displayValue={run.displayDelta}
        biggerIsBetter={metric.biggerIsBetter}
      />
    ),
  ].filter(i => i);
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

      ...flatten(runs.map(generateRowCells(metric))),
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
