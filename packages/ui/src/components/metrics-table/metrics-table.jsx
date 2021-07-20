import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { get, isEmpty } from 'lodash';
import { flow, map, sum } from 'lodash/fp';
import { METRIC_TYPE_FILE_SIZE, getGlobalMetricType, getMetricRunInfo } from '@bundle-stats/utils';

import { Table } from '../../ui/table';
import { Metric } from '../metric';
import { Delta } from '../delta';
import { JobName } from '../job-name';
import styles from './metrics-table.module.css';

const METRIC_TYPE_DATA = getGlobalMetricType(null, METRIC_TYPE_FILE_SIZE);

const getRowsRunTotal = (rows, runIndex) =>
  flow(
    map((row) => get(row, `runs[${runIndex}].value`, 0)),
    sum,
  )(rows);

const getHeaderLabelCells = (rows) => (run, runIndex, runs) => {
  const isBaseline = runIndex === runs.length - 1;
  const className = cx(styles.value, isBaseline ? styles.baseline : styles.current);

  if (!run) {
    return [
      { children: '-', className },
      ...(!isBaseline ? [{ children: ' ', className: styles.delta }] : []),
    ];
  }

  const { label, internalBuildNumber } = run;

  const jobName = (
    <JobName
      title={runIndex === 0 ? 'Current' : 'Baseline'}
      internalBuildNumber={internalBuildNumber}
      className={styles.jobName}
    >
      {label}
    </JobName>
  );

  return [
    // Value column
    { children: jobName, className },
    // Delta column
    ...(!isBaseline ? [{ children: ' ', className: cx(styles.delta) }] : []),
  ];
};

const getHeaderTotalCells = (rows) => (run, runIndex, runs) => {
  const isBaseline = runIndex === runs.length - 1;
  const className = cx(styles.value, isBaseline ? styles.baseline : styles.current);

  const currentRunTotal = getRowsRunTotal(rows, runIndex);
  const baselineRunTotal = !isBaseline && getRowsRunTotal(rows, runIndex + 1);
  const infoTotal = getMetricRunInfo(METRIC_TYPE_DATA, currentRunTotal, baselineRunTotal);

  return [
    // Value column
    {
      children: <Metric className={styles.tableHeaderRunMetric} value={infoTotal.displayValue} />,
      className,
    },

    // Delta column
    ...(!isBaseline
      ? [
          {
            children: (
              <Delta
                displayValue={infoTotal.displayDeltaPercentage}
                deltaType={infoTotal.deltaType}
              />
            ),
            className: styles.delta,
          },
        ]
      : []),
  ];
};

const getHeaderRows = (runs, items, showHeaderSum, title) => [
  {
    className: styles.headerRowColumns,
    cells: [
      // Metric name column - one empty strying to render the column
      {
        children: title || ' ',
        className: styles.metricName,
        rowSpan: showHeaderSum ? 2 : 1,
      },

      // Runs
      ...runs.map(getHeaderLabelCells(items)).flat(),
    ],
  },
  ...(showHeaderSum
    ? [
        {
          className: styles.headerRowTotals,
          cells: runs.map(getHeaderTotalCells(items)).flat(),
        },
      ]
    : []),
];

const generateRowCells = (item, index, items) => {
  const isBaseline = index === items.length - 1;

  // eslint-disable-next-line react/destructuring-assignment
  if (!item || typeof item.value === 'undefined') {
    return ['-', ...(!isBaseline ? [''] : [])];
  }

  const { displayValue, deltaPercentage, displayDeltaPercentage, deltaType } = item;

  const cells = [<Metric value={displayValue} />];

  if (!isBaseline) {
    cells.push(
      typeof deltaPercentage === 'number' && (
        <Delta displayValue={displayDeltaPercentage} deltaType={deltaType} />
      ),
    );
  }

  return cells;
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
        ...item.runs.map(generateRowCells).flat(),
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
  const { headers, columnClassNames } = useMemo(() => {
    const headerColumns = getHeaderRows(runs, items, showHeaderSum, title);
    return {
      headers: [...headerRows, ...headerColumns],
      // First header row has the column class names
      columnClassNames: headerColumns[0].cells.map((headerColumn) => headerColumn.className),
    };
  }, [headerRows, runs, items, showHeaderSum, title]);

  const rows = useMemo(() => getRows(runs, items, renderRowHeader), [runs, items, renderRowHeader]);

  const rootClassName = cx(
    styles.root,
    className,
    runs.length > 1 && styles.multipleRuns,
    showHeaderSum && styles.showHeaderSum,
  );

  return (
    <Table className={rootClassName} compact>
      <Table.THead>
        {headers.map((headerRow) => {
          const { cells, className: rowClassName } = headerRow.cells
            ? headerRow
            : { cells: headerRow };

          return (
            <Table.Tr className={rowClassName}>
              {cells.map((header) => (
                <Table.Th {...header} />
              ))}
            </Table.Tr>
          );
        })}
      </Table.THead>
      <Table.TBody>
        {!isEmpty(rows) ? (
          rows.map(({ key, className: rowClassName, cells }) => (
            <Table.Tr key={key} className={rowClassName}>
              {cells.map((cell, index) => (
                <Table.Td className={columnClassNames[index]}>{cell}</Table.Td>
              ))}
            </Table.Tr>
          ))
        ) : (
          <Table.Tr>
            <Table.Td className={styles.empty} colSpan={columnClassNames?.length || 1}>
              {emptyMessage}
            </Table.Td>
          </Table.Tr>
        )}
      </Table.TBody>
    </Table>
  );
};

MetricsTable.defaultProps = {
  className: '',
  renderRowHeader: (item) => item.label,
  emptyMessage: 'No entries found.',
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
