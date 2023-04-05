import React from 'react';
import { ASSET_ENTRY_TYPE, ASSET_FILE_TYPE, ASSET_FILTERS, FILE_TYPE_JS, createJobs } from '@bundle-stats/utils';
import merge from 'lodash/merge';
import set from 'lodash/set';

import baselineStats from '../../../__mocks__/webpack-stats.baseline.json';
import currentStats from '../../../__mocks__/webpack-stats.current.json';
import { getWrapperDecorator } from '../../stories';
import { BundleAssets } from '.';

const JOBS = createJobs([{ webpack: currentStats }, { webpack: baselineStats }]);
const [currentJob, baselineJob] = JOBS;
const setState = (params) => console.info(params);

export default {
  title: 'Components/BundleAssets',
  component: BundleAssets,
  decorators: [getWrapperDecorator()],
};

export const Default = () => <BundleAssets jobs={[baselineJob]} setState={setState} />;

export const MultipleJobs = () => <BundleAssets jobs={JOBS} setState={setState} />;

export const CustomFilters = () => (
  <BundleAssets
    jobs={JOBS}
    filters={{
      [`${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.ENTRY}`]: true,
      [`${ASSET_FILE_TYPE}.${FILE_TYPE_JS}`]: true,
    }}
    setState={setState}
  />
);

const JOBS_EMPTY_BASELINE = createJobs([{ webpack: currentStats }, {}]);

export const EmptyBaseline = () => (
  <BundleAssets jobs={JOBS_EMPTY_BASELINE} setState={setState} />
);

export const NoAssets = () => (
  <BundleAssets
    jobs={JOBS.map((job) => set(merge({}, job), 'metrics.webpack.assets', {}))}
    setState={setState}
  />
);

export const EmptyFilteredData = () => (
  <BundleAssets
    jobs={[
      set(merge({}, currentJob), 'metrics.webpack.assets', { 'main.js': { value: 100 } }),
      set(merge({}, baselineJob), 'metrics.webpack.assets', { 'main.js': { value: 100 } }),
    ]}
    search="vendors"
    setState={setState}
  />
);

export const NotPredictive = () => (
  <BundleAssets
    jobs={[
      set(merge({}, currentJob), 'metrics.webpack.assets', {
        'static/js/not-predictive.js': {
          name: 'static/js/not-predictive.93191a1.js',
          value: 2989,
        },
      }),
      set(merge({}, baselineJob), 'metrics.webpack.assets', {
        'static/js/not-predictive.js': {
          name: 'static/js/not-predictive.93191a1.js',
          value: 2988,
        },
      }),
    ]}
    setState={setState}
  />
);
