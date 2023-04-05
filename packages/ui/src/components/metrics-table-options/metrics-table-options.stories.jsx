import React from 'react';

import { getWrapperDecorator } from '../../stories';
import { MetricsTableOptions } from '.';

export default {
  title: 'Components/MetricsTableOptions',
  component: MetricsTableOptions,
  decorators: [getWrapperDecorator()],
};

export const Default = () => (
  <MetricsTableOptions
    align="left"
    handleResetFilters={() => console.log('reset')}
    handleViewAll={() => console.log('view all')}
  />
);
