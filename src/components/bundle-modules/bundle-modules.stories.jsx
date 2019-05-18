import React from 'react';
import { storiesOf } from '@storybook/react';

import job from '../../../__mocks__/job.json';
import { getWrapperDecorator } from '../../stories';
import { BundleModules } from './bundle-modules';

const stories = storiesOf('Components/BundleModules', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <BundleModules jobs={[job]} />
));

stories.add('multiple runs', () => (
  <BundleModules jobs={[job, job.baseline]} />
));

stories.add('empty baseline', () => (
  <BundleModules jobs={[job, null]} />
));

stories.add('no modules', () => (
  <BundleModules
    jobs={[
      {
        ...job,
        rawData: {
          webpack: {
            stats: {
              ...job.rawData.webpack.stats,
              modules: undefined,
            },
          },
        },
      },
      {
        ...job.baseline,
        rawData: {
          webpack: {
            stats: {
              ...job.baseline.rawData.webpack.stats,
              modules: undefined,
            },
          },
        },
      },
    ]}
  />
));

stories.add('no chunks', () => (
  <BundleModules
    jobs={[
      {
        ...job,
        rawData: {
          webpack: {
            stats: {
              ...job.rawData.webpack.stats,
              chunks: undefined,
            },
          },
        },
      },
      {
        ...job.baseline,
        rawData: {
          webpack: {
            stats: {
              ...job.baseline.rawData.webpack.stats,
              chunks: undefined,
            },
          },
        },
      },
    ]}
  />
));
