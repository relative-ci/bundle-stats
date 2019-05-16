import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { BundleChunkModules } from '../bundle-chunk-modules';
import { groupModulesByChunk } from './utils/group-modules-by-chunk';
import { groupChunksByName } from './utils/group-chunks-by-name';

import css from './bundle-modules.module.css';

export const BundleModules = ({ jobs }) => {
  const modulesByJob = jobs.map(job => get(job, 'rawData.webpack.stats.modules'));
  const chunksByJob = jobs.map(job => groupChunksByName(get(job, 'rawData.webpack.stats.chunks')));
  const modulesByChunk = modulesByJob.map(modules => groupModulesByChunk(modules));

  let jobsByChunks = {};

  chunksByJob.forEach((chunks, jobIndex) => {
    Object.keys(chunks).forEach((nameId) => {
      jobsByChunks = {
        ...jobsByChunks,
        [nameId]: {
          ...get(jobsByChunks, nameId, {}),
          chunk: chunksByJob[jobIndex][nameId],
          jobs: [
            ...get(jobsByChunks, [nameId, 'jobs'], []),
            {
              ...jobs[jobIndex],
              modules: modulesByChunk[jobIndex][chunks[nameId].id],
            },
          ],
        },
      };
    });
  });

  return (
    <React.Fragment>
      {Object.values(jobsByChunks).map(({ chunk, ...restProps }) => (
        <BundleChunkModules
          key={`${chunk.name}-${chunk.id}`}
          className={css.chunk}
          title={`${chunk.names.join(', ')} (id: ${chunk.id})`}
          jobs={restProps.jobs}
        />
      ))}
    </React.Fragment>
  );
};

BundleModules.propTypes = {
  /* Jobs data */
  jobs: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
