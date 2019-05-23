import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Loader } from '.';

const stories = storiesOf('UI/Loader', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <Loader />
));
