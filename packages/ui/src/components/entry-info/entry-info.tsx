import React from 'react';
import cx from 'classnames';
import { Portal } from 'ariakit/portal';
import { METRIC_TYPES, MetricRunInfo, getMetricRunInfo } from '@bundle-stats/utils';

import { Box } from '../../layout/box';
import { Stack } from '../../layout/stack';
import { FileName } from '../../ui/file-name';
import { Icon } from '../../ui/icon';
import { Table } from '../../ui/table';
import { RunInfo } from '../run-info';
import css from './entry-info.module.css';

interface EntryInfoMetaProps {
  label: string;
}

const EntryInfoMeta = ({
  className = '',
  label,
  children,
}: EntryInfoMetaProps & React.ComponentProps<'p'>) => (
  <p className={cx(css.meta, className)}>
    <span className={css.metaLabel}>{label}</span>
    <span className={css.metaContent}>{children}</span>
  </p>
);

interface EntryRun {
  name: string;
}

interface EntryInfoProps {
  itemTitle?: React.ReactNode;
  item: {
    label: string;
    runs: Array<EntryRun & MetricRunInfo>;
  };
  labels: Array<string>;
  runNameSelector?: string;
  runNameLabel?: string;
  tags?: React.ReactNode;
  onClose: () => void;
}

export const EntryInfo = (props: EntryInfoProps & React.ComponentProps<'div'>) => {
  const {
    className = '',
    itemTitle = null,
    item,
    labels,
    runNameSelector = 'name',
    runNameLabel = 'Path',
    children,
    tags = null,
    onClose,
  } = props;

  const baselineRun = item.runs.length > 1 ? item.runs?.[item.runs.length - 1] : null;

  // Get the metric run info to handle added/removed cases
  const metricRunInfo = getMetricRunInfo(
    METRIC_TYPES.METRIC_TYPE_FILE_SIZE,
    item.runs?.[0]?.value,
    baselineRun?.value || 0,
  );

  return (
    <Portal className={cx(css.root, className)}>
      <Box padding="small" as="header" className={css.header}>
        <Stack space="small">
          {tags && <div>{tags}</div>}

          <Stack space="xxxsmall">
            <h3 className={css.label}>
              <FileName as="code" name={itemTitle || item.label} className={css.fileName} />
            </h3>

            <RunInfo
              current={metricRunInfo.displayValue}
              delta={metricRunInfo.displayDeltaPercentage}
              deltaType={metricRunInfo.deltaType}
              baseline={baselineRun?.displayValue || '0B'}
              size="large"
            />
          </Stack>
        </Stack>
        <button type="button" onClick={onClose} className={css.headerClose}>
          <Icon glyph={Icon.ICONS.CLOSE} />
        </button>
      </Box>
      <Box padding="small" as="main" className={css.contentWrapper}>
        <Stack space="small" className={css.content}>
          {children}

          <Table outline className={css.runs}>
            <Table.THead>
              <Table.Tr>
                <Table.Th className={cx(css.runsCell, css.runsColJob)}>&nbsp;</Table.Th>
                <Table.Th className={cx(css.runsCell, css.runsColName)}>{runNameLabel}</Table.Th>
                <Table.Th className={cx(css.runsCell, css.runsColSize)}>Size</Table.Th>
              </Table.Tr>
            </Table.THead>
            <Table.TBody>
              {item.runs.map((run, index) => {
                const key = `info-${run?.name || index}-${index}`;

                return (
                  <Table.Tr key={key}>
                    <Table.Th className={cx(css.runsCell, css.runsColJob)}>{labels[index]}</Table.Th>
                    <Table.Td className={cx(css.runsCell, css.runsColName)}>
                      <FileName
                        className={css.fileName}
                        as="code"
                        name={(run as any)?.[runNameSelector] || '-'}
                      />
                    </Table.Td>
                    <Table.Td className={cx(css.runsCell, css.runsColSize)}>
                      <span className={css.size}>
                        {typeof run?.value !== 'undefined' ? run.value : '-'}
                      </span>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.TBody>
          </Table>
        </Stack>
      </Box>
    </Portal>
  );
};

EntryInfo.Meta = EntryInfoMeta;
