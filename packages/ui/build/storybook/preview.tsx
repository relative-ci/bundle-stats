import React from 'react';
import type { Preview } from '@storybook/react';

import '../../src/css/variables.css';
import '../../src/css/default.css';
import SvgIcons from '../../src/assets/icons.svg?react';

const preview: Preview = {
  decorators: [
    (Story) => (
      <div>
        <Story />
        <SvgIcons />
      </div>
    ),
  ],
};

export default preview;
