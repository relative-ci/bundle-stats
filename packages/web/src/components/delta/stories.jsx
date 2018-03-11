/* global module */
import { storiesOf } from '@storybook/react';

import Delta from './';


storiesOf('Components/Delta', module)
  .add('default', () => (
    <Delta
      value={20}
      displayValue="+20%"
    />
  ))
  .add('with negative value', () => (
    <Delta
      value={-14}
      displayValue="-14%"
    />
  ))
  .add('with biggerIsBetter false', () => (
    <Delta
      value={20}
      displayValue="-20%"
      biggerIsBetter={false}
    />));
