import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getMetric } from '@relative-ci/utils';

import { Metric } from '../metric';
import { Delta } from '../delta';
import { Table } from '../table';
import styles from './metrics-table.css';

const generateHeaderCell = (run, index) => ({
  text: run.label,
  options: {
    classNames: cx(styles.value, index ? styles.baseline : styles.current),
  },
});

const getHeaders = runs => [
  // Metric name column - one empty strying to render the column
  {
    text: ' ',
    options: {
      classNames: styles.metricName,
    },
  },

  // Runs
  ...runs.map(generateHeaderCell),
];

const generateRowCells = metric => (run) => {
  if (!run.value) {
    return '-';
  }

  return (
    <Metric value={run.value} formatter={metric.formatter}>
      {run.delta ? (
        <Delta
          value={run.delta}
          displayValue={run.displayDelta}
          biggerIsBetter={metric.biggerIsBetter}
        />
      ) : null}
    </Metric>
  );
};

const getRows = (rows, renderRowHeader) => rows.map((row) => {
  const {
    key,
    type,
    changed,
    runs,
  } = row;
  const metric = getMetric(key, type);

  return {
    options: {
      classNames: changed ? '' : styles.unchanged,
    },
    cells: [
      // Metric name
      renderRowHeader(metric, row),

      // Metric run values
      ...runs.map(generateRowCells(metric)),
    ],
  };
});

export const MetricsTable = ({
  className, renderRowHeader, runs, rows,
}) => (
  <Table
    className={className}
    headers={getHeaders(runs)}
    rows={getRows(rows, renderRowHeader)}
  />
);

MetricsTable.defaultProps = {
  className: '',
  renderRowHeader: row => row.label,
};

MetricsTable.propTypes = {
  className: PropTypes.string,
  renderRowHeader: PropTypes.func,
  runs: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  rows: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
