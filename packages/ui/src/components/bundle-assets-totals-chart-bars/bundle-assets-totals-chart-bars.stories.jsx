import React from 'react';
import { createJobs } from '@bundle-stats/utils';

import currentData from '../../../__mocks__/webpack-stats.current.json';
import baselineData from '../../../__mocks__/webpack-stats.baseline.json';
import { getWrapperDecorator } from '../../stories';
import { BundleAssetsTotalsChartBars } from './bundle-assets-totals-chart-bars';

const JOBS = createJobs([
  { webpack: currentData },
  { webpack: baselineData },
]);

const EMPTY_BASELINE = createJobs([
  { webpack: currentData },
  { webpack: null },
]);

export default {
  title: 'Components/BundleAssetsTotalsChartBars',
  component: BundleAssetsTotalsChartBars,
  decorators: [getWrapperDecorator()],
};

export const Component = () => (
  <BundleAssetsTotalsChartBars jobs={JOBS} />
);

export const EmptyBaseline = () => (
  <BundleAssetsTotalsChartBars jobs={EMPTY_BASELINE} />
);
