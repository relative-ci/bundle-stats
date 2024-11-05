import React, { useCallback, useMemo } from 'react';
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
import type { AssetMetricRun, MetaChunk } from '@bundle-stats/utils/types/webpack';

import { FlexStack } from '../../layout/flex-stack';
import { AssetMetaTag } from '../asset-meta-tag';
import { ComponentLink } from '../component-link';
import { EntryInfo, EntryInfoMetaLink } from '../entry-info';
import css from './asset-info.module.css';
import { AssetName } from '../asset-name/asset-name';
import { FileName } from '../../ui';
import { ReportMetricAssetRow } from '../../types';

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
    isNotPredictive?: boolean;
    fileType?: string;
    runs: Array<AssetMetricRun & MetricRunInfo>;
  };
  chunks?: Array<MetaChunk>;
  labels: Array<string>;
  customComponentLink?: React.ElementType;
  onClose: () => void;
}

export const AssetInfo = (props: AssetInfoProps & React.ComponentProps<'div'>) => {
  const {
    className = '',
    chunks = null,
    customComponentLink: CustomComponentLink = ComponentLink,
    item,
    labels,
    onClick = noop,
    onClose,
  } = props;

  const currentRun = item.runs?.[0];

  const tags = useMemo(() => {
    if (!item.isEntry && !item.isInitial && !item.isChunk) {
      return null;
    }

    return (
      <FlexStack space="xxxsmall" alignItems="center" className={css.tags}>
        {item.isEntry && (
          <AssetMetaTag
            as={CustomComponentLink}
            {...getBundleAssetsByEntryType('entry')}
            onClick={onClick}
            tag="entry"
            size="medium"
            status={item.isEntry}
            className={css.assetNameTag}
          >
            Entrypoint
          </AssetMetaTag>
        )}
        {item.isInitial && (
          <AssetMetaTag
            as={CustomComponentLink}
            {...getBundleAssetsByEntryType('initial')}
            onClick={onClick}
            tag="initial"
            size="medium"
            status={item.isInitial}
            className={cx(css.assetNameTag, css.assetNameTagInitial)}
          >
            Initial
          </AssetMetaTag>
        )}
        {item.isChunk && (
          <AssetMetaTag
            as={CustomComponentLink}
            {...getBundleAssetsByEntryType('chunk')}
            onClick={onClick}
            tag="chunk"
            size="medium"
            status={item.isChunk}
            className={cx(css.assetNameTag, css.assetNameTagChunk)}
          >
            Chunk
          </AssetMetaTag>
        )}
      </FlexStack>
    );
  }, [item]);

  const RunName = useCallback(
    (runNameProps: { children: React.ReactNode; run: ReportMetricAssetRow }) => {
      const { run, children } = runNameProps;

      return (
        <>
          <span className={css.runNameTags}>
            {run.isEntry && <AssetMetaTag tag="entry" title="Entry" size="small" />}
            {run.isInitial && <AssetMetaTag tag="initial" title="Initial" size="small" />}
            {run.isChunk && <AssetMetaTag tag="chunk" title="Chunk" size="small" />}
          </span>
          {children}
        </>
      );
    },
    [],
  );

  const fileTypeLabel = FILE_TYPE_LABELS[item.fileType as keyof typeof FILE_TYPE_LABELS];

  return (
    <EntryInfo
      item={item as any}
      labels={labels}
      tags={tags}
      onClose={onClose}
      RunName={RunName}
      className={cx(css.root, className)}
    >
      {item.fileType && (
        <EntryInfo.Meta
          label="File type"
          tooltip="Asset file type: JS, CSS, image, media, fonts, HTML, or other"
        >
          <EntryInfoMetaLink
            as={CustomComponentLink}
            {...getBundleAssetsFileTypeComponentLink(item.fileType, fileTypeLabel)}
            onClick={onClick}
          >
            {fileTypeLabel}
          </EntryInfoMetaLink>
        </EntryInfo.Meta>
      )}

      {currentRun?.chunkId && chunks && (
        <div>
          <ChunkModulesLink
            as={CustomComponentLink}
            chunks={chunks}
            chunkId={currentRun?.chunkId}
            name={currentRun?.name}
            onClick={onClick}
          />
        </div>
      )}
    </EntryInfo>
  );
};
