import React from 'react';

export const getWrapperDecorator = (customWrapperStyles = {}) => (storyFn) => {
  const wrapperStyles = {
    width: '100%',
    height: '100%',
    padding: '24px',
    ...customWrapperStyles,
  };

  return (
    <div style={wrapperStyles}>
      {storyFn()}
    </div>
  );
};
