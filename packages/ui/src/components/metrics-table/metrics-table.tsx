import React from 'react';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';
import sum from 'lodash/sum';
import {
  METRIC_TYPE_CONFIGS,
  type MetricRunInfo,
  MetricTypes,
  getMetricRunInfo,
} from '@bundle-stats/utils';

import { Icon } from '../../ui/icon';
import { Table } from '../../ui/table';
import { Stack } from '../../layout/stack';
import { Metric } from '../metric';
import { Delta } from '../delta';
import { JobName } from '../job-name';
import { SortButton } from '../sort-button';
import css from './metrics-table.module.css';

const METRIC_TYPE = METRIC_TYPE_CONFIGS[MetricTypes.FileSize];
const VISIBLE_COUNT = 500;
const BASELINE_COLUMN_SPAN = 1;
const CURRENT_COLUMN_SPAN = 3;
const BASELINE_TITLE = 'Baseline';
const CURRENT_TITLE = 'Current';

interface Run {
  /**
   * Run job label
   */
  label?: React.ReactNode;
  /**
   * Job internal build number
   */
  internalBuildNumber: number;
}

interface Item {
  key: string;
  label?: string;
  changed: boolean;
  biggerIsBetter: boolean;
  runs: Array<MetricRunInfo | null>;
}

const getRowsRunTotal = (rows: Array<Item>, runIndex: number): number =>
  sum(rows.map((row) => row?.runs?.[runIndex]?.value || 0));

interface JobColumnProps {
  run: Run;
  isBaseline: boolean;
}

const JobColumn = ({ run, isBaseline }: JobColumnProps) => {
  const colSpan = isBaseline ? BASELINE_COLUMN_SPAN : CURRENT_COLUMN_SPAN;

  if (!run) {
    return <Table.Th colSpan={colSpan}>-</Table.Th>;
  }

  const { label, internalBuildNumber } = run;

  return (
    <Table.Th className={css.job} colSpan={colSpan}>
      <JobName
        title={isBaseline ? BASELINE_TITLE : CURRENT_TITLE}
        internalBuildNumber={internalBuildNumber}
        className={css.jobName}
      >
        {label}
      </JobName>
    </Table.Th>
  );
};

interface ColumnSumProps {
  rows: Array<Item>;
  isBaseline: boolean;
  runIndex: number;
  sort?: any;
  updateSort?: (val: any) => void;
}

const SumColumn = ({ rows, isBaseline, runIndex, updateSort, sort }: ColumnSumProps) => {
  const currentRunTotal = getRowsRunTotal(rows, runIndex);
  const baselineRunTotal = !isBaseline ? getRowsRunTotal(rows, runIndex + 1) : 0;
  const total = getMetricRunInfo(METRIC_TYPE, currentRunTotal, baselineRunTotal);
  const fieldPath = `runs[${runIndex}]`;

  return (
    <>
      <Table.Th className={cx(css.value, css.sum)}>
        <SortButton
          fieldPath={fieldPath}
          fieldName="value"
          label="absolute value"
          updateSort={updateSort}
          sort={sort}
        >
          <Metric value={total.displayValue} />
        </SortButton>
      </Table.Th>
      {!isBaseline && (
        <>
          <Table.Th className={cx(css.delta, css.sum)}>
            <SortButton
              fieldPath={fieldPath}
              fieldName="delta"
              label="absolute change"
              updateSort={updateSort}
              sort={sort}
            >
              <Delta displayValue={total.displayDelta || ''} deltaType={total.deltaType || ''} />
            </SortButton>
          </Table.Th>
          <Table.Th className={cx(css.delta, css.deltaPercentage, css.sum)}>
            <SortButton
              fieldPath={fieldPath}
              fieldName="deltaPercentage"
              label="absolute percentual change"
              updateSort={updateSort}
              sort={sort}
            >
              <Delta
                displayValue={total.displayDeltaPercentage || ''}
                deltaType={total.deltaType || ''}
              />
            </SortButton>
          </Table.Th>
        </>
      )}
    </>
  );
};

interface RowProps extends React.ComponentProps<typeof Table.Tr> {
  item: Item;
  renderHeader: (item: Item) => React.ReactNode;
}

