import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { BundleChunkModules } from '../bundle-chunk-modules';
import { groupModulesByChunk } from './utils/group-modules-by-chunk';
import { groupChunksByName } from './utils/group-chunks-by-name';

import css from './bundle-modules.css';

export const BundleModules = ({
  currentRawData, baselineRawData, job, project,
}) => {
  const currentModules = get(currentRawData, 'webpack.stats.modules');
  const baselineModules = get(baselineRawData, 'webpack.stats.modules');
  const currentChunks = groupChunksByName(get(currentRawData, 'webpack.stats.chunks'));
  const baselineChunks = groupChunksByName(get(baselineRawData, 'webpack.stats.chunks'));

  const currentModulesByChunk = groupModulesByChunk(currentModules);
  const baselineModulesByChunk = groupModulesByChunk(baselineModules);

  const jobsByChunks = [];

  Object.keys(currentChunks).forEach((nameId) => {
    if (baselineChunks[nameId]) {
      jobsByChunks.push({
        chunk: baselineChunks[nameId],
        jobs: [
          {
            ...job,
            modules: currentModulesByChunk[currentChunks[nameId].id],
            project,
          },
          {
            ...job.baseline,
            modules: baselineModulesByChunk[baselineChunks[nameId].id],
            project,
          },
        ],
      });
    } else {
      jobsByChunks.push({
        chunk: currentChunks[nameId],
        jobs: [
          {
            ...job,
            modules: currentModulesByChunk[currentChunks[nameId].id],
            project,
          },
          {
            ...job.baseline,
            modules: [],
            project,
          },
        ],
      });
    }
  });

  Object.keys(baselineChunks).forEach((nameId) => {
    if (!currentChunks[nameId]) {
      jobsByChunks.push({
        chunk: baselineChunks[nameId],
        jobs: [
          {
            ...job,
            modules: [],
            project,
          },
          {
            ...job.baseline,
            modules: baselineModulesByChunk[baselineChunks.id],
            project,
          },
        ],
      });
    }
  });

  return (
    <React.Fragment>
      {jobsByChunks.map(({ chunk, jobs }) => (
        <BundleChunkModules
          key={chunk.id}
          className={css.chunk}
          title={`${chunk.names.join(', ')} (id: ${chunk.id})`}
          jobs={jobs}
        />
      ))}
    </React.Fragment>
  );
};

BundleModules.defaultProps = {
  currentRawData: null,
  baselineRawData: null,
  job: null,
  project: null,
};

BundleModules.propTypes = {
  /** Current job raw data */
  currentRawData: PropTypes.shape({
    webpack: PropTypes.shape({
      stats: PropTypes.shape({
        modules: PropTypes.arrayOf(PropTypes.shape({
          name: PropTypes.string,
          size: PropTypes.number,
        })),
      }),
    }),
  }),

  /** Baseline job raw data */
  baselineRawData: PropTypes.shape({
    webpack: PropTypes.shape({
      stats: PropTypes.shape({
        modules: PropTypes.arrayOf(PropTypes.shape({
          name: PropTypes.string,
          size: PropTypes.number,
        })),
      }),
    }),
  }),

  /** Job data */
  job: PropTypes.object, // eslint-disable-line react/forbid-prop-types

  /** Project data */
  project: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};
