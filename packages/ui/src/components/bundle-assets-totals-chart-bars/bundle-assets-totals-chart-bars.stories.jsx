import React from 'react';
import { storiesOf } from '@storybook/react';
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

const stories = storiesOf('Components/BundleAssetsTotalsChartBars', module);

stories.addDecorator(getWrapperDecorator());

stories.add('component', () => (
  <BundleAssetsTotalsChartBars jobs={JOBS} />
));

stories.add('empty baseline', () => (
  <BundleAssetsTotalsChartBars jobs={EMPTY_BASELINE} />
));
