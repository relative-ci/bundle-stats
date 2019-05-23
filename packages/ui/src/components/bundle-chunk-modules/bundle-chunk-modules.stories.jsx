import React from 'react';
import { storiesOf } from '@storybook/react';

import currentData from '../../../__mocks__/job.current.json';
import baselineData from '../../../__mocks__/job.baseline.json';
import { getWrapperDecorator } from '../../stories';
import { BundleChunkModules } from '.';

const currentJob = { ...currentData };
const baselineJob = { ...baselineData };

const stories = storiesOf('Components/BundleChunkModules', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <BundleChunkModules
    title="vendor (id: 1)"
    jobs={[
      {
        ...currentJob,
        modules: currentJob.rawData.webpack.stats.modules,
      },
    ]}
  />
));

stories.add('multiple jobs', () => (
  <BundleChunkModules
    title="vendor (id: 1)"
    jobs={[
      {
        ...currentJob,
        modules: currentJob.rawData.webpack.stats.modules,
      },
      {
        ...baselineJob,
        modules: baselineJob.rawData.webpack.stats.modules,
      },
    ]}
  />
));

stories.add('empty baseline', () => (
  <BundleChunkModules
    title="vendor (id: 1)"
    jobs={[
      {
        ...currentJob,
        modules: currentJob.rawData.webpack.stats.modules,
      },
      null,
    ]}
  />
));
