import type { ComponentProps, ElementType, ReactNode } from 'react';
import React, { useMemo } from 'react';
import cx from 'classnames';
import noop from 'lodash/noop';
import type { WebpackChunk } from '@bundle-stats/utils';
import {
  FILE_TYPE_LABELS,
  getBundleModulesByChunk,
  getBundleAssetsByEntryType,
  getBundleAssetsFileTypeComponentLink,
  getModuleFileType,
  getBundleAssetsByChunk,
} from '@bundle-stats/utils';

import type { ReportMetricAssetRow } from '../../types';
import { FlexStack } from '../../layout/flex-stack';
import { AssetMetaTag } from '../asset-meta-tag';
import { ComponentLink } from '../component-link';
import { EntryInfo, EntryInfoMetaLink } from '../entry-info';
import * as I18N from './asset-info.i18n';
import css from './asset-info.module.css';

interface ChunkModulesLinkProps {
  as: ElementType;
  chunk: WebpackChunk;
  chunkIds: Array<string>;
  name: string;
}

const ChunkModulesLink = ({
  as: Component,
  chunk,
  chunkIds,
  name,
  onClick,
}: ChunkModulesLinkProps & ComponentProps<'a'>) => {
  const fileType = getModuleFileType(name);

  return (
    <Component
      className={css.viewModules}
      {...getBundleModulesByChunk(chunkIds, chunk.id, fileType)}
      onClick={onClick}
    >
      View chunk modules
    </Component>
  );
};

type AssetRunNameProps = {
  run: ReportMetricAssetRow;
  children: ReactNode;
};

const AssetRunName = (props: AssetRunNameProps) => {
  const { run, children } = props;

  return (
    <>
      <span className={css.runNameTags}>
        {run.isEntry && <AssetMetaTag tag="entry" title={I18N.ENTRY} size="small" />}
        {run.isInitial && <AssetMetaTag tag="initial" title={I18N.INITIAL} size="small" />}
        {run.isChunk && <AssetMetaTag tag="chunk" title={I18N.CHUNK} size="small" />}
      </span>
      {children}
    </>
  );
};

interface AssetInfoProps {
  item: ReportMetricAssetRow;
  chunks?: Array<WebpackChunk>;
  labels: Array<string>;
  customComponentLink?: ElementType;
  onClose: () => void;
}

export const AssetInfo = (props: AssetInfoProps & ComponentProps<'div'>) => {
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
            {I18N.ENTRYPOINT}
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
            {I18N.INITIAL}
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
            {I18N.CHUNK}
          </AssetMetaTag>
        )}
      </FlexStack>
    );
  }, [item]);

  const fileTypeLabel = FILE_TYPE_LABELS[item.fileType as keyof typeof FILE_TYPE_LABELS];
  const currentChunk = chunks?.find(
    (chunk) => currentRun?.chunkId && currentRun.chunkId === chunk.id,
  );
  const chunkIds: Array<string> = chunks?.filter(Boolean).map((chunk) => chunk.id) || [];

  return (
    <EntryInfo
      item={item as any}
      labels={labels}
      tags={tags}
      onClose={onClose}
      RunName={AssetRunName}
      className={cx(css.root, className)}
    >
      {item.fileType && (
        <EntryInfo.Meta label={I18N.FILE_TYPE} tooltip={I18N.FILE_TYPE_TOOLTIP}>
          <EntryInfoMetaLink
            as={CustomComponentLink}
            {...getBundleAssetsFileTypeComponentLink(item.fileType, fileTypeLabel)}
            onClick={onClick}
          >
            {fileTypeLabel}
          </EntryInfoMetaLink>
        </EntryInfo.Meta>
      )}

      {currentChunk && (
        <EntryInfo.Meta label={I18N.CHUNK} tooltip={I18N.CHUNK_TOOLTIP}>
          <EntryInfoMetaLink
            as={CustomComponentLink}
            {...getBundleAssetsByChunk(chunkIds, currentRun.chunkId)}
            onClick={onClick}
          >
            {currentChunk.name}
          </EntryInfoMetaLink>
        </EntryInfo.Meta>
      )}

      {currentChunk && (
        <div>
          <ChunkModulesLink
            as={CustomComponentLink}
            chunk={currentChunk}
            chunkIds={chunkIds}
            name={currentRun?.name}
            onClick={onClick}
          />
        </div>
      )}
    </EntryInfo>
  );
};
