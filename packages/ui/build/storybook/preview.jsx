import React from 'react';

import '../../src/css/variables.css';
import '../../src/css/default.css';
import IconSprite from '../../src/ui/icon/icons.svg';

export const decorators = [
  (Story) => (
    <>
      <Story />
      <IconSprite style={{ position: 'absolute', width: 0, height: 0 }} />
    </>
  ),
];
