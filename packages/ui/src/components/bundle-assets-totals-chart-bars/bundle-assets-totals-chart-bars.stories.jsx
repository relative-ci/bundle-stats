import React from 'react';
import { storiesOf } from '@storybook/react';
import { createJobs } from '@bundle-stats/utils';

import currentData from '../../../__mocks__/webpack-stats.current.json';
import baselineData from '../../../__mocks__/webpack-stats.baseline.json';
import { getWrapperDecorator } from '../../stories';
import { BundleAssetsTotalsChartBars } from './bundle-assets-totals-chart-bars';

const jobs = createJobs([
  { webpack: currentData },
  { webpack: baselineData },
]);

const stories = storiesOf('Components/BundleAssetsTotalsChartBars', module);

stories.addDecorator(getWrapperDecorator());

stories.add('component', () => (
  <BundleAssetsTotalsChartBars jobs={jobs} />
));
