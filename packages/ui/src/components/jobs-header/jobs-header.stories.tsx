import type { Meta, StoryObj } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { JobsHeader } from '.';

const meta = {
  title: 'Components/JobsHeader',
  component: JobsHeader,
  decorators: [getWrapperDecorator()],
} satisfies Meta<typeof JobsHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    jobs: [
      {
        internalBuildNumber: 1,
        meta: {
          webpack: {
            builtAt: '2019-01-01T00:00:00.000Z',
            hash: 'abcd1234',
          },
        },
      },
    ],
  },
};

export const MultipleJobs: Story = {
  args: {
    jobs: [
      {
        internalBuildNumber: 1,
        meta: {
          webpack: {
            builtAt: '2019-01-01T00:00:00.000Z',
            hash: 'abcd1234',
          },
        },
      },
      {
        internalBuildNumber: 2,
        meta: {
          webpack: {
            builtAt: '2019-01-02T00:00:00.000Z',
            hash: 'efgh1234',
          },
        },
      },
    ],
  },
};
