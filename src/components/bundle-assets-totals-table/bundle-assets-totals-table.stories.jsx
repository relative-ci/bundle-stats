import React from 'react';
import { storiesOf } from '@storybook/react';

import job from '../../../__mocks__/job.json';
import { BundleAssetsTotalsTable } from '.';

const stories = storiesOf('BundleAssetsTotalsTable', module);

stories.addDecorator(storyFn => (
  <div style={{ padding: '80px 24px 24px' }}>
    {storyFn()}
  </div>
));

stories.add('default', () => (
  <BundleAssetsTotalsTable jobs={[job, job.baseline]} />
));
