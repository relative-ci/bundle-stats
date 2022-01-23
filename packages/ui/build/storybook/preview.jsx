import React from 'react';

import '../../src/css/variables.css';
import IconSprite from '../../src/assets/icons.svg';
import '../../src/css/default.css';

export const decorators = [
  (Story) => (
    <div>
      <Story />
      <IconSprite style={{ position: 'absolute', width: 0, height: 0 }} />
    </div>
  ),
];
