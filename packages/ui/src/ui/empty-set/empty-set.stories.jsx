import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { EmptySet } from '.';

const stories = storiesOf('UI/EmptySet', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <EmptySet
    resources="assets"
    filtered handleResetFilters={() => console.log('RESET_FILTERS')}
    handleViewAll={() => console.log('VIEW_ALL')}
  />
));

stories.add('empty', () => (
  <EmptySet resources="assets" filtered={false} />
));
