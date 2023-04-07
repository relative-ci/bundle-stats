import React from 'react';
import cx from 'classnames';
import { getBundleModulesByChunk, getModuleFileType } from '@bundle-stats/utils';
import type { Asset, MetaChunk } from '@bundle-stats/utils/types/webpack';

import { Stack } from '../../layout/stack';
import { FileName } from '../../ui/file-name';
import { ComponentLink } from '../component-link';
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
    runs: Array<Asset>;
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

  return (
    <Stack space="xsmall" className={cx(css.root, className)}>
      {item.runs.map((run, index) => {
        const Title = index !== 0 ? 'h4' : 'h3';
        const key = `asset-info-${run?.name || index}-${index}`;

        return (
          <Stack space="xxxsmall" key={key}>
            <Title>{labels[index]}</Title>
            <FileName className={css.fileName} as="code" name={run?.name || '-'} />

            {index === 0 && run?.chunkId && chunks && (
              <ChunkModulesLink
                as={CustomComponentLink}
                chunks={chunks}
                chunkId={run?.chunkId}
                name={run?.name}
              />
            )}
          </Stack>
        );
      })}
    </Stack>
  );
};
