import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';
import sum from 'lodash/sum';
import { MetricTypes, getGlobalMetricType, getMetricRunInfo } from '@bundle-stats/utils';

import { Icon } from '../../ui/icon';
import { Table } from '../../ui/table';
import { Stack } from '../../layout/stack';
import { Metric } from '../metric';
import { Delta } from '../delta';
import { JobName } from '../job-name';
import { SortButton } from '../sort-button';
import styles from './metrics-table.module.css';

const METRIC_TYPE_DATA = getGlobalMetricType(null, MetricTypes.FileSize);
const VISIBLE_COUNT = 500;
const BASELINE_COLUMN_SPAN = 1;
const CURRENT_COLUMN_SPAN = 3;
const BASELINE_TITLE = 'Baseline';
const CURRENT_TITLE = 'Current';

const getRowsRunTotal = (rows, runIndex) =>
  sum(rows.map((row) => row?.runs?.[runIndex]?.value || 0));

const ColumnJob = ({ run, isBaseline }) => {
  const colSpan = isBaseline ? BASELINE_COLUMN_SPAN : CURRENT_COLUMN_SPAN;

  if (!run) {
    return <Table.Th colSpan={colSpan}>-</Table.Th>;
  }

  const { label, internalBuildNumber } = run;

  return (
    <Table.Th className={styles.job} colSpan={colSpan}>
      <JobName
        title={isBaseline ? BASELINE_TITLE : CURRENT_TITLE}
        internalBuildNumber={internalBuildNumber}
        className={styles.jobName}
      >
        {label}
      </JobName>
    </Table.Th>
  );
};

const ColumnSum = ({ rows, isBaseline, runIndex, updateSort, sort }) => {
  const currentRunTotal = getRowsRunTotal(rows, runIndex);
  const baselineRunTotal = !isBaseline && getRowsRunTotal(rows, runIndex + 1);
  const infoTotal = getMetricRunInfo(METRIC_TYPE_DATA, currentRunTotal, baselineRunTotal);
  const fieldPath = `runs[${runIndex}]`;

  return (
    <>
      <Table.Th className={cx(styles.value, styles.sum)}>
        <SortButton
          fieldPath={fieldPath}
          fieldName="value"
          label="absolute value"
          updateSort={updateSort}
          sort={sort}
        >
          <Metric value={infoTotal.displayValue} />
        </SortButton>
      </Table.Th>
      {!isBaseline && (
        <>
          <Table.Th className={cx(styles.delta, styles.sum)}>
            <SortButton
              fieldPath={fieldPath}
              fieldName="delta"
              label="absolute change"
              updateSort={updateSort}
              sort={sort}
            >
              <Delta displayValue={infoTotal.displayDelta} deltaType={infoTotal.deltaType} />
            </SortButton>
          </Table.Th>
          <Table.Th className={cx(styles.delta, styles.deltaPercentage, styles.sum)}>
            <SortButton
              fieldPath={fieldPath}
              fieldName="deltaPercentage"
              label="absolute percentual change"
              updateSort={updateSort}
              sort={sort}
            >
              <Delta
                displayValue={infoTotal.displayDeltaPercentage}
                deltaType={infoTotal.deltaType}
              />
            </SortButton>
          </Table.Th>
        </>
      )}
    </>
  );
};

const Row = ({ item, renderRowHeader }) => (
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
            {!isBaseline && <Table.Td className={cx(styles.delta, styles.deltaPercentage)} />}
          </>
        );
      }

      const { displayValue, deltaPercentage, displayDelta, displayDeltaPercentage, deltaType } =
        run;

      return (
        <>
          <Table.Td className={valueClassName}>
            <Metric value={displayValue} />
          </Table.Td>
          {!isBaseline && typeof deltaPercentage === 'number' && (
            <>
              <Table.Td className={styles.delta}>
                <Delta displayValue={displayDelta} deltaType={deltaType} />
              </Table.Td>
              <Table.Td className={cx(styles.delta, styles.deltaPercentage)}>
                <Delta displayValue={displayDeltaPercentage} deltaType={deltaType} />
              </Table.Td>
            </>
          )}
        </>
      );
    })}
  </Table.Tr>
);

Row.propTypes = {
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
  title,
  showAllItems,
  setShowAllItems,
  sort,
  updateSort,
  ...restProps
}) => {
  const columnCount = (runs.length - 1) * CURRENT_COLUMN_SPAN + BASELINE_COLUMN_SPAN + 1;

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
        <Table.Tr className={styles.headerRow}>
          <Table.Th className={styles.metricName} rowSpan={showHeaderSum ? 2 : 1}>
            {title || ' '}
          </Table.Th>
          {runs.map((run, runIndex) => (
            <ColumnJob run={run} isBaseline={runIndex === runs.length - 1} />
          ))}
        </Table.Tr>
        {showHeaderSum && (
          <Table.Tr className={styles.headerRow}>
            {runs.map((run, runIndex) => (
              <ColumnSum
                rows={items}
                isBaseline={runIndex === runs.length - 1}
                runIndex={runIndex}
                updateSort={updateSort}
                sort={sort}
              />
            ))}
          </Table.Tr>
        )}
      </Table.THead>
      <Table.TBody>
        {showEmpty && (
          <Table.Tr>
            <Table.Td className={styles.empty} colSpan={columnCount}>
              <Stack space="xxsmall">
                <div>
                  <Icon glyph={Icon.ICONS.INFO} className={styles.emptyIcon} size="large" />
                </div>
                {emptyMessage}
              </Stack>
            </Table.Td>
          </Table.Tr>
        )}

        {showItems && (
          <>
            {visibleItems.map((item) => (
              <Row key={item.key} item={item} renderRowHeader={renderRowHeader} />
            ))}

            {hasHiddenItems && (
              <Table.Tr>
                <Table.Td className={styles.showAllItems} colSpan={columnCount}>
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
                  )}
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
  title: PropTypes.element,
};
