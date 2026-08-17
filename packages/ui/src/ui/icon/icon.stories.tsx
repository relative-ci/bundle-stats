import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '.';

const meta = {
  title: 'UI/Icon',
  component: Icon,
  args: {
    size: Icon.SIZE_MEDIUM,
  },
  argTypes: {
    size: {
      options: Object.values(Icon.SIZES),
      control: { type: 'select' },
    },
    glyph: {
      options: Object.values(Icon.ICONS),
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {
    glyph: Icon.ICONS.ARROW,
  },
};

export const CustomSize: Story = {
  args: {
    glyph: Icon.ICONS.ARROW,
    size: Icon.SIZE_LARGE,
  },
};

export const All: Story = {
  args: {
    glyph: Icon.ICONS.ARROW,
  },
  render: ({ size }) => (
    <>
      {Object.values(Icon.ICONS).map((glyph) => (
        <div
          key={glyph}
          style={{
            display: 'inline-block',
            padding: '1rem',
            textAlign: 'center',
          }}
        >
          <Icon glyph={glyph} size={size} />
          <code style={{ display: 'block' }}>{glyph}</code>
        </div>
      ))}
    </>
  ),
};
