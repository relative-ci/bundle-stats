import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { MetricsTableSearch } from '.';

const stories = storiesOf('Components/MetricsTableSearch', module);
stories.addDecorator(getWrapperDecorator());

const MetricsTableWithState = () => {
  const [search, updateSearch] = useState('');

  return (
    <MetricsTableSearch placeholder="Search name" search={search} updateSearch={updateSearch} />
  );
};

stories.add('default', () => <MetricsTableWithState />);
