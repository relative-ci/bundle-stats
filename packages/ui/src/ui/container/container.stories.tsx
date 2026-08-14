import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Container } from '.';

const meta = {
  title: 'UI/Container',
  component: Container,
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: { background: 'white' },
    children: (
      <div
        style={{
          background: 'white',
          padding: '24px',
        }}
      >
        Content
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ background: 'hotpink' }}>
        <Story />
      </div>
    ),
  ],
};
