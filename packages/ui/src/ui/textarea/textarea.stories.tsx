import type { Meta, StoryObj } from '@storybook/react';

import { Textarea } from '.';

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  args: {
    placeholder: 'Enter value',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SizeSmall: Story = {
  args: {
    size: 'small',
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: 'Lorem ipsum dolor sit amed',
  },
};
export const PreviewSource: Story = {
  args: {
    previewSource: true,
    rows: 6,
    defaultValue: JSON.stringify(ReadOnly, null, 2),
  },
};
