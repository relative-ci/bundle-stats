import type { ElementType } from 'react';
import React, { useMemo } from 'react';
import cx from 'classnames';
import orderBy from 'lodash/orderBy';
import noop from 'lodash/noop';
import type { MetricRunInfo, MetricTypeConfig, ReportMetricRow } from '@bundle-stats/utils';
import {
  METRIC_TYPE_CONFIGS,
  BUNDLE_MODULES_DUPLICATE,
  FILE_TYPE_LABELS,
  MODULE_SOURCE_TYPE_LABELS,
  formatNumber,
  getBundleModulesByChunk,
  getBundleModulesByFileTpe,
  getBundleModulesBySource,
  getMetricRunInfo,
} from '@bundle-stats/utils';
import type { Module, MetaChunk } from '@bundle-stats/utils/types/webpack';

import type { ReportMetricModuleRow } from '../../types';
import { Stack } from '../../layout/stack';
import { Tag } from '../../ui/tag';
import { ComponentLink } from '../component-link';
import { RunInfo } from '../run-info';
import { EntryInfo, EntryInfoMetaLink } from '../entry-info';
import css from './module-info.module.css';
import { FlexStack } from '../../layout';
import { ModuleSizeMetric, ModuleSizeMetrics } from '../../constants';

interface DuplicateInstancesProps {
  current: number;
  baseline: number;
}

const DuplicateInstances = ({ current, baseline }: DuplicateInstancesProps) => {
  const runInfo = getMetricRunInfo(
    { biggerIsBetter: false, formatter: formatNumber },
    current,
    baseline,
  ) as MetricRunInfo;

  return (
    <RunInfo
      current={runInfo.displayValue}
      delta={runInfo.displayDeltaPercentage}
      deltaPercentage={runInfo.displayDelta}
      deltaType={runInfo.deltaType}
      size="small"
      className={css.duplicateInstances}
    />
  );
};

enum ChunkDataState {
  ADDED = 2,
  REMOVED = 1,
  NOT_CHANGED = 0,
}

const ChunkDataStateKind = {
  [ChunkDataState.ADDED]: 'info',
  [ChunkDataState.REMOVED]: 'danger',
  [ChunkDataState.NOT_CHANGED]: 'default',
};

interface ChunkData {
  id: string;
  state: ChunkDataState;
}

function compareChunksData(
  currentChunkIds: Array<string>,
  baselineChunkIds: Array<string>,
): Array<ChunkData> {
  const result: Array<ChunkData> = [];

  currentChunkIds.forEach((chunkId) => {
    if (!baselineChunkIds.includes(chunkId)) {
      result.push({ id: chunkId, state: ChunkDataState.ADDED });
    } else {
      result.push({ id: chunkId, state: ChunkDataState.NOT_CHANGED });
    }
  });

  baselineChunkIds.forEach((chunk) => {
    if (!currentChunkIds.includes(chunk)) {
      result.push({ id: chunk, state: ChunkDataState.REMOVED });
    }
  });

  return orderBy(result, 'state', 'desc');
}

interface ChunksDeltaProps {
  customComponentLink: ElementType;
  runs: Array<Module & MetricRunInfo>;
  chunks: Array<MetaChunk>;
  chunkIds: Array<string>;
}

const ChunksDelta = (props: ChunksDeltaProps) => {
  const { customComponentLink: CustomComponentLink, runs, chunks, chunkIds } = props;

  const currentChunkIds = runs[0]?.chunkIds || [];
  const baselineChunkIds = runs[runs.length - 1]?.chunkIds || [];

  const chunksData = compareChunksData(currentChunkIds, baselineChunkIds);

  return (
    <Stack space="xxxsmall">
      <div>
        {chunksData.map((chunkData) => {
          const chunk = chunks?.find(({ id }) => id === chunkData.id);

          if (!chunk) {
            return null;
          }

          return (
            <EntryInfoMetaLink
              as={CustomComponentLink}
              {...getBundleModulesByChunk(chunkIds, chunkData.id)}
              className={cx(
                css.chunksItem,
                css[`chunksItem-${ChunkDataStateKind[chunkData.state]}`],
              )}
            >
              {chunk.name}
            </EntryInfoMetaLink>
          );
        })}
      </div>
    </Stack>
  );
};

interface ModuleSizeRunInfoProps {
  metric: MetricTypeConfig;
  title: string;
  titleTooltip?: string;
  current?: number;
  baseline?: number;
}

const ModuleSizeRunInfo = (props: ModuleSizeRunInfoProps) => {
  const { metric, title, titleTooltip, current, baseline } = props;

  const runInfo = getMetricRunInfo(metric, current || 0, baseline || 0) as MetricRunInfo;

  return (
    <RunInfo
      title={title}
      titleTooltip={titleTooltip}
      current={runInfo.displayValue}
      delta={runInfo.displayDeltaPercentage}
      deltaPercentage={runInfo.displayDelta}
      deltaType={runInfo.deltaType}
      baseline={metric.formatter(baseline || 0)}
    />
  );
};

