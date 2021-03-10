import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { find, map } from 'lodash';
import { getBundleModulesByChunk, getModuleFileType } from '@bundle-stats/utils';

import { Stack } from '../../layout/stack';
import { FileName } from '../../ui/file-name';
import { ComponentLink } from '../component-link';
import css from './asset-info.module.css';

export const AssetInfo = (props) => {
  const { className, chunks, item, labels, CustomComponentLink } = props;
  const chunkIds = map(chunks, 'id');

  return (
    <Stack space="xsmall" className={cx(css.root, className)}>
      {item.runs.map((run, index) => {
        const fileType = getModuleFileType(run?.name);
        const chunk = find(chunks, { id: run?.chunkId });

        return (
          <Stack space="xxxsmall">
            <h5>{labels[index]}</h5>

            <FileName name={run?.name || '-'} />

            {chunk && (
              <CustomComponentLink
                className={css.chunk}
                {...getBundleModulesByChunk(chunkIds, run.chunkId, fileType)}
              >
                {`${fileType} chunk: ${chunk.name}`}
              </CustomComponentLink>
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
