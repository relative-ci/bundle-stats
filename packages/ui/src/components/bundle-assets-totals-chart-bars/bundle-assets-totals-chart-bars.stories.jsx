import React from 'react';
import { createJobs } from '@bundle-stats/utils';

/* eslint-disable import/no-relative-packages */
import baselineStats from '../../../../../fixtures/webpack-stats.baseline.json';
import currentStats from '../../../../../fixtures/webpack-stats.current.json';
/* eslint-enable import/no-relative-packages */
import { getWrapperDecorator } from '../../stories';
import { BundleAssetsTotalsChartBars } from './bundle-assets-totals-chart-bars';

const JOBS = createJobs([{ webpack: currentStats }, { webpack: baselineStats }]);

const EMPTY_BASELINE = createJobs([{ webpack: currentStats }, { webpack: null }]);

export default {
  title: 'Components/BundleAssetsTotalsChartBars',
  component: BundleAssetsTotalsChartBars,
  decorators: [getWrapperDecorator()],
};

export const Component = () => <BundleAssetsTotalsChartBars jobs={JOBS} />;

export const EmptyBaseline = () => <BundleAssetsTotalsChartBars jobs={EMPTY_BASELINE} />;
