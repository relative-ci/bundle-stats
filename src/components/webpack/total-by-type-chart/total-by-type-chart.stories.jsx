/* global module */
import { storiesOf } from '@storybook/react';

import TotalByTypeChart from './';
import entries from '../../../../fixtures/webpack-stats';

const wrapperStyles = {
  width: '400px',
  height: '100px',
};

storiesOf('Components/Webpack/TotalByType/Chart', module)
  .add('default', () => (
    <div style={wrapperStyles}>
      <TotalByTypeChart entries={entries} />
    </div>
  ));
