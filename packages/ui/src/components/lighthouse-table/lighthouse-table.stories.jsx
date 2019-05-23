import React from 'react';
import { storiesOf } from '@storybook/react';

import currentData from '../../../__mocks__/job.current.json';
import baselineData from '../../../__mocks__/job.baseline.json';
import lighthouse from '../../../__mocks__/lighthouse.json';
import { getWrapperDecorator } from '../../stories';
import { LighthouseTable } from '.';

const stories = storiesOf('Components/LighthouseTable', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <LighthouseTable
    jobs={[
      {
        ...currentData,
        rawData: {
          lighthouse,
        },
      },
      {
        ...baselineData,
        rawData: {
          lighthouse,
        },
      },
    ]}
  />
));

stories.add('no baseline', () => (
  <LighthouseTable
    jobs={[
      {
        ...currentData,
        rawData: {
          lighthouse,
        },
      },
    ]}
  />
));
