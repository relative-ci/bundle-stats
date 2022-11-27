import React from 'react';
import { storiesOf } from '@storybook/react';

import { Container } from '../ui';
import { getWrapperDecorator } from '../stories';
import CHART_COLORS from '../chart-colors.json';
import content from './typography.md';
import css from './typography.module.css';

const stories = storiesOf('Prototypes/Styleguide', module);
stories.addDecorator(getWrapperDecorator());

stories.add('typography', () => (
  <main className={css.main}>
    <Container dangerouslySetInnerHTML={{ __html: content }} />
  </main>
));

// eslint-disable-next-line react/prop-types
const Item = ({ colorName, valueName = 'normal' }) => {
  const colorFullName = valueName === 'normal'
    ? colorName
    : [colorName, valueName].join('-');

  return (
    <div
      style={{
        background: `var(--color-${colorFullName})`,
        color: 'var(--color-light)',
        padding: '12px',
        flex: '1 1 20%',
      }}
    >
      {`${colorName} ${valueName}`}
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const ItemColorValue = ({ value }) => (
  <div
    style={{
      background: value,
      color: 'var(--color-light)',
      padding: '12px',
      flex: '1 1 20%',
    }}
  >
    {value}
  </div>
);

const COLORS = [
  'blue',
  'red',
  'green',
  'yellow',
  'gray',
];

const NAMES = [
  'ultra-light',
  'light',
  'normal',
  'dark',
  'ultra-dark',
];

stories.add('color sheme', () => (
  <Container>
    <Item colorName="branding" valueName="light" />
    <Item colorName="branding" />
    <Item colorName="branding" valueName="dark" />

    <hr />

    <Item colorName="dark" />

    <hr />

    {COLORS.map((colorName) => (
      <div style={{ display: 'flex', marginBottom: '24px' }}>
        {NAMES.map((valueName) => (
          <Item
            key={`${colorName}-${valueName}`}
            colorName={colorName}
            valueName={valueName}
          />
        ))}
      </div>
    ))}

    <hr />

    <h3>Chart colors</h3>
    <div style={{ display: 'flex', marginBottom: '24px', flexWrap: 'wrap' }}>
      {CHART_COLORS.map((color) => (
        <ItemColorValue
          key={color}
          value={color}
        />
      ))}
    </div>
  </Container>
));
