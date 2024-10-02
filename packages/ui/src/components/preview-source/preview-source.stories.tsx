import type { Meta, StoryObj } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { PreviewSource } from '.';

const meta: Meta<typeof PreviewSource> = {
  title: 'Components/PreviewSource',
  component: PreviewSource,
  decorators: [getWrapperDecorator()],
};

export default meta;

type Story = StoryObj<typeof meta>;

const SOURCE = JSON.stringify(
  [
    {
      label: 'Hey',
      runs: [
        { value: 1, name: 'a' },
        { value: 2, name: 'b' },
      ],
    },
  ],
  null,
  2,
);

export const Default: Story = {
  args: {
    source: SOURCE,
    download: 'bundle-stats--assets.json',
  },
};
