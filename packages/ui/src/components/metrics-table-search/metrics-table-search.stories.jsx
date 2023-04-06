import React, { useState } from 'react';

import { getWrapperDecorator } from '../../stories';
import { MetricsTableSearch } from '.';

export default {
  title: 'Components/MetricsTableSearch',
  component: MetricsTableSearch,
  decorators: [getWrapperDecorator()],
};

const MetricsTableWithState = () => {
  const [search, updateSearch] = useState('');

  return (
    <MetricsTableSearch placeholder="Search name" search={search} updateSearch={updateSearch} />
  );
};

export const Default = () => <MetricsTableWithState />;
