import React from 'react';

import { Container } from '../ui';
import { getWrapperDecorator } from '../stories';
import CHART_COLORS from '../chart-colors.json';
import content from './typography.md';
import css from './typography.module.css';

export default {
  title: 'Prototypes/Styleguide',
  decorators: [getWrapperDecorator()],
};

export const Typography = () => (
  <main className={css.main}>
    <Container dangerouslySetInnerHTML={{ __html: content }} />
  </main>
);

// eslint-disable-next-line react/prop-types
const Item = ({ colorName, valueName = 'normal' }) => {
  const colorFullName = valueName === 'normal' ? colorName : [colorName, valueName].join('-');

  return (
    <div
      style={{
        background: `var(--color-${colorFullName})`,
        color: 'var(--color-background)',
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

const COLORS = ['branding', 'primary', 'secondary', 'success', 'info', 'warning', 'danger'];

const NAMES = ['muted', 'normal', 'intense'];

export const ColorScheme = () => (
  <Container>
    <div style={{ display: 'flex', marginBottom: '24px' }}>
      <Item colorName="text" valueName="muted" />
      <Item colorName="text" />
      <Item colorName="text" valueName="intense" />
    </div>

    <hr />

    {COLORS.map((colorName) => (
      <div style={{ display: 'flex', marginBottom: '24px' }}>
        {NAMES.map((valueName) => (
          <Item key={`${colorName}-${valueName}`} colorName={colorName} valueName={valueName} />
        ))}
      </div>
    ))}

    <hr />

    <h3>Chart colors</h3>
    <div style={{ display: 'flex', marginBottom: '24px', flexWrap: 'wrap' }}>
      {CHART_COLORS.map((color) => (
        <ItemColorValue key={color} value={color} />
      ))}
    </div>
  </Container>
);
