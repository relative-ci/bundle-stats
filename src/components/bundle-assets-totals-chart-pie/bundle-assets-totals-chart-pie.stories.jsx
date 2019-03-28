/* global: module */
import React from 'react';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';

import job from '../../../__mocks__/job.json';
import { BundleAssetsTotalsChartPie as Component } from './bundle-assets-totals-chart-pie';

const stories = storiesOf('BundleAssetsTotalsChartPie', module);

stories.add('component', () => (
  <Component jobs={[job, job.baseline]} />
));
