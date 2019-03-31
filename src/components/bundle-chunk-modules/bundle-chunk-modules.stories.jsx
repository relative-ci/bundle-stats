import React from 'react';
import { storiesOf } from '@storybook/react';

import job from '../../../__mocks__/job.json';
import { getWrapperDecorator } from '../../stories';
import modules from './bundle-chunk-modules.fixtures.json';
import { BundleChunkModules } from '.';

const stories = storiesOf('Components/BundleChunkModules', module);
stories.addDecorator(getWrapperDecorator());
stories.add('default', () => (
  <BundleChunkModules
    title="vendor (id: 1)"
    jobs={[
      {
        ...job,
        modules: modules[0],
      },
      {
        ...job.baseline,
        modules: modules[1],
      },
    ]}
  />
));
