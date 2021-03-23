import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { MetricsTableOptions } from '.';

const stories = storiesOf('Components/MetricsTableOptions', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <MetricsTableOptions
    align="left"
    handleResetFilters={() => console.log('reset')}
    handleViewAll={() => console.log('view all')}
  />
));
