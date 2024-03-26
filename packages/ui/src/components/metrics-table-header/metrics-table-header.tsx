import React from 'react';

import { Table } from '../../ui/table';
import { JobName } from '../job-name';

const css = {};
const I18N = {};

interface JobColumnProps {
  run: Run;
  isBaseline: boolean;
}

const JobColumn = ({ run, isBaseline }: JobColumnProps) => {
  const colSpan = isBaseline ? BASELINE_COLUMN_SPAN : CURRENT_COLUMN_SPAN;
  const { label, internalBuildNumber } = run;

  if (!run) {
    return <Table.Th colSpan={colSpan}>-</Table.Th>;
  }

  return (
    <Table.Th className={css.jobCol} colSpan={colSpan}>
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

interface MetricsTableHeaderProps {
  title?: React.ReactNode;
  runs: Array<{
    internalBuildNumber: number;
  }>;
  showHeaderSum?: boolean;
  updateSort?: any;
  sort?: any;
}

export const MetricsTableHeader = (props: MetricsTableHeaderProps & React.ComponentProps<'thead'>) => {
  const { showHeaderSum = false, title = ' ', runs, updateSort, sort, ...restProps } = props;

  return (
      <Table.THead {...restProps}>
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
  );
};
