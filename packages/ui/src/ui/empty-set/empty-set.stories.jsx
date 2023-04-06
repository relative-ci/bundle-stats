import React from 'react';

import { getWrapperDecorator } from '../../stories';
import { EmptySet } from '.';

export default {
  title: 'UI/EmptySet',
  component: EmptySet,
  decorators: [getWrapperDecorator()],
};

export const Default = () => (
  <EmptySet
    resources="assets"
    filtered handleResetFilters={() => console.log('RESET_FILTERS')}
    handleViewAll={() => console.log('VIEW_ALL')}
  />
);

export const Empty = () => (
  <EmptySet resources="assets" filtered={false} />
);
