/* global module */
import { storiesOf } from '@storybook/react';

import Assets from './';
import entries from '../../../../fixtures/webpack-entries';

storiesOf('Components/Webpack/Assets', module)
  .add('default', () => (
    <Assets entries={entries} />
  ));
