import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { find, map } from 'lodash';
import { getBundleModulesByChunk, getModuleFileType } from '@bundle-stats/utils';

import { Stack } from '../../layout/stack';
import { FileName } from '../../ui/file-name';
import { ComponentLink } from '../component-link';
import css from './asset-info.module.css';

const ChunkModulesLink = ({ as: Component, chunks, chunkId, name }) => {
  const chunk = find(chunks, { id: chunkId });

  if (!chunk) {
    return null;
  }

  const chunkIds = map(chunks, 'id');
  const fileType = getModuleFileType(name);

  return (
    <Component className={css.chunk} {...getBundleModulesByChunk(chunkIds, chunkId, fileType)}>
      {`${fileType} chunk: ${chunk.name}`}
    </Component>
  );
};

ChunkModulesLink.propTypes = {
  as: PropTypes.elementType.isRequired,
  chunks: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  chunkId: PropTypes.string,
  name: PropTypes.string,
};

ChunkModulesLink.defaultProps = {
  chunks: [],
  chunkId: '',
  name: '',
};

export const AssetInfo = (props) => {
  const { className, chunks, item, labels, CustomComponentLink } = props;

  return (
    <Stack space="xsmall" className={cx(css.root, className)}>
      {item.runs.map((run, index) => {

        return (
          <Stack space="xxxsmall">
            <h5>{labels[index]}</h5>

            <FileName name={run?.name || '-'} />

            {index === 0 && (
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

AssetInfo.propTypes = {
  className: PropTypes.string,
  item: PropTypes.shape({
    runs: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        chunkId: PropTypes.string,
      }),
    ),
  }).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  chunks: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  CustomComponentLink: PropTypes.elementType,
};

AssetInfo.defaultProps = {
  className: '',
  chunks: [],
  CustomComponentLink: ComponentLink,
};
