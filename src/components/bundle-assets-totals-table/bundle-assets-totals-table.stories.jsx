import React from 'react';
import { storiesOf } from '@storybook/react';

import job from '../../../__mocks__/job.json';
import { BundleAssetsTotalsTable } from '.';

const stories = storiesOf('BundleAssetsTotalsTable', module);

stories.add('default', () => (
  <BundleAssetsTotalsTable jobs={[job, job.baseline]} />
));
