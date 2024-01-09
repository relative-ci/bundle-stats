import React, { useState } from 'react';

import { getWrapperDecorator } from '../../stories';
import { InputSearch } from '.';

export default {
  title: 'UI/InputSearch',
  component: InputSearch,
  decorators: [getWrapperDecorator()],
};

const InputSearchWithState = () => {
  const [search, updateSearch] = useState('');

  return (
    <div>
      <pre>{JSON.stringify({ search }, null, 2)}</pre>
      <br />
      <InputSearch placeholder="Search by name" defaultValue={search} onChange={updateSearch} />
    </div>
  );
};

export const Default = () => <InputSearchWithState />;
