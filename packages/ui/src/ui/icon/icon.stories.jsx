import React from 'react';

import { Icon } from '.';

export default {
  title: 'UI/Icon',
  component: Icon,
};

const Template = (args) => <Icon {...args} />;

export const Standard = Template.bind();

Standard.args = {
  glyph: Icon.ICONS.ARROW,
};

export const CustomSize = Template.bind();

CustomSize.args = {
  glyph: Icon.ICONS.ARROW,
  size: Icon.SIZE_LARGE,
};

export const All = () => (
  <>
    {Object.values(Icon.ICONS).map((glyph) => (
      <div
        style={{
          display: 'inline-block',
          padding: '1rem',
          textAlign: 'center',
        }}
      >
        <Icon glyph={glyph} key={glyph} />
        <code style={{ display: 'block' }}>{glyph}</code>
      </div>
    ))}
  </>
);