const Row = ({ className = '', item, renderHeader, ...restProps }: RowProps) => (
  <Table.Tr className={cx(!item.changed && css.unchanged, className)} {...restProps}>
    <Table.Th className={css.metricName}>{renderHeader(item)}</Table.Th>

    {item.runs.map((run, index) => {
      const isBaseline = index === item.runs.length - 1;
      const valueClassName = cx(css.value, !isBaseline && css.current);

      // Empty cells if no value
      if (!run || typeof run.value === 'undefined') {
        return (
          <>
            <Table.Td className={valueClassName}>-</Table.Td>
            {!isBaseline && <Table.Td className={css.delta} />}
            {!isBaseline && <Table.Td className={cx(css.delta, css.deltaPercentage)} />}
          </>
        );
      }

      return (
        <>
          <Table.Td className={valueClassName}>
            <Metric value={run.displayValue} />
          </Table.Td>
          {!isBaseline && typeof run.deltaPercentage === 'number' && (
            <>
              <Table.Td className={css.delta}>
                <Delta displayValue={run.displayDelta || ''} deltaType={run.deltaType || ''} />
              </Table.Td>
              <Table.Td className={cx(css.delta, css.deltaPercentage)}>
                <Delta
                  displayValue={run.displayDeltaPercentage || ''}
                  deltaType={run.deltaType || ''}
                />
              </Table.Td>
            </>
          )}
        </>
      );
    })}
  </Table.Tr>
);

interface MetricsTableProps extends Omit<React.ComponentProps<typeof Table>, 'title'> {
  runs: Array<{
    internalBuildNumber: number;
  }>;
  items: Array<Item>;
  title?: React.ReactNode;
  showHeaderSum?: boolean;
  sort?: any;
  updateSort?: (val: any) => void;
  renderRowHeader?: (item: Item) => React.ReactNode;
  emptyMessage?: React.ReactNode;
  showAllItems: boolean;
  setShowAllItems: (value: boolean) => void;
}

export const MetricsTable = ({
  className = '',
  runs,
  items,
  showHeaderSum = false,
  title = '',
  sort,
  updateSort,
  renderRowHeader = (item: any) => item.label,
  emptyMessage = 'No message found.',
  showAllItems,
  setShowAllItems,
  ...restProps
}: MetricsTableProps) => {
  const columnCount = (runs.length - 1) * CURRENT_COLUMN_SPAN + BASELINE_COLUMN_SPAN + 1;

  const rootClassName = cx(
    css.root,
    className,
    runs.length > 1 && css.multipleRuns,
    showHeaderSum && css.showHeaderSum,
  );

  const showEmpty = isEmpty(items);
  const showItems = !showEmpty;
  const hasHiddenItems = items?.length > VISIBLE_COUNT;
  const visibleItems = !hasHiddenItems || showAllItems ? items : items?.slice(0, VISIBLE_COUNT);

  return (
    <Table className={rootClassName} compact {...restProps}>
      <Table.THead>
        <Table.Tr className={css.headerRow}>
          <Table.Th className={css.metricName} rowSpan={showHeaderSum ? 2 : 1}>
            {title || ' '}
          </Table.Th>
          {runs.map((run, runIndex) => (
            <JobColumn run={run} isBaseline={runIndex === runs.length - 1} />
          ))}
        </Table.Tr>
        {showHeaderSum && (
          <Table.Tr className={css.headerRow}>
            {runs.map((_, runIndex) => (
              <SumColumn
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
            <Table.Td className={css.empty} colSpan={columnCount}>
              <Stack space="xxsmall">
                <div>
                  <Icon glyph={Icon.ICONS.INFO} className={css.emptyIcon} size="large" />
                </div>
                {emptyMessage}
              </Stack>
            </Table.Td>
          </Table.Tr>
        )}

        {showItems && (
          <>
            {visibleItems.map((item) => (
              <Row key={item.key} item={item} renderHeader={renderRowHeader} />
            ))}

            {hasHiddenItems && (
              <Table.Tr>
                <Table.Td className={css.showAllItems} colSpan={columnCount}>
                  {showAllItems ? (
                    <button
                      onClick={() => setShowAllItems(false)}
                      type="button"
                      className={css.showAllItemsButton}
                    >
                      Show less
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowAllItems(true)}
                      type="button"
                      className={css.showAllItemsButton}
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
