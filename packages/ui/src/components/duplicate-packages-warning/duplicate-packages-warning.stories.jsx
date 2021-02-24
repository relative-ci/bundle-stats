import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { DuplicatePackagesWarning } from '.';

const stories = storiesOf('Components/DuplicatePackagesWarning', module);
stories.addDecorator(getWrapperDecorator());

stories.add('single duplicate packages', () => (
  <DuplicatePackagesWarning
    duplicatePackagesCount={{
      current: 1,
      baseline: 0,
    }}
  />
));

stories.add('multiple duplicate packages', () => (
  <DuplicatePackagesWarning
    duplicatePackagesCount={{
      current: 2,
      baseline: 3,
    }}
  />
));
