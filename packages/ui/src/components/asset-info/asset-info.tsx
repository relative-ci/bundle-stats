import React from 'react';
import cx from 'classnames';
import { MetricRunInfo, getBundleModulesByChunk, getModuleFileType } from '@bundle-stats/utils';
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
  customComponentLink?: React.ElementType;
}

export const AssetInfo = (props: AssetInfoProps & React.ComponentProps<'div'>) => {
  const {
    className = '',
    chunks = null,
    customComponentLink: CustomComponentLink = ComponentLink,
    item,
    labels,
  } = props;

  const currentRun = item.runs?.[0];

  return (
    <EntryInfo className={cx(css.root, className)} item={item} labels={labels}>
      <FlexStack space="xxxsmall" alignItems="center" className={css.tags}>
        {item.isEntry && (
          <Tag className={cx(css.assetNameTag, css.assetNameTagEntry)} kind={Tag.KINDS.INFO}>
            Entrypoint
          </Tag>
        )}
        {item.isInitial && (
          <Tag className={cx(css.assetNameTag, css.assetNameTagInitial)} kind={Tag.KINDS.INFO}>
            Initial
          </Tag>
        )}
        {item.isChunk && (
          <Tag className={cx(css.assetNameTag, css.assetNameTagChunk)} kind={Tag.KINDS.INFO}>
            Chunk
          </Tag>
        )}
      </FlexStack>

      {currentRun?.chunkId && chunks && (
        <ChunkModulesLink
          as={CustomComponentLink}
          chunks={chunks}
          chunkId={currentRun?.chunkId}
          name={currentRun?.name}
        />
      )}
    </EntryInfo>
  );
};
