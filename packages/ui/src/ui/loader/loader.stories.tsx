import type { Meta, StoryObj } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Loader } from '.';

const meta = {
  title: 'UI/Loader',
  component: Loader,
  decorators: [getWrapperDecorator()],
} satisfies Meta<typeof Loader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSize: Story = {
  args: {
    size: Loader.SIZE_LARGE,
  },
};
