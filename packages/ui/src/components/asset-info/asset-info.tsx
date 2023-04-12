import React, { useMemo } from 'react';
import cx from 'classnames';
import noop from 'lodash/noop';
import {
  FILE_TYPE_LABELS,
  MetricRunInfo,
  getBundleModulesByChunk,
  getBundleAssetsByEntryType,
  getBundleAssetsFileTypeComponentLink,
  getModuleFileType,
} from '@bundle-stats/utils';
import { Asset, MetaChunk } from '@bundle-stats/utils/types/webpack';

import { FlexStack } from '../../layout/flex-stack';
import { Tag } from '../../ui/tag';
import { ComponentLink } from '../component-link';
import { EntryInfo } from '../entry-info';
import css from './asset-info.module.css';

interface ChunkModulesLinkProps {
  as: React.ElementType;
  chunks: Array<MetaChunk>;
  chunkId: string;
  name: string;
}

const ChunkModulesLink = ({
  as: Component,
  chunks,
  chunkId,
  name,
  onClick,
}: ChunkModulesLinkProps & React.ComponentProps<'a'>) => {
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
      onClick={onClick}
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
    fileType?: string;
    runs: Array<Asset & MetricRunInfo>;
  };
  chunks?: Array<MetaChunk>;
  labels: Array<string>;
  customComponentLink?: React.ElementType;
}

export const AssetInfo = (props: AssetInfoProps & React.ComponentProps<'div'>) => {
  const {
    className = '',
    chunks = null,
    customComponentLink: CustomComponentLink = ComponentLink,
    item,
    labels,
    onClick = noop,
  } = props;

  const currentRun = item.runs?.[0];

  const tags = useMemo(() => {
    if (!item.isEntry && !item.isInitial && !item.isChunk) {
      return null;
    }

    return (
      <FlexStack space="xxxsmall" alignItems="center" className={css.tags}>
        {item.isEntry && (
          <Tag
            as={CustomComponentLink}
            {...getBundleAssetsByEntryType('entry')}
            onClick={onClick}
            className={cx(css.assetNameTag, css.assetNameTagEntry)}
          >
            Entrypoint
          </Tag>
        )}
        {item.isInitial && (
          <Tag
            as={CustomComponentLink}
            {...getBundleAssetsByEntryType('initial')}
            onClick={onClick}
            className={cx(css.assetNameTag, css.assetNameTagInitial)}
          >
            Initial
          </Tag>
        )}
        {item.isChunk && (
          <Tag
            as={CustomComponentLink}
            {...getBundleAssetsByEntryType('chunk')}
            onClick={onClick}
            className={cx(css.assetNameTag, css.assetNameTagChunk)}
          >
            Chunk
          </Tag>
        )}
      </FlexStack>
    );
  }, [item]);

  const fileTypeLabel = FILE_TYPE_LABELS[item.fileType as keyof typeof FILE_TYPE_LABELS];

  return (
    <EntryInfo item={item} labels={labels} tags={tags} className={cx(css.root, className)}>
      <>
        {item.fileType && (
          <p>
            <span>File type: </span>
            <Tag
              as={CustomComponentLink}
              {...getBundleAssetsFileTypeComponentLink(item.fileType, fileTypeLabel)}
              onClick={onClick}
            >
              {fileTypeLabel}
            </Tag>
          </p>
        )}
        {currentRun?.chunkId && chunks && (
          <ChunkModulesLink
            as={CustomComponentLink}
            chunks={chunks}
            chunkId={currentRun?.chunkId}
            name={currentRun?.name}
            onClick={onClick}
          />
        )}
      </>
    </EntryInfo>
  );
};
