import React from 'react';
import type { Preview } from '@storybook/react';
import { withThemeByClassName } from '@storybook/addon-themes';

import '../../src/css/variables.css';
import '../../src/css/default.css';
import { SvgIcons } from '../../src/assets/icons.svg.jsx';

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light-theme',
        dark: 'dark-theme',
      },
      defaultTheme: 'light',
    }),
    (Story) => (
      <div>
        <Story />
        <SvgIcons />
      </div>
    ),
  ],
};

export default preview;
