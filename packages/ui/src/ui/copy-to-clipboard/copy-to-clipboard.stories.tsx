import { Meta, StoryObj } from '@storybook/react';
import { CopyToClipboard } from '.';

const meta: Meta<typeof CopyToClipboard> = {
  title: 'UI/CopyToClipboard',
  component: CopyToClipboard,
};

export default meta;

type Story = StoryObj<Meta>;

export const Default: Story = {
  args: {
    text: 'Lorem ipsum dolor sit amd',
  },
};

export const Inline: Story = {
  args: {
    ...Default.args,
    children: Default.args?.text,
    outline: true,
    size: 'small',
  },
};

export const Outline: Story = {
  args: {
    ...Default.args,
    outline: true,
  },
};
