import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import * as webpack from '@bundle-stats/utils/lib-esm/webpack';

import { Box } from '../../layout/box';
import { BundleChunkModules } from '../bundle-chunk-modules';

import css from './bundle-modules.module.css';

export const BundleModules = ({ className, jobs }) => {
  const modulesReport = webpack.compareBySection.modules(jobs);

  return (
    <div className={className}>
      {!isEmpty(modulesReport) &&
        modulesReport.map(({ chunkId, chunkNames, modules }) => (
          <BundleChunkModules
            key={`${chunkNames.join('-')}-${chunkId}`}
            className={css.chunk}
            name={chunkNames.join(', ')}
            id={chunkId}
            runs={jobs}
            items={modules}
          />
        ))}

      {isEmpty(modulesReport) && (
        <Box className={css.empty} outline>
          <h2 className={css.emptyTitle}>No data available!</h2>
          <p className={css.emptyText}>Please make sure Webpack stats are configured correctly.</p>
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
    </div>
  );
};

BundleModules.propTypes = {
  /** Adopted child className */
  className: PropTypes.string,

  /* Jobs data */
  jobs: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

BundleModules.defaultProps = {
  className: '',
};
