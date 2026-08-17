import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { createJobs, Job } from '@bundle-stats/utils';

/* eslint-disable import/no-relative-packages */
import baselineStats from '../../../../../fixtures/webpack-stats.baseline.json';
import currentStats from '../../../../../fixtures/webpack-stats.current.json';
/* eslint-enable import/no-relative-packages */
import { getWrapperDecorator } from '../../stories';
import { BundleAssetsTotals } from '.';

// BundleAssetsTotals is a plain .jsx component with defaultProps instead of
// inline destructuring defaults, so TS can't infer its props as optional on its own.
const TypedBundleAssetsTotals = BundleAssetsTotals as unknown as React.ComponentType<{
  className?: string;
  jobs?: Array<Job>;
  customComponentLink?: React.ElementType;
  onTreemapItemClick?: (entryId: string) => void;
}>;

const meta = {
  title: 'Components/BundleAssetsTotals',
  component: TypedBundleAssetsTotals,
  decorators: [getWrapperDecorator()],
} satisfies Meta<typeof TypedBundleAssetsTotals>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SingleJob: Story = {
  args: {
    jobs: createJobs([{ webpack: currentStats }]),
  },
};

export const MultipleJobs: Story = {
  args: {
    jobs: createJobs([{ webpack: currentStats }, { webpack: baselineStats }]),
  },
};

export const EmptyBaseline: Story = {
  args: {
    jobs: createJobs([{ webpack: currentStats }, {}]),
  },
};
