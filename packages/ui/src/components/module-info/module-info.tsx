import React from 'react';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';
import noop from 'lodash/noop';
import { MetricRunInfo, getBundleModulesByChunk } from '@bundle-stats/utils';
import { Module, MetaChunk } from '@bundle-stats/utils/types/webpack';

import { ComponentLink } from '../component-link';
import { EntryInfo } from '../entry-info';
import css from './module-info.module.css';

interface ModuleInfoProps {
  item: {
    label: string;
    changed?: boolean;
    runs: Array<Module & MetricRunInfo>;
  };
  chunks?: Array<MetaChunk>;
  chunkIds?: Array<string>;
  labels: Array<string>;
  customComponentLink?: React.ElementType;
}

export const ModuleInfo = (props: ModuleInfoProps & React.ComponentProps<'div'>) => {
  const {
    className = '',
    item,
    labels,
    chunks = [],
    chunkIds = [],
    customComponentLink: CustomComponentLink = ComponentLink,
    onClick = noop,
  } = props;

  const rootClassName = cx(css.root, className);
  const currentRun = item.runs?.[0];

  return (
    <EntryInfo className={rootClassName} item={item} labels={labels}>
      {!isEmpty(currentRun?.chunkIds) && (
        <div className={css.chunks}>
          <span className={css.chunksTitle}>Chunks:</span>
          {currentRun.chunkIds.map((chunkId) => {
            const chunk = chunks?.find(({ id }) => id === chunkId);

            if (!chunk) {
              return null;
            }

            return (
              <CustomComponentLink
                {...getBundleModulesByChunk(chunkIds, chunkId)}
                onClick={onClick}
                className={css.chunksItem}
              >
                {chunk.name}
              </CustomComponentLink>
            );
          })}
        </div>
      )}
    </EntryInfo>
  );
};
