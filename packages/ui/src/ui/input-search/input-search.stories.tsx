import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { InputSearch } from '.';

const meta = {
  title: 'UI/InputSearch',
  component: InputSearch,
  decorators: [getWrapperDecorator()],
} satisfies Meta<typeof InputSearch>;

export default meta;

type Story = StoryObj<typeof meta>;

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

export const Default: Story = {
  render: () => <InputSearchWithState />,
};