const renderRunInfo = (item: ReportMetricRow) => {
  const itemModule = item as ReportMetricModuleRow;

  const currentRun = itemModule.runs[0];
  const baselineRun =
    itemModule.runs.length > 1 ? itemModule.runs[itemModule.runs.length - 1] : null;
  const metric = METRIC_TYPE_CONFIGS.METRIC_TYPE_FILE_SIZE;

  return (
    <FlexStack space="small" className={css.moduleSizes}>
      {itemModule.duplicated && (
        <>
          <ModuleSizeRunInfo
            metric={metric}
            title={ModuleSizeMetrics[ModuleSizeMetric.TOTAL_SIZE].label}
            titleTooltip={ModuleSizeMetrics[ModuleSizeMetric.TOTAL_SIZE].tooltip}
            current={currentRun.sizeTotal}
            baseline={baselineRun?.sizeTotal || 0}
          />
          <ModuleSizeRunInfo
            metric={metric}
            title={ModuleSizeMetrics[ModuleSizeMetric.DUPLICATE_SIZE].label}
            titleTooltip={ModuleSizeMetrics[ModuleSizeMetric.DUPLICATE_SIZE].tooltip}
            current={currentRun.sizeDuplicate}
            baseline={baselineRun?.sizeDuplicate || 0}
          />
        </>
      )}
      <ModuleSizeRunInfo
        metric={metric}
        title={ModuleSizeMetrics[ModuleSizeMetric.SIZE].label}
        titleTooltip={ModuleSizeMetrics[ModuleSizeMetric.SIZE].tooltip}
        current={currentRun.size}
        baseline={baselineRun?.size || 0}
      />
    </FlexStack>
  );
};

interface ModuleInfoProps {
  item: ReportMetricModuleRow;
  chunks?: Array<MetaChunk>;
  chunkIds?: Array<string>;
  labels: Array<string>;
  metricLabel?: string;
  customComponentLink?: React.ElementType;
  onClose: () => void;
}

export const ModuleInfo = (props: ModuleInfoProps & React.ComponentProps<'div'>) => {
  const {
    className = '',
    item,
    labels,
    chunks = [],
    chunkIds = [],
    metricLabel = '',
    customComponentLink: CustomComponentLink = ComponentLink,
    onClick = noop,
    onClose,
  } = props;

  const rootClassName = cx(css.root, className);

  const tags = useMemo(() => {
    if (!item.duplicated) {
      return null;
    }

    return (
      <div>
        <Tag as={CustomComponentLink} {...BUNDLE_MODULES_DUPLICATE} kind="danger">
          Duplicate
        </Tag>
      </div>
    );
  }, [item]);

  const fileTypeLabel = FILE_TYPE_LABELS[item.fileType as keyof typeof FILE_TYPE_LABELS];

  const sourceTypeLabel = item.thirdParty
    ? MODULE_SOURCE_TYPE_LABELS.THIRD_PARTY
    : MODULE_SOURCE_TYPE_LABELS.FIRST_PARTY;

  const currentChunkCount = (item.runs[0]?.chunkIds || []).length;
  const baselineChunkCount = (item.runs[item.runs.length - 1]?.chunkIds || []).length;
  const currentDuplicateInstances = currentChunkCount > 0 ? currentChunkCount - 1 : 0;
  const baselineDuplicateInstances = baselineChunkCount > 0 ? baselineChunkCount - 1 : 0;
  const hasDuplicates = currentDuplicateInstances !== 0 || baselineDuplicateInstances !== 0;

  return (
    <EntryInfo
      item={item as ReportMetricRow}
      labels={labels}
      tags={tags}
      onClose={onClose}
      renderRunInfo={renderRunInfo}
      runSizeLabel={metricLabel}
      className={rootClassName}
    >
      <Stack space="xxxsmall">
        {item?.fileType && (
          <EntryInfo.Meta label="File type" tooltip="Module file type: JS, CSS">
            <EntryInfoMetaLink
              as={CustomComponentLink}
              {...getBundleModulesByFileTpe(item.fileType, fileTypeLabel)}
            >
              {fileTypeLabel}
            </EntryInfoMetaLink>
          </EntryInfo.Meta>
        )}

        <EntryInfo.Meta label="Source" tooltip="Module source type: first party, third party">
          <EntryInfoMetaLink
            as={CustomComponentLink}
            {...getBundleModulesBySource(item.thirdParty || false, sourceTypeLabel)}
            onClick={onClick}
          >
            {sourceTypeLabel}
          </EntryInfoMetaLink>
        </EntryInfo.Meta>

        {hasDuplicates && (
          <EntryInfo.Meta label="Duplicates" tooltip="Module duplicate instances">
            <DuplicateInstances
              current={currentDuplicateInstances}
              baseline={baselineDuplicateInstances}
            />
          </EntryInfo.Meta>
        )}

        <EntryInfo.Meta label="Chunks" tooltip="Chunks that contain the module">
          <ChunksDelta
            runs={item.runs}
            chunks={chunks}
            chunkIds={chunkIds}
            customComponentLink={CustomComponentLink}
          />
        </EntryInfo.Meta>
      </Stack>
    </EntryInfo>
  );
};
