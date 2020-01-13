import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Table } from '../../ui/table';
import { Metric } from '../metric';
import { Delta } from '../delta';
import styles from './metrics-table.module.css';

const generateHeaderCell = (item, index, runs) => ({
  children: (item && item.label)
    || (item && item.meta && item.meta.internalBuildNumber && `Run #${item.meta.internalBuildNumber}`)
    || (item && `Run #${runs.length - index}`)
    || '-',
  className: cx(styles.value, index ? styles.baseline : styles.current),
});

const getHeaders = (runs) => [
  // Metric name column - one empty strying to render the column
  {
    children: ' ',
    className: styles.metricName,
  },

  // Runs
  ...runs.map(generateHeaderCell),
];

const generateRowCell = () => (item) => {
  if (!item || typeof item.value === 'undefined') {
    return '-';
  }

  const {
    displayValue, deltaPercentage, displayDeltaPercentage, deltaType,
  } = item;

  return (
    <Metric value={displayValue}>
      {deltaPercentage ? (
        <Delta
          displayValue={displayDeltaPercentage}
          deltaType={deltaType}
        />
      ) : null}
    </Metric>
  );
};

const getRows = (runs, items, renderRowHeader) => items.map((item) => {
  const { changed } = item;

  return {
    className: changed ? '' : styles.unchanged,
    cells: [
      // Metric name
      renderRowHeader(item),

      // Metric item values
      ...item.runs.map(generateRowCell()),
    ],
  };
});

export const MetricsTable = ({
  className, renderRowHeader, runs, items, emptyMessage,
}) => (
  <Table
    className={cx(styles.root, className, (runs.length > 1) && styles.multipleRuns)}
    headers={getHeaders(runs)}
    rows={getRows(runs, items, renderRowHeader)}
    emptyMessage={emptyMessage}
  />
);

MetricsTable.defaultProps = {
  className: '',
  renderRowHeader: (item) => item.label,
  emptyMessage: undefined,
};

MetricsTable.propTypes = {
  className: PropTypes.string,
  renderRowHeader: PropTypes.func,
  runs: PropTypes.arrayOf(PropTypes.shape({
    internalBuildNumber: PropTypes.number,
  })).isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    label: PropTypes.string,
    runs: PropTypes.arrayOf(PropTypes.shape({
      displayValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      displayDelta: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })),
  })).isRequired,
  emptyMessage: PropTypes.element,
};
