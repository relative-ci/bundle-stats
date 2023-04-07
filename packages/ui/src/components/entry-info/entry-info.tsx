import React from 'react';
import cx from 'classnames';
import { METRIC_TYPES, MetricRunInfo, getMetricRunInfo } from '@bundle-stats/utils';

import { Stack } from '../../layout/stack';
import { Separator } from '../../layout/separator';
import { FileName } from '../../ui/file-name';
import { RunInfo } from '../run-info';
import css from './entry-info.module.css';

interface EntryRun {
  name: string;
}

interface EntryInfoProps {
  item: {
    label: string;
    runs: Array<EntryRun & MetricRunInfo>;
  };
  labels: Array<string>;
}

export const EntryInfo = (props: EntryInfoProps & React.ComponentProps<'div'>) => {
  const { className = '', item, labels, children } = props;

  const baselineRun = item.runs.length > 1 ? item.runs?.[item.runs.length - 1] : null;

  // Get the metric run info to handle added/removed cases
  const metricRunInfo = getMetricRunInfo(
    METRIC_TYPES.METRIC_TYPE_FILE_SIZE,
    item.runs?.[0]?.value,
    baselineRun?.value || 0,
  );

  return (
    <Stack space="small" className={cx(css.root, className)}>
      <Stack space="xxxsmall">
        <h3 className={css.label}>
          <FileName as="code" name={item.label} className={css.fileName} />
        </h3>
      </Stack>

      <RunInfo
        current={metricRunInfo.displayValue}
        delta={metricRunInfo.displayDeltaPercentage}
        deltaType={metricRunInfo.deltaType}
        baseline={baselineRun?.displayValue || '0B'}
        size="large"
      />

      <Separator />

      {children && <Stack space="xxxsmall">{children}</Stack>}

      <Stack space="xsmall" className={css.runs}>
        {item.runs.map((run, index) => {
          const key = `info-${run?.name || index}-${index}`;

          return (
            <Stack space="xxxsmall" key={key}>
              <h4 className={css.runLabel}>{labels[index]}</h4>
              <FileName className={css.fileName} as="code" name={run?.name || '-'} />
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};
