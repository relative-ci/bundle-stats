import React from 'react';

import { Container } from '.';

export default {
  title: 'UI/Container',
  component: Container,
};

export const Default = () => (
  <Container style={{ background: 'white' }}>
    <div
      style={{
        background: 'white',
        padding: '24px',
      }}
    >
      Content
    </div>
  </Container>
);

Default.decorators = [
  (Story: React.FunctionComponent) => (
    <div style={{ background: 'hotpink' }}>
      <Story />
    </div>
  ),
];
