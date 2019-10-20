import React from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash';
import {
  modulesWebpackTransform,
  getModulesReport,
} from '@bundle-stats/utils';

import { Box } from '../../ui/box';
import { BundleChunkModules } from '../bundle-chunk-modules';

import css from './bundle-modules.module.css';

export const BundleModules = ({ jobs }) => {
  const runs = jobs.map((job) => ({
    meta: job,
    ...modulesWebpackTransform(get(job, 'rawData.webpack.stats')),
  }));

  const modulesReport = getModulesReport(runs);

  return (
    <>
      {!isEmpty(modulesReport) && modulesReport.map(({ chunkId, chunkNames, modules }) => (
        <BundleChunkModules
          key={`${chunkNames.join('-')}-${chunkId}`}
          className={css.chunk}
          title={chunkNames.join(', ')}
          id={chunkId}
          runs={runs}
          modules={modules}
        />
      ))}

      {isEmpty(modulesReport) && (
        <Box className={css.empty}>
          <h2 className={css.emptyTitle}>
            No data available!
          </h2>
          <p className={css.emptyText}>
            Please make sure Webpack stats are configured correctly.
          </p>
          <a
            href="https://relative-ci.com/documentation/setup#1-configure-webpack"
            className={css.emptyLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read how you can setup Webpack stats
          </a>
        </Box>
      )}
    </>
  );
};

BundleModules.propTypes = {
  /* Jobs data */
  jobs: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
