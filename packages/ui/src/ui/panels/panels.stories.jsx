import React from 'react';

import { getWrapperDecorator } from '../../stories';
import { Panels } from '.';

export default {
  title: 'UI/Panels',
  component: Panels,
  decorators: [getWrapperDecorator()],
};

export const Default = () => (
  <Panels style={{ outline: '1px dotted hotpink' }}>
    <div style={{ padding: '24px' }}>
      Panel 1
    </div>
    <div style={{ padding: '24px' }}>
      Panel 2
    </div>
  </Panels>
);
