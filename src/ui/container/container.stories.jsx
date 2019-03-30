import React from 'react';
import { storiesOf } from '@storybook/react';

import { Container } from '.';

const stories = storiesOf('UI/Container', module);

stories.add('default', () => (
  <Container style={{ background: 'hotpink' }}>
    <div
      style={{
        background: 'white',
        padding: '24px',
      }}
    >
      Content
    </div>
  </Container>
));
