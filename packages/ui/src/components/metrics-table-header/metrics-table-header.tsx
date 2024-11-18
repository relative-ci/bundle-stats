import React from 'react';
import cx from 'classnames';
import sum from 'lodash/sum';
import {
  METRIC_TYPE_CONFIGS,
  MetricTypes,
  type ReportMetricRow,
  getMetricRunInfo,
} from '@bundle-stats/utils';

import { Table } from '../../ui/table';
import { Delta } from '../delta';
import { JobName } from '../job-name';
import { Metric } from '../metric';
import { SortButton, SortButtonProps } from '../sort-button';
import * as I18N from './metrics-table-header.i18n';
import css from './metrics-table-header.module.css';

const METRIC_TYPE = METRIC_TYPE_CONFIGS[MetricTypes.FileSize];
const BASELINE_COLUMN_SPAN = 1;
const CURRENT_COLUMN_SPAN = 3;

interface JobColumnProps {
  job: { label: string; internalBuildNumber: number };
  isBaseline: boolean;
}

const JobColumn = ({ job, isBaseline }: JobColumnProps) => {
  const colSpan = isBaseline ? BASELINE_COLUMN_SPAN : CURRENT_COLUMN_SPAN;
  const { label, internalBuildNumber } = job;

  if (!job) {
    return <Table.Th colSpan={colSpan}>-</Table.Th>;
  }

  return (
    <Table.Th className={cx(css.col, css.job)} colSpan={colSpan}>
      <JobName
        title={isBaseline ? I18N.BASELINE_TITLE : I18N.CURRENT_TITLE}
        internalBuildNumber={internalBuildNumber}
        className={css.jobName}
      >
        {label}
      </JobName>
    </Table.Th>
  );
};

const getRowsRunTotal = (rows: Array<ReportMetricRow>, runIndex: number): number =>
  sum(rows.map((row) => row?.runs?.[runIndex]?.value || 0));

interface ColumnSumProps {
  rows: Array<ReportMetricRow>;
  isBaseline: boolean;
  runIndex: number;
  sort?: SortButtonProps['sort'];
  updateSort?: SortButtonProps['updateSort'];
}

const SumColumn = ({ rows, isBaseline, runIndex, updateSort, sort }: ColumnSumProps) => {
  const currentRunTotal = getRowsRunTotal(rows, runIndex);
  const baselineRunTotal = !isBaseline ? getRowsRunTotal(rows, runIndex + 1) : 0;
  const total = getMetricRunInfo(METRIC_TYPE, currentRunTotal, baselineRunTotal);
  const fieldPath = `runs[${runIndex}]`;

  return (
    <>
      <Table.Th className={cx(css.col, css.value, css.sum)}>
        <SortButton
          fieldPath={fieldPath}
          fieldName="value"
          label={I18N.SORT_VALUE}
          updateSort={updateSort}
          sort={sort}
        >
          <Metric value={total.displayValue} />
        </SortButton>
      </Table.Th>
      {!isBaseline && (
        <>
          <Table.Th className={cx(css.col, css.delta, css.sum)}>
            <SortButton
              fieldPath={fieldPath}
              fieldName="delta"
              label={I18N.SORT_CHANGE}
              updateSort={updateSort}
              sort={sort}
            >
              {'delta' in total && (
                <Delta displayValue={total.displayDelta} deltaType={total.deltaType} />
              )}
            </SortButton>
          </Table.Th>
          <Table.Th className={cx(css.col, css.delta, css.deltaPercentage, css.sum)}>
            <SortButton
              fieldPath={fieldPath}
              fieldName="deltaPercentage"
              label={I18N.SORT_PERCENTUAL_CHANGE}
              updateSort={updateSort}
              sort={sort}
            >
              {'delta' in total && (
                <Delta displayValue={total.displayDeltaPercentage} deltaType={total.deltaType} />
              )}
            </SortButton>
          </Table.Th>
        </>
      )}
    </>
  );
};

export interface MetricsTableHeaderProps {
  /**
   * Metric column title
   */
  metricTitle?: React.ReactNode;
  /**
   * Show column sum flag
   */
  showSum?: boolean;
  /**
   * Array of jobs
   */
  jobs: Array<{ label: string; internalBuildNumber: number }>;
  /**
   * Report rows
   */
  rows: Array<ReportMetricRow>;
  /**
   * Sort field data
   */
  sort?: any;
  /**
   * Update sort field
   */
  updateSort?: (val: any) => void;
}

export const MetricsTableHeader = (
  props: MetricsTableHeaderProps & React.ComponentProps<'thead'>,
) => {
  const { className = '', metricTitle = '', showSum = false, jobs, rows, sort, updateSort } = props;

  const rootClassName = cx(css.root, showSum && css.showHeaderSum, className);

  return (
    <Table.THead className={rootClassName}>
      <Table.Tr>
        <Table.Th className={cx(css.col, css.metric)} rowSpan={showSum ? 2 : 1}>
          {metricTitle || ' '}
        </Table.Th>
        {jobs.map((job, runIndex) => (
          <JobColumn job={job} isBaseline={runIndex === jobs.length - 1} />
        ))}
      </Table.Tr>
      {showSum && (
        <Table.Tr>
          {jobs.map((_, runIndex) => (
            <SumColumn
              rows={rows}
              isBaseline={runIndex === jobs.length - 1}
              runIndex={runIndex}
              updateSort={updateSort}
              sort={sort}
            />
          ))}
        </Table.Tr>
      )}
    </Table.THead>
  );
};
