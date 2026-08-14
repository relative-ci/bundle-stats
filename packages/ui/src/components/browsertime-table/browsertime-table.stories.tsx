import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { createJobs, Job } from '@bundle-stats/utils';
import * as browsertime from '@bundle-stats/utils/lib-esm/browsertime';

// eslint-disable-next-line import/no-relative-packages
import browsertimeSourceFixtures from '../../../../../fixtures/browsertime.json';
import { getWrapperDecorator } from '../../stories';
import { BrowsertimeTable } from '.';

const browsertimeFixtures = browsertime.filter(browsertimeSourceFixtures);

const JOBS = createJobs([
  { browsertime: browsertimeFixtures },
  { browsertime: browsertimeFixtures },
]);

// BrowsertimeTable is a plain .jsx component with defaultProps instead of
// inline destructuring defaults, so TS can't infer its props as optional on its own.
const TypedBrowsertimeTable = BrowsertimeTable as unknown as React.ComponentType<{
  className?: string;
  jobs?: Array<Job>;
}>;

const meta = {
  title: 'Components/BrowsertimeTable',
  component: TypedBrowsertimeTable,
  decorators: [getWrapperDecorator()],
} satisfies Meta<typeof TypedBrowsertimeTable>;

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
