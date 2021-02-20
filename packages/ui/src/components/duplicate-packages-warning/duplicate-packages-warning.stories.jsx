import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { DuplicatePackagesWarning } from '.';

const stories = storiesOf('Components/DuplicatePackagesWarning', module);
stories.addDecorator(getWrapperDecorator());

stories.add('single duplicate packages', () => (
  <DuplicatePackagesWarning
    duplicatePackages={{
      'package-c': ['package-c', 'package-a:package-c'],
    }}
  />
));

stories.add('multiple duplicate packages', () => (
  <DuplicatePackagesWarning
    duplicatePackages={{
      'package-c': ['package-c', 'package-a:package-c'],
      'package-d': ['package-b:package-d', 'package-c:package-d'],
    }}
  />
));
