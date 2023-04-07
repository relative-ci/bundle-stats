import React from 'react';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';
import noop from 'lodash/noop';
import { MetricRunInfo, getBundleModulesByChunk } from '@bundle-stats/utils';
import { Module, MetaChunk } from '@bundle-stats/utils/types/webpack';

import { Stack } from '../../layout/stack';
import { FileName } from '../../ui/file-name';
import { ComponentLink } from '../component-link';
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

  return (
    <Stack space="xsmall" className={rootClassName}>
      {item.runs.map((run, index) => {
        const TitleComponent = index !== 0 ? 'h4' : 'h3';
        const key = `module-info-${run?.name || index}-${index}`;

        return (
          <Stack space="xxxsmall" key={key}>
            <TitleComponent>{labels[index]}</TitleComponent>
            {index === 0 && !isEmpty(run?.chunkIds) && (
              <div className={css.chunks}>
                <span className={css.chunksTitle}>Chunks:</span>
                {run.chunkIds.map((chunkId) => {
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

            <FileName className={css.fileName} as="code" name={run?.name || '-'} />
          </Stack>
        );
      })}
    </Stack>
  );
};
