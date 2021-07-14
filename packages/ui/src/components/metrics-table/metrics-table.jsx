import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Table } from '../../ui/table';
import { Metric } from '../metric';
import { Delta } from '../delta';
import { JobName } from '../job-name';
import { RunLabelSum } from '../run-label-sum';
import styles from './metrics-table.module.css';

const getHeaderCell = (items, showHeaderSum) => (run, index, runs) => {
  const className = cx(styles.value, index ? styles.baseline : styles.current);

  if (!run) {
    return {
      children: '-',
      className,
    };
  }

  const { label, internalBuildNumber } = run;

  const jobName = (
    <JobName
      title={index === 0 ? 'Current' : 'Baseline'}
      internalBuildNumber={internalBuildNumber}
      className={styles.jobName}
    >
      {label}
    </JobName>
  );

  return {
    children: showHeaderSum ? (
      <div className={styles.tableHeaderRun}>
        {jobName}
        <RunLabelSum
          className={styles.tableHeaderRunMetric}
          runIndex={index}
          runCount={runs.length}
          rows={items}
        />
      </div>
    ) : (
      jobName
    ),
    className,
  };
};

const getHeaders = (runs, items, showHeaderSum, title) => [
  // Metric name column - one empty strying to render the column
  {
    children: title || ' ',
    className: styles.metricName,
  },

  // Runs
  ...runs.map(getHeaderCell(items, showHeaderSum)),
];

const generateRowCell = () => (item) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (!item || typeof item.value === 'undefined') {
    return '-';
  }

  const { displayValue, deltaPercentage, displayDeltaPercentage, deltaType } = item;

  return (
    <Metric value={displayValue} anchored>
      {typeof deltaPercentage === 'number' && (
        <Delta displayValue={displayDeltaPercentage} deltaType={deltaType} />
      )}
    </Metric>
  );
};

const getRows = (runs, items, renderRowHeader) =>
  items.map((item, index) => {
    const { changed } = item;

    return {
      key: item?.key || index,
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
  className,
  renderRowHeader,
  runs,
  items,
  emptyMessage,
  showHeaderSum,
  headerRows,
  title,
}) => {
  const headers = useMemo(
    () => [...headerRows, getHeaders(runs, items, showHeaderSum, title)],
    [headerRows, runs, items, showHeaderSum, title],
  );
  const rows = useMemo(() => getRows(runs, items, renderRowHeader), [runs, items, renderRowHeader]);

  const headerColumns = useMemo(() => headers[headers.length - 1], headers);

  return (
    <Table
      className={cx(styles.root, className, runs.length > 1 && styles.multipleRuns)}
      emptyMessage={emptyMessage}
    >
      <Table.THead>
        {headers.map((headerRow) => (
          <Table.Tr>
            {headerRow.map((header) => (
              <Table.Th {...header} />
            ))}
          </Table.Tr>
        ))}
      </Table.THead>
      <Table.TBody>
        {rows.map(({ key, className: rowClassName, cells }) => (
          <Table.Tr key={key} className={rowClassName}>
            {cells.map((cell, index) => (
              <Table.Td className={headerColumns[index]?.className}>{cell}</Table.Td>
            ))}
          </Table.Tr>
        ))}
      </Table.TBody>
    </Table>
  );
};

MetricsTable.defaultProps = {
  className: '',
  renderRowHeader: (item) => item.label,
  emptyMessage: undefined,
  showHeaderSum: false,
  headerRows: [],
  title: '',
};

MetricsTable.propTypes = {
  className: PropTypes.string,
  renderRowHeader: PropTypes.func,
  runs: PropTypes.arrayOf(
    PropTypes.shape({
      internalBuildNumber: PropTypes.number,
    }),
  ).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
      runs: PropTypes.arrayOf(
        PropTypes.shape({
          displayValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
          displayDelta: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        }),
      ),
    }),
  ).isRequired,
  emptyMessage: PropTypes.element,
  showHeaderSum: PropTypes.bool,
  headerRows: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.shape({
          children: PropTypes.node,
        }),
      ]),
    ),
  ),
  title: PropTypes.element,
};
