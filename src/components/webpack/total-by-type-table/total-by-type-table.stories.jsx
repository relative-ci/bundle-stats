/* global module */
import { storiesOf } from '@storybook/react';

import TotalByTypeTable from './';
import entries from '../../../../fixtures/webpack-stats';

storiesOf('Components/Webpack/TotalByType/Table', module)
  .add('default', () => <TotalByTypeTable entries={entries} />);
