import React from 'react';
import { Meta, Story } from '@storybook/react';

import { HoverCard, HoverCardProps } from '.';

export default {
  title: 'UI/HoverCard',
  component: HoverCard,
} as Meta;

const Template: Story<HoverCardProps> = (props) => (
  <>
    <HoverCard {...props} />
    <p style={{ position: 'relative', zIndex: 1, maxWidth: 360 }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in neque ante. Curabitur
      vehicula, lorem sit amet fringilla dapibus, justo mauris varius elit, ut fermentum leo velit
      eget risus
    </p>
  </>
);

export const Default = () => (
  <Template label="main.js">
    <h1>main.js</h1>
    <p>info</p>
  </Template>
);

export const WithRenderFn = () => (
  <Template label="main.js">
    {({ close }) => (
      <div>
        <h1>main.js</h1>
        <p>info</p>
        <button type="button" onClick={close}>
          close
        </button>
      </div>
    )}
  </Template>
);
