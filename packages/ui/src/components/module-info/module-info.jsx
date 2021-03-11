import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, find } from 'lodash';
import { getBundleModulesByChunk, getModuleFileType } from '@bundle-stats/utils';

import { FlexStack } from '../../layout/flex-stack';
import { Stack } from '../../layout/stack';
import { FileName } from '../../ui/file-name';
import { ComponentLink } from '../component-link';

export const ModuleInfo = (props) => {
  const {
    className,
    item,
    labels,
    chunks,
    chunkIds,
    customComponentLink: CustomComponentLink,
  } = props;

  const fileType = getModuleFileType(item.key);

  return (
    <Stack space="small" className={className}>
      {item.runs.map((run, index) => {
        const TitleComponent = index !== 0 ? 'h5' : 'h3';
        const key = `module-info-${run?.name || index}-${index}`;

        return (
          <Stack space="xxxsmall" key={key}>
            <TitleComponent>{labels[index]}</TitleComponent>
            {index === 0 && !isEmpty(run?.chunkIds) && (
              <FlexStack space="xxxsmall">
                <strong>Chunks:</strong>
                {run.chunkIds.map((chunkId) => {
                  const chunk = find(chunks, { id: chunkId });

                  if (!chunk) {
                    return null;
                  }

                  return (
                    <CustomComponentLink {...getBundleModulesByChunk(chunkIds, chunkId, fileType)}>
                      {chunk.name}
                    </CustomComponentLink>
                  );
                })}
              </FlexStack>
            )}

            <FileName name={run?.name || '-'} />
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
};

ModuleInfo.defaultProps = {
  className: '',
  chunks: [],
  chunkIds: [],
  customComponentLink: ComponentLink,
};
