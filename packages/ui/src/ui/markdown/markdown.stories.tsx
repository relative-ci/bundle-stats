import { Meta, StoryObj } from '@storybook/react';
import { Markdown } from '.';

const meta: Meta<typeof Markdown> = {
  title: 'UI/Markdown',
  component: Markdown,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: '**One line** _markdown_ content',
  },
};

const MULTI_LINE_MARKDOWN = `
**Lorem ipsum** dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Habitant morbi tristique senectus et netus et malesuada.

Eget nunc scelerisque viverra mauris in. Ipsum dolor sit amet consectetur adipiscing.
`;

export const MultiLine: Story = {
  args: {
    content: MULTI_LINE_MARKDOWN,
  },
};
