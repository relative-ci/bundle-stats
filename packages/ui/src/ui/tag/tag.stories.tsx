import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Tag } from '.';

export default {
  title: 'UI/Tag',
  component: Tag,
  argTypes: {
    kind: {
      control: 'select',
      options: Object.values(Tag.KINDS),
    },
    size: {
      control: 'select',
      options: Object.values(Tag.SIZES),
    },
  },
  args: {
    children: 'tag',
  },
} as Meta;

const Template: Story = (args) => <Tag {...args} />;

export const Default = Template.bind({});

export const OneLetter = Template.bind({});

OneLetter.args = {
  children: 'd',
};
