import type { Meta, StoryObj } from '@storybook/react';

import { Tag, TagProps } from '.';

const meta = {
  title: 'UI/Tag',
  component: Tag,
  argTypes: {
    kind: {
      control: 'select',
      options: Object.values(Tag.KINDS),
    },
    size: {
      control: 'select',
      options: Object.values(Tag.SIZES),
    },
  },
  args: {
    children: 'tag',
  },
} satisfies Meta<TagProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OneLetter: Story = {
  args: {
    children: 'd',
  },
};
