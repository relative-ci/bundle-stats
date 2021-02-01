import React from 'react';
import { MemoryRouter } from 'react-router-dom';

export const getWrapperDecorator = (customWrapperStyles = {}) => (storyFn) => {
  const wrapperStyles = {
    width: '100%',
    height: '100%',
    padding: '24px',
    ...customWrapperStyles,
  };

  return (
    <MemoryRouter initialEntries={[{ pathname: '/', key: 'home' }]}>
      <div style={wrapperStyles}>
        {storyFn()}
      </div>
    </MemoryRouter>
  );
};
