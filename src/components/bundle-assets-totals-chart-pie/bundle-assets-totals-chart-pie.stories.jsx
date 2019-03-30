import React from 'react';
import { storiesOf } from '@storybook/react';

import job from '../../../__mocks__/job.json';
import { getWrapperDecorator } from '../../stories';
import { BundleAssetsTotalsChartPie as Component } from './bundle-assets-totals-chart-pie';

const stories = storiesOf('Components/BundleAssetsTotalsChartPie', module);
stories.addDecorator(getWrapperDecorator());

stories.add('component', () => (
  <Component jobs={[job, job.baseline]} />
));
