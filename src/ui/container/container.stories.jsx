import React from 'react';
import { storiesOf } from '@storybook/react';

import { Container } from '.';

const stories = storiesOf('UI/Container', module);

stories.add('default', () => (
  <div style={{ background: 'hotpink' }}>
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
  </div>
));
