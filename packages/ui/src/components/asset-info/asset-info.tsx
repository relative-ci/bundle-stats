import React from 'react';
import cx from 'classnames';
import { MetricRunInfo, getBundleModulesByChunk, getModuleFileType } from '@bundle-stats/utils';
import { Asset, MetaChunk } from '@bundle-stats/utils/types/webpack';

import { Stack } from '../../layout/stack';
import { FlexStack } from '../../layout/flex-stack';
import { Separator } from '../../layout/separator';
import { FileName } from '../../ui/file-name';
import { Tag } from '../../ui/tag';
import { ComponentLink } from '../component-link';
import { RunInfo } from '../run-info';
import css from './asset-info.module.css';

interface ChunkModulesLinkProps {
  as: React.ElementType;
  chunks: Array<MetaChunk>;
  chunkId: string;
  name: string;
}

const ChunkModulesLink = ({ as: Component, chunks, chunkId, name }: ChunkModulesLinkProps) => {
  const chunk = chunks?.find(({ id }) => id === chunkId);

  if (!chunk) {
    return null;
  }

  const chunkIds = chunks.map(({ id }) => id);
  const fileType = getModuleFileType(name);

  return (
    <Component
      className={css.viewModules}
      {...getBundleModulesByChunk(chunkIds, chunkId, fileType)}
    >
      View chunk modules
    </Component>
  );
};

interface AssetInfoProps {
  item: {
    label: string;
    changed?: boolean;
    isChunk?: boolean;
    isEntry?: boolean;
    isInitial?: boolean;
    isNotPredicative?: boolean;
    runs: Array<Asset & MetricRunInfo>;
  };
  chunks?: Array<MetaChunk>;
  labels: Array<string>;
  CustomComponentLink?: React.ElementType;
}

export const AssetInfo = (props: AssetInfoProps & React.ComponentProps<'div'>) => {
  const {
    className = '',
    chunks = null,
    CustomComponentLink = ComponentLink,
    item,
    labels,
  } = props;

  const currentRun = item.runs?.[0];
  const baselineRun = item.runs.length > 1 ? item.runs?.[item.runs.length - 1] : null;

  return (
    <Stack space="small" className={cx(css.root, className)}>
      <Stack space="xxxsmall">
        <FlexStack space="xxxsmall" alignItems="center" className={css.tags}>
          {item.isEntry && (
            <Tag
              className={cx(css.assetNameTag, css.assetNameTagEntry)}
              size={Tag.SIZES.SMALL}
              kind={Tag.KINDS.INFO}
            >
              Entrypoint
            </Tag>
          )}
          {item.isInitial && (
            <Tag
              className={cx(css.assetNameTag, css.assetNameTagInitial)}
              size={Tag.SIZES.SMALL}
              kind={Tag.KINDS.INFO}
            >
              Initial
            </Tag>
          )}
          {item.isChunk && (
            <Tag
              className={cx(css.assetNameTag, css.assetNameTagChunk)}
              size={Tag.SIZES.SMALL}
              kind={Tag.KINDS.INFO}
            >
              Chunk
            </Tag>
          )}
        </FlexStack>
        <h3 className={css.label}>
          <FileName as="code" name={item.label} className={css.fileName} />
        </h3>
      </Stack>

      <RunInfo
        current={currentRun?.displayValue}
        delta={currentRun?.displayDeltaPercentage}
        baseline={baselineRun?.displayValue}
        showBaseline={Boolean(baselineRun)}
        size="large"
      />

      <Separator />

      <Stack space="xsmall" className={css.runs}>
        {item.runs.map((run, index) => {
          const key = `asset-info-${run?.name || index}-${index}`;

          return (
            <Stack space="xxxsmall" key={key}>
              <h4 className={css.runLabel}>{labels[index]}</h4>
              <FileName className={css.fileName} as="code" name={run?.name || '-'} />
              <div>
                {index === 0 && run?.chunkId && chunks && (
                  <ChunkModulesLink
                    as={CustomComponentLink}
                    chunks={chunks}
                    chunkId={run?.chunkId}
                    name={run?.name}
                  />
                )}
              </div>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};
