import React from 'react';
import { createJobs } from '@bundle-stats/utils';

import baselineStatsFixtures from '../../../__mocks__/webpack-stats.baseline.json';
import currentStatsFixtures from '../../../__mocks__/webpack-stats.current.json';
import { getWrapperDecorator } from '../../stories';
import { BundleModules } from '.';

// Limit the side of the modules when not in dev mode (chromatic limit, snapshot too large)
const { baselineStats, currentStats } = process.env.NODE_ENV !== 'development'
    ? {
        // eslint-disable-next-line prefer-object-spread
        baselineStats: Object.assign({}, baselineStatsFixtures, {
          modules: baselineStatsFixtures.modules.slice(0, 100),
        }),
        // eslint-disable-next-line prefer-object-spread
        currentStats: Object.assign({}, currentStatsFixtures, {
          modules: currentStatsFixtures.modules.slice(0, 100),
        }),
    } : { baselineStats: baselineStatsFixtures, currentStats: currentStatsFixtures };

const JOBS = createJobs([{ webpack: currentStats }, { webpack: baselineStats }]);

export default {
  title: 'Components/BundleModules',
  component: BundleModules,
  decorators: [getWrapperDecorator()]
};

export const Default = () => (
  <BundleModules jobs={[JOBS[1]]} />
);

export const MultipleJobs = () => (
  <BundleModules jobs={JOBS} />
);

const JOBS_EMPTY_BASELINE = createJobs([{ webpack: currentStats }, {}]);

export const EmptyBaseline = () => (
  <BundleModules jobs={JOBS_EMPTY_BASELINE} />
);

// Module moved between chunks
const JOBS_MOVED_MODULE = createJobs([
  {
    webpack: {
      chunks: [
        {
          id: 1,
          names: ['chunk-1'],
        },
        {
          id: 2,
          names: ['chunk-2'],
        },
      ],
      modules: [
        {
          name: 'module-1a.js',
          size: 1100,
          chunks: [1],
        },
        {
          name: 'module-1b.js',
          size: 1200,
          chunks: [1],
        },
        {
          name: 'module-moved-from-chunk-2-to-1.js',
          size: 2300,
          chunks: [1],
        },
        {
          name: 'module-2b.js',
          size: 2200,
          chunks: [2],
        },
        {
          name: 'module-moved-from-chunk-3-to-1.js',
          size: 3300,
          chunks: [1],
        },
      ],
    },
  },
  {
    webpack: {
      chunks: [
        {
          id: 1,
          names: ['chunk-1'],
        },
        {
          id: 2,
          names: ['chunk-2'],
        },
        {
          id: 3,
          names: ['chunk-3'],
        },
      ],
      modules: [
        {
          name: 'module-1a.js',
          size: 1000,
          chunks: [1],
        },
        {
          name: 'module-1b.js',
          size: 1100,
          chunks: [1],
        },
        {
          name: 'module-moved-from-chunk-2-to-1.js',
          size: 2000,
          chunks: [2],
        },
        {
          name: 'module-2b.js',
          size: 2200,
          chunks: [2],
        },
        {
          name: 'module-moved-from-chunk-3-to-1.js',
          size: 3300,
          chunks: [3],
        },
        {
          name: 'module-removed-from-all-chunks.js',
          size: 3300,
          chunks: [3],
        },
      ],
    },
  },
]);

export const ChunkFiltersWithModuleMovedIn = () => (
  <BundleModules
    filters={{
      changed: false,
      'c.1': true,
      'c.2': false,
      'c.3': false,
    }}
    jobs={[...JOBS_MOVED_MODULE]}
  />
);

export const ChunkFiltersWithModuleMovedOut = () => (
  <BundleModules
    filters={{
      changed: false,
      'c.1': false,
      'c.2': true,
      'c.3': false,
    }}
    jobs={[...JOBS_MOVED_MODULE]}
  />
);

export const ChunkFiltersWithRemovedChunk = () => (
  <BundleModules
    filters={{
      changed: false,
      'c.1': false,
      'c.2': false,
      'c.3': true,
    }}
    jobs={[...JOBS_MOVED_MODULE]}
  />
);
