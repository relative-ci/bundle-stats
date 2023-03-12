import React from 'react';
import { Meta, Story } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Delta } from '../delta';
import { Metric } from '.';

export default {
  title: 'Components/Metric',
  component: Metric,
  decorators: [getWrapperDecorator({ maxWidth: '200px' })],
} as Meta;

const Template: Story = (args) => <Metric {...args} />;

export const Default = Template.bind({});

Default.args = {
  value: '100',
};

export const WithUnit = Template.bind({});

WithUnit.args = {
  value: '100',
  unit: 'KiB',
};

export const WithDelta = Template.bind({});

WithDelta.args = {
  ...WithUnit.args,
  children: <Delta displayValue="+10%" deltaType="POSITIVE" />,
};

export const Inline = Template.bind({});

Inline.args = {
  ...WithDelta.args,
  inline: true,
};
