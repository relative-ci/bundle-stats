import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Icon } from '.';

export default {
  title: 'UI/Icon',
  component: Icon,
  args: {
    size: Icon.SIZE_MEDIUM,
  },
  argTypes: {
    size: {
      options: Object.values(Icon.SIZES),
      control: { type: 'select' },
    },
    glyph: {
      options: Object.values(Icon.ICONS),
      control: { type: 'select' },
    },
  },
} as Meta;

const Template: Story = (args: any) => <Icon {...args} />;

export const Standard = Template.bind({});

Standard.args = {
  glyph: Icon.ICONS.ARROW,
};

export const CustomSize = Template.bind({});

CustomSize.args = {
  glyph: Icon.ICONS.ARROW,
  size: Icon.SIZE_LARGE,
};

export const All = ({ size }: Pick<React.ComponentProps<typeof Icon>, 'size'>) => (
  <>
    {Object.values(Icon.ICONS).map((glyph) => (
      <div
        style={{
          display: 'inline-block',
          padding: '1rem',
          textAlign: 'center',
        }}
      >
        <Icon glyph={glyph} size={size} key={glyph} />
        <code style={{ display: 'block' }}>{glyph}</code>
      </div>
    ))}
  </>
);
