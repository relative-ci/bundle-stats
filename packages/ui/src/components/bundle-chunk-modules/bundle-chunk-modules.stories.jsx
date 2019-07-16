import React from 'react';
import { storiesOf } from '@storybook/react';

import currentData from '../../../__mocks__/job.current.json';
import baselineData from '../../../__mocks__/job.baseline.json';
import { getWrapperDecorator } from '../../stories';
import { BundleChunkModules } from '.';

const currentJob = {
  ...currentData,
  modules: currentData.rawData.webpack.stats.modules.filter(i => i.chunks.includes(1)),
};
const baselineJob = {
  ...baselineData,
  modules: baselineData.rawData.webpack.stats.modules.filter(i => i.chunks.includes(1)),
};

const stories = storiesOf('Components/BundleChunkModules', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <BundleChunkModules
    title="vendor (id: 1)"
    jobs={[ currentJob ]}
  />
));

stories.add('multiple jobs', () => (
  <BundleChunkModules
    title="vendor (id: 1)"
    jobs={[ currentJob, baselineJob ]}
  />
));

stories.add('empty baseline', () => (
  <BundleChunkModules
    title="vendor (id: 1)"
    jobs={[ currentJob, null ]}
  />
));
