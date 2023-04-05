import React from 'react';

import { getWrapperDecorator } from '../../stories';
import { Footer } from '.';

export default {
  title: 'Layout/Footer',
  component: Footer,
  decorators: [getWrapperDecorator()],
};

export const Default = () => (
  <Footer />
);

export const WithCustomContent = () => (
  <Footer>
    Version 1.0
    <span style={{ margin: '1em' }}>
      Contact
    </span>
  </Footer>
);
