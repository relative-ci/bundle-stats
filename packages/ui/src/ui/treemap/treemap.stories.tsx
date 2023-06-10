import React from 'react';
import { Meta, Story } from '@storybook/react';

import data from './data.json';
import { Treemap } from '.';

export default {
  title: 'UI/Treemap',
  component: Treemap,
} as Meta;

const Template: Story = (props) => <Treemap {...props} />;

export const Default = Template.bind({});

Default.args = {
  data,
};
