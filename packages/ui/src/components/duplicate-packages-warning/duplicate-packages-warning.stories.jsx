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
    duplicatePackagesCount={{
      current: 1,
      baseline: 0,
    }}
  />
));

stories.add('multiple duplicate packages', () => (
  <DuplicatePackagesWarning
    duplicatePackages={{
      'package-c': ['package-c', 'package-a:package-c'],
      'package-d': ['package-b:package-d', 'package-c:package-d'],
    }}
    duplicatePackagesCount={{
      current: 2,
      baseline: 3,
    }}
  />
));

stories.add('v3 single duplicate packages', () => (
  <DuplicatePackagesWarning
    duplicatePackages={{
      'package-c': {
        value: 10000,
        children: [
          {
            name: 'package-c',
            value: 6000,
          },
          {
            name: 'package-a:package-c',
            value: 4000,
          },
        ],
      },
    }}
    duplicatePackagesCount={{
      current: 1,
      baseline: 2,
    }}
  />
));

stories.add('v3 multiple duplicate packages', () => (
  <DuplicatePackagesWarning
    duplicatePackages={{
      'package-c': {
        value: 7000,
        children: [
          {
            name: 'org/package-d:package-c',
            value: 4000,
          },
          {
            name: 'package-c',
            value: 3000,
          },
        ],
      },
      'package-a': {
        value: 6000,
        children: [
          {
            name: 'package-a',
            value: 5000,
          },
          {
            name: 'package-b:package-a',
            value: 1000,
          },
        ],
      },
    }}
    duplicatePackagesCount={{
      current: 2,
      baseline: 3,
    }}
  />
));
