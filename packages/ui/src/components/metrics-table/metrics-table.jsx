import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';
import sum from 'lodash/sum';
import { METRIC_TYPE_FILE_SIZE, getGlobalMetricType, getMetricRunInfo } from '@bundle-stats/utils';

import { Table } from '../../ui/table';
import { Metric } from '../metric';
import { Delta } from '../delta';
import { JobName } from '../job-name';
import styles from './metrics-table.module.css';

const METRIC_TYPE_DATA = getGlobalMetricType(null, METRIC_TYPE_FILE_SIZE);
const VISIBLE_COUNT = 500;

const getRowsRunTotal = (rows, runIndex) => sum(rows.map((row) => row?.runs?.[runIndex]?.value || 0));

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

const MetricsTableRow = ({ item, renderRowHeader }) => (
  <Table.Tr className={cx(!item.changed && styles.unchanged)}>
    <Table.Th className={styles.metricName}>{renderRowHeader(item)}</Table.Th>

    {item.runs.map((run, index) => {
      const isBaseline = index === item.runs.length - 1;
      const valueClassName = cx(styles.value, !isBaseline && styles.current);

      // Empty cells if no value
      if (!run || typeof run.value === 'undefined') {
        return (
          <>
            <Table.Td className={valueClassName}>-</Table.Td>
            {!isBaseline && <Table.Td className={styles.delta} />}
          </>
        );
      }

      const { displayValue, deltaPercentage, displayDeltaPercentage, deltaType } = run;

      return (
        <>
          <Table.Td className={valueClassName}>
            <Metric value={displayValue} />
          </Table.Td>
          {!isBaseline && typeof deltaPercentage === 'number' && (
            <Table.Td className={styles.delta}>
              <Delta displayValue={displayDeltaPercentage} deltaType={deltaType} />
            </Table.Td>
          )}
        </>
      );
    })}
  </Table.Tr>
);

MetricsTableRow.propTypes = {
  item: PropTypes.shape({
    changed: PropTypes.bool,
    runs: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number,
        displayValue: PropTypes.string,
        deltaPercentage: PropTypes.number,
        displayDeltaPercentage: PropTypes.string,
        deltaType: PropTypes.string,
      }),
    ),
  }).isRequired,
  renderRowHeader: PropTypes.func.isRequired,
};

export const MetricsTable = ({
  className,
  renderRowHeader,
  runs,
  items,
  emptyMessage,
  showHeaderSum,
  headerRows,
  title,
  showAllItems,
  setShowAllItems,
  ...restProps
}) => {
  const { headers, columnClassNames } = useMemo(() => {
    const headerColumns = getHeaderRows(runs, items, showHeaderSum, title);

    return {
      headers: [...headerRows, ...headerColumns],
      // First header row has the column class names
      columnClassNames: headerColumns[0].cells.map((headerColumn) => headerColumn.className),
    };
  }, [headerRows, runs, items, showHeaderSum, title]);

  const rootClassName = cx(
    styles.root,
    className,
    runs.length > 1 && styles.multipleRuns,
    showHeaderSum && styles.showHeaderSum,
  );

  const showEmpty = isEmpty(items);
  const showItems = !showEmpty;
  const hasHiddenItems = items?.length > VISIBLE_COUNT;
  const visibleItems = !hasHiddenItems || showAllItems ? items : items?.slice(0, VISIBLE_COUNT);

  return (
    <Table className={rootClassName} compact {...restProps}>
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
        {showEmpty && (
          <Table.Tr>
            <Table.Td className={styles.empty} colSpan={columnClassNames?.length || 1}>
              {emptyMessage}
            </Table.Td>
          </Table.Tr>
        )}

        {showItems && (
          <>
            {visibleItems.map((item) => (
              <MetricsTableRow key={item.key} item={item} renderRowHeader={renderRowHeader} />
            ))}

            {hasHiddenItems && (
              <Table.Tr>
                <Table.Td className={styles.showAllItems} colSpan={columnClassNames?.length || 1}>
                  {showAllItems ? (
                      <button
                        onClick={() => setShowAllItems(false)}
                        type="button"
                        className={styles.showAllItemsButton}
                      >
                        Show less
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowAllItems(true)}
                        type="button"
                        className={styles.showAllItemsButton}
                      >
                        Show all
                      </button>
                    )
                  }
                </Table.Td>
              </Table.Tr>
            )}
          </>
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
