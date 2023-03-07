import React from 'react';
import { Story } from '@storybook/react'; // eslint-disable-line

import { getWrapperDecorator } from '../../stories';
import { Tooltip } from '.';

export default {
  title: 'UI/Tooltip',
  component: Tooltip,
  decorators: [getWrapperDecorator({ padding: '100px', textAlign: 'center' })],
  args: {
    title: 'View job #123',
  },
};

const Template = (props: any) => <Tooltip {...props}>Job #123</Tooltip>;

export const Default: Story = Template.bind({});

export const LongTooltip: Story = Template.bind({});

LongTooltip.args = {
  title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam molestie neque id lectus mollis, et imperdiet libero porta.',
};

export const DarkModeFalse: Story = Template.bind({});

DarkModeFalse.args = {
  darkMode: false,
};
