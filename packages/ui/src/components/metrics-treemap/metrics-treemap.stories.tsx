import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from 'storybook/actions';
import { createJobs } from '@bundle-stats/utils';
import * as webpack from '@bundle-stats/utils/lib-esm/webpack';

/* eslint-disable import/no-relative-packages */
import baselineData from '../../../../../fixtures/webpack-stats.baseline.json';
import currentData from '../../../../../fixtures/webpack-stats.current.json';
import moduleItemsFixture from '../../../../../fixtures/module-items.json';
/* eslint-enable import/no-relative-packages */
import { MetricsTreemap, getTreemapNodes, getTreemapNodesGroupedByPath } from '.';

const meta: Meta<typeof MetricsTreemap> = {
  title: 'Components/MetricsTreemap',
  component: MetricsTreemap,
  args: {
    onItemClick: action('CLICK'),
  },
};

type Story = StoryObj<typeof meta>;

export default meta;

const MULTIPLE_JOBS = createJobs([{ webpack: currentData }, { webpack: baselineData }]);

export const Assets: Story = {
  render: (props) => <MetricsTreemap style={{ maxWidth: 'var(--max-width)' }} {...props} />,
  args: {
    treeNodes: getTreemapNodes(webpack.compareBySection.assets(MULTIPLE_JOBS)),
  },
};

export const AssetsNested: Story = {
  render: (props) => <MetricsTreemap style={{ maxWidth: 'var(--max-width)' }} {...props} />,
  args: {
    treeNodes: getTreemapNodesGroupedByPath(webpack.compareBySection.assets(MULTIPLE_JOBS)),
    nested: true,
  },
};

export const Modules: Story = {
  render: (props) => <MetricsTreemap style={{ maxWidth: 'var(--max-width)' }} {...props} />,
  args: {
    treeNodes: getTreemapNodes(moduleItemsFixture),
  },
};

export const ModulesNested: Story = {
  render: (props) => <MetricsTreemap style={{ maxWidth: 'var(--max-width)' }} {...props} />,
  args: {
    treeNodes: getTreemapNodesGroupedByPath(moduleItemsFixture),
    nested: true,
  },
};
