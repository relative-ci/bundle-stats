import type { Meta, StoryObj } from '@storybook/react';
import { createJobs } from '@bundle-stats/utils';

import lighthouse from '../../../__mocks__/lighthouse.json';
import { getWrapperDecorator } from '../../stories';
import { LighthouseTable } from '.';

const JOBS = createJobs([{ lighthouse }, { lighthouse }]);

const meta = {
  title: 'Components/LighthouseTable',
  component: LighthouseTable,
  decorators: [getWrapperDecorator()],
} satisfies Meta<typeof LighthouseTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    jobs: JOBS,
  },
};

export const NoBaseline: Story = {
  args: {
    jobs: [JOBS[1]],
  },
};
