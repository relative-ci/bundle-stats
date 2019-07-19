import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Delta } from '.';

const stories = storiesOf('Components/Delta', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <Delta
    value={20}
    displayValue="20%"
  />
));

stories.add('negative', () => (
  <Delta
    value={20}
    displayValue="20%"
    biggerIsBetter={false}
  />
));

stories.add('slightlyNegative', () => (
  <Delta
    value={1}
    displayValue="1%"
    biggerIsBetter={false}
  />
));

stories.add('slightlyPositive', () => (
  <Delta
    value={1}
    displayValue="1%"
  />
));

stories.add('empty', () => (
  <Delta
    value={0}
    displayValue="0%"
  />
));
