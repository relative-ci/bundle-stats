import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { QueryStateProvider } from '../query-state';

export const getWrapperDecorator =
  (customWrapperStyles = {}) =>
  (Story) => {
    const wrapperStyles = {
      width: '100%',
      height: '100%',
      padding: '24px',
      ...customWrapperStyles,
    };

    return (
      <MemoryRouter initialEntries={[{ pathname: '/', key: 'home' }]}>
        <QueryStateProvider>
          <div style={wrapperStyles}>
            <Story />
          </div>
        </QueryStateProvider>
      </MemoryRouter>
    );
  };
