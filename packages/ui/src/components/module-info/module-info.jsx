import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, find, noop } from 'lodash';
import { getBundleModulesByChunk } from '@bundle-stats/utils';

import { Stack } from '../../layout/stack';
import { FileName } from '../../ui/file-name';
import { ComponentLink } from '../component-link';
import css from './module-info.module.css';

export const ModuleInfo = (props) => {
  const {
    className,
    item,
    labels,
    chunks,
    chunkIds,
    customComponentLink: CustomComponentLink,
    onClick,
  } = props;

  return (
    <Stack space="small" className={className}>
      {item.runs.map((run, index) => {
        const TitleComponent = index !== 0 ? 'h4' : 'h3';
        const key = `module-info-${run?.name || index}-${index}`;

        return (
          <Stack space="xxxsmall" key={key}>
            <TitleComponent>{labels[index]}</TitleComponent>
            {index === 0 && !isEmpty(run?.chunkIds) && (
              <div className={css.chunks}>
                <strong className={css.chunksTitle}>Chunks:</strong>
                {run.chunkIds.map((chunkId) => {
                  const chunk = find(chunks, { id: chunkId });

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

            <FileName
              className={css.fileName}
              as="code"
              name={run?.name || '-'}
            />
          </Stack>
        );
      })}
    </Stack>
  );
};

ModuleInfo.propTypes = {
  className: PropTypes.string,
  item: PropTypes.shape({
    key: PropTypes.string,
    runs: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        name: PropTypes.string,
        chunkIds: PropTypes.arrayOf(PropTypes.string),
      }),
    ),
  }).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  chunks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  chunkIds: PropTypes.arrayOf(PropTypes.string),
  customComponentLink: PropTypes.elementType,
  onClick: PropTypes.func,
};

ModuleInfo.defaultProps = {
  className: '',
  chunks: [],
  chunkIds: [],
  customComponentLink: ComponentLink,
  onClick: noop,
};
