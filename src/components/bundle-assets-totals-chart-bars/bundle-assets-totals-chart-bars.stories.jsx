import React from 'react';
import { storiesOf } from '@storybook/react';

import job from '../../../__mocks__/job.json';
import { getWrapperDecorator } from '../../stories';
import { BundleAssetsTotalsChartBars as Component } from './bundle-assets-totals-chart-bars';

const stories = storiesOf('Components/BundleAssetsTotalsChartBars', module);

stories.addDecorator(getWrapperDecorator());

stories.add('component', () => (
  <Component jobs={[job, job.baseline]} />
));
