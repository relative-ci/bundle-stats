import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { DuplicatePackagesWarning } from '.';

const stories = storiesOf('Components/DuplicatePackagesWarning', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <DuplicatePackagesWarning
    duplicatePackages={{
      'package-c': [
        'package-c',
        'package-a:package-c',
      ],
    }}
  />
));
