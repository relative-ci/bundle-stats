/* global module */
import { storiesOf } from '@storybook/react';

import Assets from './';
import runs from '../../../../fixtures/webpack-entries';

const wrapperStyles = {
  width: '100%',
  maxWidth: '960px',
  margin: '0 auto',
};

storiesOf('Components/Webpack/Assets', module)
  .add('default', () => (
    <div style={wrapperStyles}>
      <Assets runs={runs} />
    </div>
  ));
