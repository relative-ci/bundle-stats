import React from 'react';

import '../../src/css/variables.css';
import '../../src/css/default.css';
import { SvgIcons } from '../../src/assets/icons.svg.jsx';

export const decorators = [
  (Story) => (
    <div>
      <Story />
      <SvgIcons />
    </div>
  ),
];
