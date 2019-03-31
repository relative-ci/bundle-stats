import React from 'react';
import { storiesOf } from '@storybook/react';

import job from '../../../__mocks__/job.json';
import { getWrapperDecorator } from '../../stories';
import { BundleModules } from './bundle-modules';

const stories = storiesOf('BundleModules', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <BundleModules
    currentRawData={job.rawData}
    baselineRawData={job.baselineRawData}
    job={job}
    project={job.project}
  />
));
