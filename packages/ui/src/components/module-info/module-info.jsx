import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';
import noop from 'lodash/noop';
import { getBundleModulesByChunk, getBundleModulesBySearch } from '@bundle-stats/utils';

import { Stack } from '../../layout/stack';
import { FlexStack } from '../../layout/flex-stack';
import { FileName } from '../../ui/file-name';
import { Tag } from '../../ui/tag';
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
    <Stack space="small" className={cx(css.root, className)}>
      {item.runs.map((run, index) => (
        <Stack space="xsmall" key={`module-info-${run?.name || index}-${index}`} className={css.run}>
          <Stack space="xxxsmall">
            <FlexStack space="xxxsmall" alignItems="center" as="h4" className={css.title}>
              <span>{labels[index]}</span>
              <Tag className={css.titleTag}>{index === 0 ? 'current' : 'baseline'}</Tag>
            </FlexStack>
            <FileName className={css.fileName} as="code" name={run?.name || '-'} />
          </Stack>

          {/**
            * Render chunks only for the current run
            * we do not have the correct chunk ids for baselines
            */}
          {index === 0 && !isEmpty(run?.chunkIds) && (
            <Stack className={css.chunks}>
              <h5>Chunks</h5>
              <ul className={css.list}>
              {run.chunkIds.map((chunkId) => {
                const chunk = chunks?.find(({ id }) => id === chunkId);

                if (!chunk) {
                  return null;
                }

                return (
                  <li>
                    <CustomComponentLink
                      {...getBundleModulesByChunk(chunkIds, chunkId)}
                      onClick={onClick}
                      className={css.chunksItem}
                    >
                      {chunk.name}
                    </CustomComponentLink>
                  </li>
                );
              })}
              </ul>
            </Stack>
          )}

          {run?.reasons && (
            <Stack>
              <h5>Reasons</h5>
              <ul className={css.list}>
                {run.reasons.map((reason) => (
                  <li key={reason}>
                    <CustomComponentLink
                      {...getBundleModulesBySearch(`^${reason}$`)}
                      onClick={onClick}
                      className={css.reasonLink}
                      >
                      <FileName name={reason} className={css.reason} />
                    </CustomComponentLink>
                  </li>
                ))}
              </ul>
            </Stack>
          )}
        </Stack>
      ))}
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
