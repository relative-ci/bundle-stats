/* global module */
import { storiesOf } from '@storybook/react';

import TotalByTypeTable from './';
import runs from '../../../../fixtures/webpack-stats';

storiesOf('Components/Webpack/TotalByType/Table', module)
  .add('default', () => (
    <TotalByTypeTable
      runs={runs}
    />
  ));
