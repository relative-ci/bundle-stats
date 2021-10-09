import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { DuplicatePackagesWarning } from '.';

const stories = storiesOf('Components/DuplicatePackagesWarning', module);
stories.addDecorator(getWrapperDecorator());

stories.add('single job', () => (
  <DuplicatePackagesWarning
    duplicatePackagesCount={{
      current: 1,
      baseline: 0,
    }}
    showDelta={false}
  />
));

stories.add('multiple jobs', () => (
  <DuplicatePackagesWarning
    duplicatePackagesCount={{
      current: 2,
      baseline: 3,
    }}
  />
));

stories.add('no changes', () => (
  <DuplicatePackagesWarning
    duplicatePackagesCount={{
      current: 2,
      baseline: 2,
    }}
  />
));
