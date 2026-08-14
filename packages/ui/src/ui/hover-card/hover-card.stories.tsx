import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { HoverCard } from '.';

const meta = {
  title: 'UI/HoverCard',
  component: HoverCard,
  render: (args) => (
    <>
      <HoverCard {...args} />
      <p style={{ position: 'relative', zIndex: 1, maxWidth: 360 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in neque ante. Curabitur
        vehicula, lorem sit amet fringilla dapibus, justo mauris varius elit, ut fermentum leo velit
        eget risus
      </p>
    </>
  ),
} satisfies Meta<typeof HoverCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'main.js',
    children: (
      <>
        <h1>main.js</h1>
        <p>info</p>
      </>
    ),
  },
};

export const WithRenderFn: Story = {
  args: {
    label: 'main.js',
    children: ({ close }) => (
      <div>
        <h1>main.js</h1>
        <p>info</p>
        <button type="button" onClick={close}>
          close
        </button>
      </div>
    ),
  },
};
