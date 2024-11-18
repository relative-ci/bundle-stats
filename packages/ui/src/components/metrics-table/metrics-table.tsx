import React from 'react';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';
import type { ReportMetricRow } from '@bundle-stats/utils';

import { Button } from '../../ui/button';
import { Icon } from '../../ui/icon';
import { Table } from '../../ui/table';
import { Stack } from '../../layout/stack';
import { Metric } from '../metric';
import { Delta } from '../delta';
import { MetricsTableHeader, MetricsTableHeaderProps } from '../metrics-table-header';
import * as I18N from './metrics-table.i18n';
import css from './metrics-table.module.css';

const VISIBLE_COUNT = 500;
const BASELINE_COLUMN_SPAN = 1;
const CURRENT_COLUMN_SPAN = 3;

interface RowProps extends React.ComponentProps<typeof Table.Tr> {
  item: ReportMetricRow;
  renderHeader: (item: ReportMetricRow) => React.ReactNode;
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
          {!isBaseline && (
            <>
              <Table.Td className={css.delta}>
                {'delta' in run && (
                  <Delta displayValue={run.displayDelta} deltaType={run.deltaType} />
                )}
              </Table.Td>
              <Table.Td className={cx(css.delta, css.deltaPercentage)}>
                {'delta' in run && (
                  <Delta displayValue={run.displayDeltaPercentage} deltaType={run.deltaType} />
                )}
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
    label: string;
    internalBuildNumber: number;
  }>;
  items: Array<ReportMetricRow>;
  title?: React.ReactNode;
  showHeaderSum?: boolean;
  sort?: MetricsTableHeaderProps['sort'];
  updateSort?: MetricsTableHeaderProps['updateSort'];
  renderRowHeader?: (item: ReportMetricRow) => React.ReactNode;
  emptyMessage?: React.ReactNode;
  showAllItems: boolean;
  setShowAllItems: (value: boolean) => void;
}

export const MetricsTable = ({
  className = '',
  runs,
  items,
  showHeaderSum = false,
  title,
  sort,
  updateSort,
  renderRowHeader = (item: any) => item.label,
  emptyMessage = I18N.EMPTY_MESSAGE,
  showAllItems,
  setShowAllItems,
  ...restProps
}: MetricsTableProps) => {
  const columnCount = (runs.length - 1) * CURRENT_COLUMN_SPAN + BASELINE_COLUMN_SPAN + 1;

  const rootClassName = cx(css.root, className, runs.length > 1 && css.multipleRuns);

  const showEmpty = isEmpty(items);
  const showItems = !showEmpty;
  const hasHiddenItems = items?.length > VISIBLE_COUNT;
  const visibleItems = !hasHiddenItems || showAllItems ? items : items?.slice(0, VISIBLE_COUNT);

  return (
    <Table className={rootClassName} compact {...restProps}>
      <MetricsTableHeader
        metricTitle={title}
        showSum={showHeaderSum}
        jobs={runs}
        rows={items}
        sort={sort}
        updateSort={updateSort}
      />
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
                    <Button
                      padding="small"
                      kind="primary"
                      onClick={() => setShowAllItems(false)}
                      type="button"
                    >
                      {I18N.SHOW_LESS}
                    </Button>
                  ) : (
                    <Button
                      padding="small"
                      kind="primary"
                      onClick={() => setShowAllItems(true)}
                      type="button"
                    >
                      {I18N.SHOW_ALL}
                    </Button>
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
